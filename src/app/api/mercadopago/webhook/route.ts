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
      
      // Aqui enviamos email após confirmação de pagamento
      try {
        // Exemplo: buscar booking e enviar email
        console.log('📧 Enviando email de confirmação...');
        
        // TODO: Implementar busca do booking e envio de email
        // const booking = await bookingStorage.getBookingByPaymentId(paymentId);
        // if (booking) {
        //   await sendBookingEmail(booking.email, booking.name, booking.service);
        // }
        
      } catch (emailError) {
        console.error('Erro ao enviar email de confirmação:', emailError);
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
