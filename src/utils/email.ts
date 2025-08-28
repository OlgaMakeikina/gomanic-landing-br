import nodemailer from 'nodemailer';

interface ServiceInfo {
  name: string;
  price: string;
}

const EMAIL_CONFIG = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
};

const SERVICE_INFO: Record<string, ServiceInfo> = {
  'manicure-gel': {
    name: 'MANICURE + NIVELAMENTO + ESMALTAÇÃO EM GEL',
    price: 'R$ 80'
  },
  'alongamento-gel': {
    name: 'ALONGAMENTO + MANICURE + ESMALTAÇÃO EM GEL', 
    price: 'R$ 119'
  },
  'combo-completo': {
    name: 'COMBO: MANICURE + ESMALTAÇÃO EM GEL + PEDICURE + PLÁSTICA DOS PÉS',
    price: 'R$ 160'
  }
};

export const sendBookingEmail = async (
  email: string,
  name: string,
  serviceId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!EMAIL_CONFIG.auth.user || !EMAIL_CONFIG.auth.pass) {
      console.warn('Email não configurado - pulando envio');
      return { success: false, error: 'Email não configurado' };
    }

    const service = SERVICE_INFO[serviceId];
    if (!service) {
      throw new Error('Serviço não encontrado');
    }

    const transporter = nodemailer.createTransport(EMAIL_CONFIG);
    const emailHTML = generateEmailHTML(name, service);

    const mailOptions = {
      from: `"Gomanic Brasil" <${EMAIL_CONFIG.auth.user}>`,
      to: email,
      subject: `🎉 Pagamento Confirmado - ${service.name}`,
      html: emailHTML
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado com sucesso para:', email);
    return { success: true };
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
};

const generateEmailHTML = (name: string, service: ServiceInfo): string => {
  const whatsappNumber = process.env.WHATSAPP_BUSINESS_NUMBER || '5548991970099';
  const whatsappMessage = encodeURIComponent(`Olá! Meu pagamento foi confirmado para ${service.name}. Gostaria de agendar meu horário! 💅✨`);
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
          line-height: 1.6;
          color: #444f55;
          background: #FEFEFE;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #444f55 0%, #3B3B3A 100%);
          color: #FEFEFE;
          text-align: center;
          padding: 30px 20px;
        }
        .content {
          padding: 30px 20px;
        }
        .success-badge {
          background: #16a34a;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 20px;
        }
        .service-info {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          border-left: 4px solid #16a34a;
        }
        .whatsapp-button {
          display: inline-block;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          color: white !important;
          text-decoration: none;
          padding: 15px 25px;
          border-radius: 25px;
          font-weight: 600;
          text-align: center;
          margin: 20px 0;
        }
        .footer {
          background: #fdfffe;
          text-align: center;
          padding: 20px;
          font-size: 14px;
          color: #666;
        }
        .highlight {
          background: #e8f5e8;
          border-radius: 8px;
          padding: 15px;
          margin: 15px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 28px;">GOMANIC BRASIL</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Seu pagamento foi confirmado!</p>
        </div>
        
        <div class="content">
          <div class="success-badge">✅ PAGAMENTO APROVADO</div>
          
          <p>Olá, <strong>${name}</strong>!</p>
          
          <p>🎉 <strong>Parabéns!</strong> Seu pagamento foi confirmado com sucesso para:</p>
          
          <div class="service-info">
            <h3 style="margin: 0 0 10px 0; color: #16a34a;">${service.name}</h3>
            <p style="margin: 0; font-size: 18px; font-weight: 600; color: #444f55;">${service.price}</p>
          </div>
          
          <div class="highlight">
            <h3 style="color: #16a34a; margin-top: 0;">🗓️ Próximo Passo: Agendar sua Sessão</h3>
            <p style="margin-bottom: 15px;">Entre em contato conosco pelo WhatsApp para escolher seu horário preferido:</p>
            
            <div style="text-align: center;">
              <a href="https://wa.me/${whatsappNumber}?text=${whatsappMessage}" class="whatsapp-button">
                📱 AGENDAR NO WHATSAPP
              </a>
            </div>
          </div>
          
          <p><strong>📋 Informações importantes:</strong></p>
          <ul>
            <li>Seu pagamento está confirmado e processado</li>
            <li>Clique no botão WhatsApp acima para agendamento imediato</li>
            <li>Horários disponíveis: Segunda a Sábado, 8h às 18h</li>
            <li>Localização será enviada após agendamento</li>
          </ul>
          
          <p>Aguardamos você para sua sessão VIP! 💅✨</p>
          
          <p style="font-size: 12px; color: #888; margin-top: 30px;">
            Em caso de dúvidas, responda este email ou entre em contato pelo WhatsApp.
          </p>
        </div>
        
        <div class="footer">
          <p><strong>Gomanic Brasil</strong><br>
          Manicure e Pedicure de alta qualidade<br>
          📱 WhatsApp: +${whatsappNumber}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
