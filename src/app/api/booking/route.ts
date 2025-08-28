import { NextRequest, NextResponse } from 'next/server';
import { createPaymentPreference } from '@/utils/mercadopago';
import { bookingStorage } from '@/utils/storage';
import { submitToN8N } from '@/utils/n8n';
import { sendBookingEmail } from '@/utils/email';

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

    console.log('Processing booking for:', { name, email, service });

    // 1. Salvar dados localmente primeiro
    const bookingRecord = await bookingStorage.saveBooking({
      name,
      phone,
      email,
      service
    });

    console.log('Booking saved with orderId:', bookingRecord.orderId);

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

    // 4. Enviar para N8N em paralelo
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
      console.warn('N8N sending failed, but continuing:', n8nError);
    }

    // 5. НЕ отправляем email здесь - только после успешной оплаты в webhook
    // Email будет отправлен через MercadoPago webhook
    console.log('Email будет отправлен после подтверждения оплаты через webhook');

    console.log('Booking processed successfully, redirecting to:', paymentResult.initPoint);

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
    console.error('API booking error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}