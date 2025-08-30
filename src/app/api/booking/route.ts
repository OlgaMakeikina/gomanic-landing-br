import { NextRequest, NextResponse } from 'next/server';
import { createPaymentPreference } from '@/utils/mercadopago';
import { bookingStorage } from '@/utils/storage';
import { submitToN8N } from '@/utils/n8n';
import { sendBookingEmail } from '@/utils/email';
import { sendAdminNotification } from '@/utils/admin-email';
import { paymentLogger } from '@/utils/paymentLogger';

const getServicePrice = (service: string): number => {
  const prices: Record<string, number> = {
    'manicure-gel': 80,
    'alongamento-gel': 119,
    'combo-completo': 160
  };
  return prices[service] || 0;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, service } = body;

    if (!name || !phone || !email || !service) {
      return NextResponse.json(
        { error: 'Nome, telefone, email e serviço são obrigatórios' },
        { status: 400 }
      );
    }

    // 1. Salvar dados localmente primeiro
    const bookingRecord = await bookingStorage.saveBooking({
      name,
      phone,
      email,
      service
    });

    paymentLogger.logBusinessEvent({
      orderId: bookingRecord.orderId,
      event: 'booking_created',
      customerEmail: email,
      timestamp: new Date(),
      details: { 
        name, 
        phone, 
        service,
        amount: getServicePrice(service)
      }
    });

    // 2. Criar preferência no MercadoPago
    const paymentResult = await createPaymentPreference(
      { name, phone, email, service },
      bookingRecord.orderId
    );

    if (!paymentResult.success) {
      console.error('❌ MercadoPago error:', paymentResult.error);
      return NextResponse.json(
        { error: paymentResult.error || 'Erro ao criar pagamento no MercadoPago' },
        { status: 500 }
      );
    }

    // Selecionar o link correto baseado no ambiente
    const paymentUrl = paymentResult.initPoint || paymentResult.sandboxInitPoint;
    
    if (!paymentUrl) {
      console.error('❌ Nenhum link de pagamento retornado pelo MercadoPago');
      return NextResponse.json(
        { error: 'Link de pagamento não foi gerado' },
        { status: 500 }
      );
    }

    console.log('🔗 Link de pagamento gerado:', paymentUrl);

    // 3. Atualizar booking com dados do MercadoPago
    await bookingStorage.updateBooking(bookingRecord.orderId, {
      preferenceId: paymentResult.preferenceId,
      mercadoPagoUrl: paymentUrl
    });

    // 4. Enviar para N8N
    try {
      const n8nResult = await submitToN8N({
        orderId: bookingRecord.orderId,
        name,
        phone,
        email,
        service,
        paymentStatus: 'pending',
        preferenceId: paymentResult.preferenceId,
        mercadoPagoUrl: paymentUrl,
        createdAt: bookingRecord.createdAt
      });

      if (n8nResult.success) {
        await bookingStorage.updateBooking(bookingRecord.orderId, {
          n8nSent: true
        });
      }
    } catch (n8nError) {
      paymentLogger.logPaymentError(bookingRecord.orderId, n8nError, 'n8n_webhook');
    }

    paymentLogger.logBusinessEvent({
      orderId: bookingRecord.orderId,
      event: 'payment_pending',
      customerEmail: email,
      timestamp: new Date(),
      details: { paymentUrl, preferenceId: paymentResult.preferenceId }
    });

    // 6. Уведомить администраторов О ПОПЫТКЕ ПОКУПКИ
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
        orderId: bookingRecord.orderId,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        service: serviceNames[service] || service,
        price: servicePrices[service] || 'N/A',
        timestamp: new Date().toISOString(),
        status: 'TENTATIVA_COMPRA'
      });
      
      paymentLogger.logBusinessEvent({
        orderId: bookingRecord.orderId,
        event: 'admin_notification_tentativa',
        customerEmail: email,
        timestamp: new Date()
      });
    } catch (adminEmailError) {
      paymentLogger.logPaymentError(bookingRecord.orderId, adminEmailError, 'admin_notification_tentativa');
    }

    return NextResponse.json({
      success: true,
      message: 'Booking criado com sucesso!',
      data: {
        orderId: bookingRecord.orderId,
        paymentUrl: paymentUrl,
        preferenceId: paymentResult.preferenceId
      }
    });

  } catch (error) {
    paymentLogger.logPaymentError('booking', error, 'booking_creation');
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}