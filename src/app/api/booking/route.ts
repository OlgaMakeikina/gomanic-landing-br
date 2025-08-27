import { NextRequest, NextResponse } from 'next/server';
import { generateWhatsAppLink } from '@/utils/whatsapp';
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

    const whatsappUrl = generateWhatsAppLink(name, service);

    try {
      await sendBookingEmail(email, name, service);
    } catch (emailError) {
      console.warn('Email sending failed, but continuing with WhatsApp:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Link do WhatsApp gerado e email enviado!',
      data: {
        whatsappUrl,
        name,
        service,
        email
      },
    });
  } catch (error) {
    console.error('API booking error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}