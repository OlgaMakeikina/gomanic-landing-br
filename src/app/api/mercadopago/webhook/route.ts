import { NextRequest, NextResponse } from 'next/server';
import { bookingStorage } from '@/utils/storage';
import { sendBookingEmail } from '@/utils/email';
import { sendAdminNotification } from '@/utils/admin-email';
import { paymentLogger } from '@/utils/paymentLogger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // MercadoPago может отправлять данные в разных форматах
    let eventType = body.type || body.topic || 'unknown';
    let eventData = body.data || body;
    
    // Обработка разных форматов webhook
    if (eventType === 'topic_merchant_order_wh' || eventType === 'merchant_order') {
      eventType = 'merchant_order';
    }
    if (eventType === 'topic_payment_wh' || eventType === 'payment') {
      eventType = 'payment';
    }

    console.log('Webhook received:', { eventType, eventData });
    paymentLogger.logWebhookReceived(eventData?.id || 'unknown', eventType);

    if (eventType === 'payment' || eventType === 'merchant_order') {
      let paymentId = eventData?.id;
      
      // Para merchant_order, precisamos obter o payment ID do merchant order
      if (eventType === 'merchant_order') {
        try {
          const merchantOrderResponse = await fetch(`https://api.mercadopago.com/merchant_orders/${eventData?.id}`, {
            headers: {
              'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
              'Content-Type': 'application/json'
            }
          });

          if (merchantOrderResponse.ok) {
            const merchantOrderData = await merchantOrderResponse.json();
            paymentId = merchantOrderData.payments?.[0]?.id;
            console.log('Payment ID obtido do merchant order:', paymentId);
          }
        } catch (error) {
          console.error('Erro ao obter merchant order:', error);
        }
      }
      
      if (!paymentId) {
        paymentLogger.logPaymentError('unknown', new Error('Payment webhook without payment ID'), { body });
        return NextResponse.json({ message: 'Payment ID missing' }, { status: 200 });
      }
      
      // OBTER DADOS DO PAGAMENTO VIA API
      try {
        console.log('Obtendo dados do pagamento via MercadoPago API...');
        
        const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
          headers: {
            'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });

        if (!paymentResponse.ok) {
          console.error('Erro ao obter dados do pagamento:', paymentResponse.status);
          return NextResponse.json({ message: 'Payment API error' }, { status: 200 });
        }

        const paymentData = await paymentResponse.json();
        
        paymentLogger.logWebhookReceived(paymentId, paymentData.status, paymentData.external_reference);

        const external_reference = paymentData.external_reference;
        const payment_status = paymentData.status;

        if (!external_reference) {
          paymentLogger.logPaymentError(paymentId, new Error('External reference missing in payment data'));
          return NextResponse.json({ message: 'External reference missing' }, { status: 200 });
        }

        // BUSCAR BOOKING
        const booking = await bookingStorage.getBookingByExternalReference(external_reference);
        
        if (!booking) {
          paymentLogger.logPaymentError(external_reference, new Error('Booking not found'), { paymentId });
        }

        // PROCESSAR DIFERENTES STATUS
        if (payment_status === 'approved') {
          if (!booking) {
            paymentLogger.logPaymentError(external_reference, new Error('Booking not found for approved payment'));
            return NextResponse.json({ message: 'Booking not found for approved payment' }, { status: 200 });
          }
          
          paymentLogger.logBusinessEvent({
            orderId: booking.orderId,
            event: 'payment_approved',
            customerEmail: booking.email,
            timestamp: new Date(),
            details: { paymentId, amount: paymentData.transaction_amount }
          });

          paymentLogger.logPaymentDetails({
            orderId: booking.orderId,
            email: booking.email,
            service: booking.service,
            amount: paymentData.transaction_amount,
            status: 'approved',
            paymentId,
            method: paymentData.payment_method_id,
            customerName: booking.name
          }, paymentData);

          // Enviar EMAIL para o CLIENTE
          try {
            paymentLogger.logEmailEvent(booking.orderId, booking.email, 'sending');
            await sendBookingEmail(booking.email, booking.name, booking.service, booking.orderId);
            
            paymentLogger.logEmailEvent(booking.orderId, booking.email, 'success');
            paymentLogger.logBusinessEvent({
              orderId: booking.orderId,
              event: 'email_sent',
              customerEmail: booking.email,
              timestamp: new Date()
            });
          } catch (emailError) {
            paymentLogger.logEmailEvent(booking.orderId, booking.email, 'failed', emailError);
            paymentLogger.logPaymentError(booking.orderId, emailError, 'customer_email');
          }

          // Enviar SEGUNDA notificacao para o ADMIN
          try {
            const serviceNames: Record<string, string> = {
              'manicure-gel': 'MANICURE + NIVELAMENTO + ESMALTACAO EM GEL',
              'alongamento-gel': 'ALONGAMENTO + MANICURE + ESMALTACAO EM GEL',
              'combo-completo': 'COMBO: MANICURE + ESMALTACAO EM GEL + PEDICURE + PLASTICA DOS PES'
            };
            const servicePrices: Record<string, string> = {
              'manicure-gel': 'R$ 80', 
              'alongamento-gel': 'R$ 119',
              'combo-completo': 'R$ 160'
            };

            await sendAdminNotification({
              orderId: booking.orderId,
              customerName: booking.name,
              customerEmail: booking.email,
              customerPhone: booking.phone,
              service: serviceNames[booking.service] || booking.service,
              price: servicePrices[booking.service] || 'N/A',
              paymentId: paymentId,
              timestamp: new Date().toISOString(),
              status: 'COMPRA_CONFIRMADA'
            });
            
            paymentLogger.logBusinessEvent({
              orderId: booking.orderId,
              event: 'admin_notification_confirmado',
              customerEmail: booking.email,
              timestamp: new Date()
            });
            
          } catch (adminEmailError) {
            console.error('Erro ao enviar segunda notificacao admin:', adminEmailError);
          }

          // Atualizar status do booking
          await bookingStorage.updateBooking(booking.orderId, {
            paymentStatus: 'approved',
            mercadoPagoData: { paymentId, processedAt: new Date().toISOString() }
          });

        } else if (payment_status === 'rejected') {
          paymentLogger.logBusinessEvent({
            orderId: external_reference,
            event: 'payment_failed',
            customerEmail: booking?.email || 'unknown',
            timestamp: new Date(),
            details: { paymentId, reason: paymentData.status_detail }
          });

          paymentLogger.logPaymentError(external_reference, new Error(`Payment rejected: ${paymentData.status_detail}`), { 
            paymentId, 
            customerEmail: booking?.email 
          });
          
          if (external_reference) {
            await bookingStorage.updateBooking(external_reference, {
              paymentStatus: 'rejected',
              mercadoPagoData: { paymentId, status: payment_status, processedAt: new Date().toISOString() }
            });
          }
          
          // Notificar admin sobre pagamento rejeitado
          try {
            await sendAdminNotification({
              orderId: external_reference || 'N/A',
              customerName: booking?.name || 'N/A',
              customerEmail: booking?.email || 'N/A', 
              customerPhone: booking?.phone || 'N/A',
              service: booking?.service || 'Unknown',
              price: 'N/A',
              paymentId: paymentId,
              timestamp: new Date().toISOString(),
              status: 'PAGAMENTO_REJEITADO'
            });
          } catch (error) {
            paymentLogger.logPaymentError(external_reference, error, 'admin_rejection_email');
          }
          
          return NextResponse.json({ message: 'Payment rejected processed' }, { status: 200 });

        } else if (payment_status === 'cancelled') {
          paymentLogger.logBusinessEvent({
            orderId: external_reference,
            event: 'payment_failed',
            customerEmail: booking?.email || 'unknown',
            timestamp: new Date(),
            details: { paymentId, status: 'cancelled' }
          });
          
          if (external_reference) {
            await bookingStorage.updateBooking(external_reference, {
              paymentStatus: 'cancelled',
              mercadoPagoData: { paymentId, status: payment_status, processedAt: new Date().toISOString() }
            });
          }

          // Обязательно уведомить админа об отмене
          try {
            await sendAdminNotification({
              orderId: external_reference || 'N/A',
              customerName: booking?.name || 'N/A',
              customerEmail: booking?.email || 'N/A', 
              customerPhone: booking?.phone || 'N/A',
              service: booking?.service || 'Unknown',
              price: 'N/A',
              paymentId: paymentId,
              timestamp: new Date().toISOString(),
              status: 'PAGAMENTO_CANCELADO'
            });

            paymentLogger.logBusinessEvent({
              orderId: external_reference,
              event: 'admin_notification_cancelado',
              customerEmail: booking?.email || 'unknown',
              timestamp: new Date()
            });
          } catch (error) {
            paymentLogger.logPaymentError(external_reference, error, 'admin_cancel_email');
          }
          
          return NextResponse.json({ message: 'Payment cancelled processed' }, { status: 200 });

        } else if (payment_status === 'pending') {
          paymentLogger.logBusinessEvent({
            orderId: external_reference,
            event: 'payment_pending',
            customerEmail: booking?.email || 'unknown',
            timestamp: new Date(),
            details: { paymentId, reason: paymentData.status_detail }
          });
          
          if (external_reference) {
            await bookingStorage.updateBooking(external_reference, {
              paymentStatus: 'pending',
              mercadoPagoData: { paymentId, status: payment_status, processedAt: new Date().toISOString() }
            });
          }
          
          return NextResponse.json({ message: 'Payment pending processed' }, { status: 200 });

        } else if (payment_status === 'in_process') {
          paymentLogger.logBusinessEvent({
            orderId: external_reference,
            event: 'payment_pending',
            customerEmail: booking?.email || 'unknown',
            timestamp: new Date(),
            details: { paymentId, status: 'in_process', reason: paymentData.status_detail }
          });
          
          if (external_reference) {
            await bookingStorage.updateBooking(external_reference, {
              paymentStatus: 'in_process',
              mercadoPagoData: { paymentId, status: payment_status, processedAt: new Date().toISOString() }
            });
          }
          
          return NextResponse.json({ message: 'Payment in process' }, { status: 200 });

        } else if (payment_status === 'authorized') {
          paymentLogger.logBusinessEvent({
            orderId: external_reference,
            event: 'payment_pending',
            customerEmail: booking?.email || 'unknown',
            timestamp: new Date(),
            details: { paymentId, status: 'authorized' }
          });
          
          if (external_reference) {
            await bookingStorage.updateBooking(external_reference, {
              paymentStatus: 'authorized',
              mercadoPagoData: { paymentId, status: payment_status, processedAt: new Date().toISOString() }
            });
          }
          
          return NextResponse.json({ message: 'Payment authorized' }, { status: 200 });

        } else if (payment_status === 'refunded') {
          paymentLogger.logBusinessEvent({
            orderId: external_reference,
            event: 'payment_failed',
            customerEmail: booking?.email || 'unknown',
            timestamp: new Date(),
            details: { paymentId, status: 'refunded', amount: paymentData.transaction_amount_refunded }
          });
          
          if (external_reference) {
            await bookingStorage.updateBooking(external_reference, {
              paymentStatus: 'refunded',
              mercadoPagoData: { paymentId, status: payment_status, processedAt: new Date().toISOString() }
            });
          }

          // Notificar admin sobre reembolso
          try {
            await sendAdminNotification({
              orderId: external_reference || 'N/A',
              customerName: booking?.name || 'N/A',
              customerEmail: booking?.email || 'N/A', 
              customerPhone: booking?.phone || 'N/A',
              service: booking?.service || 'Unknown',
              price: 'N/A',
              paymentId: paymentId,
              timestamp: new Date().toISOString(),
              status: 'PAGAMENTO_REEMBOLSADO'
            });
          } catch (error) {
            paymentLogger.logPaymentError(external_reference, error, 'admin_refund_email');
          }
          
          return NextResponse.json({ message: 'Payment refunded processed' }, { status: 200 });

        } else if (payment_status === 'charged_back') {
          paymentLogger.logBusinessEvent({
            orderId: external_reference,
            event: 'payment_failed',
            customerEmail: booking?.email || 'unknown',
            timestamp: new Date(),
            details: { paymentId, status: 'charged_back' }
          });
          
          if (external_reference) {
            await bookingStorage.updateBooking(external_reference, {
              paymentStatus: 'charged_back',
              mercadoPagoData: { paymentId, status: payment_status, processedAt: new Date().toISOString() }
            });
          }

          // Notificar admin sobre chargeback
          try {
            await sendAdminNotification({
              orderId: external_reference || 'N/A',
              customerName: booking?.name || 'N/A',
              customerEmail: booking?.email || 'N/A', 
              customerPhone: booking?.phone || 'N/A',
              service: booking?.service || 'Unknown',
              price: 'N/A',
              paymentId: paymentId,
              timestamp: new Date().toISOString(),
              status: 'PAGAMENTO_CONTESTADO'
            });
          } catch (error) {
            paymentLogger.logPaymentError(external_reference, error, 'admin_chargeback_email');
          }
          
          return NextResponse.json({ message: 'Payment chargeback processed' }, { status: 200 });

        } else {
          paymentLogger.logPaymentError(external_reference, new Error(`Unknown payment status: ${payment_status}`), {
            paymentId,
            statusDetail: paymentData.status_detail,
            customerEmail: booking?.email
          });
          
          return NextResponse.json({ message: `Payment status ${payment_status} noted` }, { status: 200 });
        }

      } catch (apiError) {
        paymentLogger.logPaymentError(paymentId, apiError, 'mercadopago_api_request');
        return NextResponse.json({ message: 'Payment API request failed' }, { status: 200 });
      }
    }

    return NextResponse.json({ message: 'Webhook processed successfully' }, { status: 200 });

  } catch (error) {
    paymentLogger.logPaymentError('webhook', error, 'webhook_processing');
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'MercadoPago webhook endpoint',
    status: 'active',
    timestamp: new Date().toISOString()
  });
}
