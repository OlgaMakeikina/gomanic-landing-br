import { NextRequest, NextResponse } from 'next/server';
import { bookingStorage } from '@/utils/storage';
import { submitToN8N } from '@/utils/n8n';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    console.log('MercadoPago webhook received:', { type, data });

    if (type === 'payment') {
      const paymentId = data?.id;
      
      if (!paymentId) {
        console.warn('Payment webhook without payment ID');
        return NextResponse.json({ message: 'Payment ID missing' }, { status: 200 });
      }

      // Aqui нужно получить данные платежа через MercadoPago API
      // Пока просто логируем
      console.log('Payment webhook for payment ID:', paymentId);
      
      // TODO: Implement payment status check and booking update
      // const paymentInfo = await mercadopagoService.getPayment(paymentId);
      // await bookingStorage.updateBooking(orderId, { paymentStatus: paymentInfo.status });
    }

    return NextResponse.json({ message: 'Webhook processed' }, { status: 200 });

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
    status: 'active'
  });
}
