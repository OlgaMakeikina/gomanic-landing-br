import { NextRequest, NextResponse } from 'next/server';
import { bookingStorage } from '@/utils/storage';
import { sendBookingEmail } from '@/utils/email';
import { sendAdminNotification } from '@/utils/admin-email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    console.log('🔔 MercadoPago webhook ПОЛНЫЕ данные:', JSON.stringify(body, null, 2));

    if (type === 'payment') {
      const paymentId = data?.id;
      
      if (!paymentId) {
        console.warn('⚠️  Payment webhook without payment ID');
        return NextResponse.json({ message: 'Payment ID missing' }, { status: 200 });
      }

      console.log('💳 Payment webhook for payment ID:', paymentId);
      
      // ПОЛУЧАЕМ ДАННЫЕ ПЛАТЕЖА ЧЕРЕЗ API для получения external_reference
      try {
        console.log('📡 Получаем данные платежа через MercadoPago API...');
        
        const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
          headers: {
            'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });

        if (!paymentResponse.ok) {
          console.error('❌ Ошибка получения данных платежа:', paymentResponse.status);
          return NextResponse.json({ message: 'Payment API error' }, { status: 200 });
        }

        const paymentData = await paymentResponse.json();
        console.log('📋 Данные платежа из API:', JSON.stringify(paymentData, null, 2));

        const external_reference = paymentData.external_reference;
        const payment_status = paymentData.status;
        
        console.log('🔗 External reference из API:', external_reference);
        console.log('💰 Payment status:', payment_status);

        if (!external_reference) {
          console.warn('⚠️  external_reference отсутствует в данных платежа');
          return NextResponse.json({ message: 'External reference missing' }, { status: 200 });
        }

        // Обрабатываем разные статусы платежа
        if (payment_status === 'approved') {
          console.log('✅ Платеж APPROVED, обрабатываем...');
          // Продолжаем с отправкой email клиенту и админу
        } else if (payment_status === 'rejected') {
          console.log('❌ Платеж REJECTED, обновляем статус');
          await bookingStorage.updateBooking(external_reference, {
            paymentStatus: 'rejected',
            mercadoPagoData: { paymentId, status: payment_status, processedAt: new Date().toISOString() }
          });
          
          // Отправляем уведомление админу об отклоненном платеже
          try {
            await sendAdminNotification({
              orderId: external_reference,
              customerName: booking?.name || 'N/A',
              customerEmail: booking?.email || 'N/A', 
              customerPhone: booking?.phone || 'N/A',
              service: booking?.service || 'Unknown',
              price: 'N/A',
              paymentId: paymentId,
              timestamp: new Date().toISOString(),
              status: 'PAGAMENTO_REJEITADO'
            });
            console.log('📧 Notificação admin enviada - PAGAMENTO REJEITADO');
          } catch (error) {
            console.error('❌ Erro ao enviar notificação de rejeição:', error);
          }
          
          return NextResponse.json({ message: 'Payment rejected processed' }, { status: 200 });
        } else if (payment_status === 'cancelled') {
          console.log('🚫 Платеж CANCELLED, обновляем статус');
          await bookingStorage.updateBooking(external_reference, {
            paymentStatus: 'cancelled',
            mercadoPagoData: { paymentId, status: payment_status, processedAt: new Date().toISOString() }
          });
          return NextResponse.json({ message: 'Payment cancelled processed' }, { status: 200 });
        } else {
          console.log(`⏳ Платеж в статусе: ${payment_status}, пока не обрабатываем`);
          return NextResponse.json({ message: `Payment status ${payment_status} noted` }, { status: 200 });
        }

      } catch (apiError) {
        console.error('❌ Ошибка при получении данных платежа:', apiError);
        return NextResponse.json({ message: 'Payment API request failed' }, { status: 200 });
      }
      
      // Ищем booking по external_reference (наш orderId)
      let booking = null;
      if (external_reference) {
        console.log('🔍 Ищем booking по external_reference:', external_reference);
        booking = await bookingStorage.getBookingByExternalReference(external_reference);
        
        if (booking) {
          console.log('✅ Booking НАЙДЕН:', {
            orderId: booking.orderId,
            email: booking.email,
            name: booking.name,
            service: booking.service
          });
        } else {
          console.error('❌ Booking НЕ НАЙДЕН для external_reference:', external_reference);
        }
      } else {
        console.error('❌ external_reference отсутствует в webhook данных');
      }
      
      if (!booking) {
        console.warn('⚠️  Booking не найден, возвращаем OK но не обрабатываем');
        return NextResponse.json({ message: 'Booking not found but webhook accepted' }, { status: 200 });
      }

      // Отправляем EMAIL КЛИЕНТУ после подтверждения оплаты
      try {
        await sendBookingEmail(booking.email, booking.name, booking.service, booking.orderId);
        console.log('📧 Email клиенту отправлен после подтверждения оплаты');
      } catch (emailError) {
        console.error('❌ Ошибка отправки email клиенту:', emailError);
      }

      // Отправляем ВТОРОЕ уведомление админу о подтвержденной покупке  
      try {
        const serviceNames: Record<string, string> = {
          'manicure-gel': 'MANICURE + NIVELAMENTO + ESMALTAÇÃO EM GEL',
          'alongamento-gel': 'ALONGAMENTO + MANICURE + ESMALTAÇÃO EM GEL',
          'combo-completo': 'COMBO: MANICURE + ESMALTAÇÃO EM GEL + PEDICURE + PLÁSTICA DOS PÉS'
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
        
        console.log('📧 Segunda notificação admin enviada - COMPRA CONFIRMADA');
        
      } catch (adminEmailError) {
        console.error('❌ Ошибка отправки второй notificação admin:', adminEmailError);
      }

      // Обновляем статус booking
      await bookingStorage.updateBooking(booking.orderId, {
        paymentStatus: 'approved',
        mercadoPagoData: { paymentId, processedAt: new Date().toISOString() }
      });
    }

    return NextResponse.json({ message: 'Webhook processed successfully' }, { status: 200 });

  } catch (error) {
    console.error('❌ MercadoPago webhook error:', error);
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
