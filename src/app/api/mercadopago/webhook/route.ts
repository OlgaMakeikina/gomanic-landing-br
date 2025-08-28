import { NextRequest, NextResponse } from 'next/server';
import { bookingStorage } from '@/utils/storage';
import { sendBookingEmail } from '@/utils/email';
import { sendAdminNotification } from '@/utils/admin-email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    console.log('MercadoPago webhook dados completos:', JSON.stringify(body, null, 2));

    if (type === 'payment') {
      const paymentId = data?.id;
      
      if (!paymentId) {
        console.warn('Payment webhook without payment ID');
        return NextResponse.json({ message: 'Payment ID missing' }, { status: 200 });
      }

      console.log('Payment webhook for payment ID:', paymentId);
      
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
        console.log('Dados do pagamento da API:', JSON.stringify(paymentData, null, 2));

        const external_reference = paymentData.external_reference;
        const payment_status = paymentData.status;
        
        console.log('External reference da API:', external_reference);
        console.log('Payment status:', payment_status);

        if (!external_reference) {
          console.warn('external_reference ausente nos dados do pagamento');
          return NextResponse.json({ message: 'External reference missing' }, { status: 200 });
        }

        // BUSCAR BOOKING
        console.log('Buscando booking por external_reference:', external_reference);
        const booking = await bookingStorage.getBookingByExternalReference(external_reference);
        
        if (booking) {
          console.log('Booking ENCONTRADO:', {
            orderId: booking.orderId,
            email: booking.email,
            name: booking.name,
            service: booking.service
          });
        } else {
          console.error('Booking NAO ENCONTRADO para external_reference:', external_reference);
        }

        // PROCESSAR DIFERENTES STATUS
        if (payment_status === 'approved') {
          if (!booking) {
            console.warn('Booking nao encontrado para pagamento aprovado');
            return NextResponse.json({ message: 'Booking not found for approved payment' }, { status: 200 });
          }
          
          console.log('Pagamento APROVADO, processando...');

          // Enviar EMAIL para o CLIENTE
          try {
            await sendBookingEmail(booking.email, booking.name, booking.service, booking.orderId);
            console.log('Email enviado para o cliente apos confirmacao do pagamento');
          } catch (emailError) {
            console.error('Erro ao enviar email para o cliente:', emailError);
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
            
            console.log('Segunda notificacao admin enviada - COMPRA CONFIRMADA');
            
          } catch (adminEmailError) {
            console.error('Erro ao enviar segunda notificacao admin:', adminEmailError);
          }

          // Atualizar status do booking
          await bookingStorage.updateBooking(booking.orderId, {
            paymentStatus: 'approved',
            mercadoPagoData: { paymentId, processedAt: new Date().toISOString() }
          });

        } else if (payment_status === 'rejected') {
          console.log('Pagamento REJEITADO, atualizando status');
          
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
            console.log('Notificacao admin enviada - PAGAMENTO REJEITADO');
          } catch (error) {
            console.error('Erro ao enviar notificacao de rejeicao:', error);
          }
          
          return NextResponse.json({ message: 'Payment rejected processed' }, { status: 200 });

        } else if (payment_status === 'cancelled') {
          console.log('Pagamento CANCELADO, atualizando status');
          
          if (external_reference) {
            await bookingStorage.updateBooking(external_reference, {
              paymentStatus: 'cancelled',
              mercadoPagoData: { paymentId, status: payment_status, processedAt: new Date().toISOString() }
            });
          }
          
          return NextResponse.json({ message: 'Payment cancelled processed' }, { status: 200 });

        } else {
          console.log(`Pagamento em status: ${payment_status}, aguardando`);
          return NextResponse.json({ message: `Payment status ${payment_status} noted` }, { status: 200 });
        }

      } catch (apiError) {
        console.error('Erro ao obter dados do pagamento:', apiError);
        return NextResponse.json({ message: 'Payment API request failed' }, { status: 200 });
      }
    }

    return NextResponse.json({ message: 'Webhook processed successfully' }, { status: 200 });

  } catch (error) {
    console.error('MercadoPago webhook error:', error);
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
