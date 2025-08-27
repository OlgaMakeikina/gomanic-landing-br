import { NextRequest, NextResponse } from 'next/server';
import { generateWhatsAppLink } from '@/utils/whatsapp';

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Teste do WhatsApp iniciado...');
    
    const whatsappUrl = generateWhatsAppLink(
      'João Silva - Teste',
      'manicure-gel'
    );

    return NextResponse.json({
      success: true,
      message: '✅ Link do WhatsApp gerado com sucesso!',
      data: {
        whatsappUrl,
        name: 'João Silva - Teste',
        service: 'MANICURE + NIVELAMENTO + ESMALTAÇÃO EM GEL',
        price: 'R$ 80',
        businessNumber: '5548999170099',
        shortLink: `${process.env.NEXT_PUBLIC_SITE_URL}/vip80`
      }
    });
  } catch (error) {
    console.error('Erro no teste do WhatsApp:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
}
