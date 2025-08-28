import { NextRequest, NextResponse } from 'next/server';
import { bookingStorage } from '@/utils/storage';
import { sendBookingEmail } from '@/utils/email';
import { sendAdminNotification } from '@/utils/admin-email';

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
      
      // Получаем дополнительные данные из webhook
      const external_reference = data?.external_reference;
      console.log('🔗 External reference (orderId):', external_reference);
      
      // Ищем booking по external_reference (наш orderId)
      let booking = null;
      if (external_reference) {
        booking = await bookingStorage.getBookingByExternalReference(external_reference);
      }
      
      if (!booking) {
        console.warn('⚠️  Booking не найден для external_reference:', external_reference);
        return NextResponse.json({ message: 'Booking not found' }, { status: 200 });
      }

      console.log('✅ Booking найден:', booking.orderId);

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
