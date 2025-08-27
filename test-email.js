require('dotenv').config({ path: '.env.local' });
const { sendBookingEmail } = require('./src/utils/email');

async function testEmail() {
  console.log('🧪 Iniciando teste de email...');
  console.log('📧 Configuração:');
  console.log('   Host:', process.env.EMAIL_USER ? 'mx.hhivp.com' : 'NOT SET');
  console.log('   User:', process.env.EMAIL_USER || 'NOT SET');
  console.log('   Pass:', process.env.EMAIL_PASS ? '***HIDDEN***' : 'NOT SET');
  
  try {
    const result = await sendBookingEmail(
      'zarudesu@gmail.com',
      'João Silva', 
      'manicure-gel'
    );
    
    if (result.success) {
      console.log('✅ Email enviado com sucesso!');
      console.log('📧 Destinatário: zarudesu@gmail.com');
      console.log('👤 Nome: João Silva');
      console.log('💅 Serviço: MANICURE + NIVELAMENTO + ESMALTAÇÃO EM GEL');
      console.log('💰 Preço: R$ 80');
      console.log('🔗 Link: ' + process.env.NEXT_PUBLIC_SITE_URL + '/vip80');
    } else {
      console.log('❌ Erro ao enviar email:', result.error);
    }
  } catch (error) {
    console.error('💥 Erro no teste:', error.message);
  }
}

testEmail();
