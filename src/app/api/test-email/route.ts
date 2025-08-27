import { NextRequest, NextResponse } from 'next/server';
import { sendBookingEmail } from '@/utils/email';

export async function POST(request: NextRequest) {
  try {
    const testEmail = 'zarudesu@gmail.com';
    const testName = 'Teste Cliente';
    const testService = 'manicure-gel';

    console.log('Enviando email de teste para:', testEmail);
    
    const result = await sendBookingEmail(testEmail, testName, testService);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Email de teste enviado com sucesso para ${testEmail}!`,
        data: { email: testEmail, name: testName, service: testService }
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error || 'Erro ao enviar email'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Erro no teste de email:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Endpoint de teste de email. Use POST para enviar email de teste.',
    testEmail: 'zarudesu@gmail.com'
  });
}
