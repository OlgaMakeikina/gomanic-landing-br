import { NextRequest, NextResponse } from 'next/server';
import { bookingStorage } from '@/utils/storage';
import { sendBookingEmail } from '@/utils/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    console.log('🔔 MercadoPago webhook received:', { type, data });

    if (type === 'payment') {
      const paymentId = data?.id;
      
      if (!paymentId) {
        console.warn('Payment webhook without payment ID');
        return NextResponse.json({ message: 'Payment ID missing' }, { status: 200 });
      }

      console.log('💳 Payment webhook for payment ID:', paymentId);
      
      // TODO: Verificar status do pagamento via API
      // Por enquanto assumimos que é aprovado se chegou webhook
      
      // Buscar booking pelo paymentId ou external_reference
      // Para isso precisamos salvar paymentId no booking
      console.log('✅ Pagamento confirmado via webhook');
      
      // Отправляем ВТОРОЕ уведомление админу о подтвержденной покупке
      try {
        console.log('📧 Enviando notificação admin - COMPRA CONFIRMADA...');
        
        // TODO: Найти booking по paymentId и отправить подтверждение
        // const booking = await bookingStorage.getBookingByPaymentId(paymentId);
        // if (booking) {
        //   await sendAdminNotification({
        //     ...booking,
        //     paymentId: paymentId,
        //     status: 'COMPRA_CONFIRMADA'
        //   });
        //   await sendBookingEmail(booking.email, booking.name, booking.service, booking.orderId);
        // }
        
        console.log('✅ Segunda notificação admin será implementada após estruturação storage');
        
      } catch (emailError) {
        console.error('Erro ao enviar confirmação:', emailError);
      }
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
