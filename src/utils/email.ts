import nodemailer from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface ServiceLink {
  name: string;
  price: string;
  link: string;
}

const EMAIL_CONFIG: EmailConfig = {
  host: 'mx.hhivp.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || 'vip@gomanic.com.br',
    pass: process.env.EMAIL_PASS || 'avlfB%66'
  }
};

const SERVICE_LINKS: Record<string, ServiceLink> = {
  'manicure-gel': {
    name: 'MANICURE + NIVELAMENTO + ESMALTAÇÃO EM GEL',
    price: 'R$ 80',
    link: `${process.env.NEXT_PUBLIC_SITE_URL}/api/redirect/vip80`
  },
  'alongamento-gel': {
    name: 'ALONGAMENTO + MANICURE + ESMALTAÇÃO EM GEL',
    price: 'R$ 119',
    link: `${process.env.NEXT_PUBLIC_SITE_URL}/api/redirect/vip119`
  },
  'combo-completo': {
    name: 'COMBO: MANICURE + ESMALTAÇÃO EM GEL + PEDICURE + PLÁSTICA DOS PÉS',
    price: 'R$ 160',
    link: `${process.env.NEXT_PUBLIC_SITE_URL}/api/redirect/vip160`
  }
};

export const sendBookingEmail = async (
  email: string,
  name: string,
  serviceId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!EMAIL_CONFIG.auth.user || !EMAIL_CONFIG.auth.pass) {
      throw new Error('Credenciais de email não configuradas');
    }

    const service = SERVICE_LINKS[serviceId];
    if (!service) {
      throw new Error('Serviço não encontrado');
    }

    const transporter = nodemailer.createTransport(EMAIL_CONFIG);

    const emailHTML = generateEmailHTML(name, service);

    const mailOptions = {
      from: `"Gomanic Brasil" <${EMAIL_CONFIG.auth.user}>`,
      to: email,
      subject: `🔗 Seu link de agendamento - ${service.name}`,
      html: emailHTML
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
};

const generateEmailHTML = (name: string, service: ServiceLink): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
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
          background: #444f55;
          color: #FEFEFE;
          text-align: center;
          padding: 30px 20px;
        }
        .content {
          padding: 30px 20px;
        }
        .service-info {
          background: #fdfffe;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          border-left: 4px solid #444f55;
        }
        .cta-button {
          display: inline-block;
          background: #444f55;
          color: #FEFEFE !important;
          text-decoration: none;
          padding: 15px 30px;
          border-radius: 8px;
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
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 28px;">GOMANIC BRASIL</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Seu link de agendamento está pronto!</p>
        </div>
        
        <div class="content">
          <p>Olá, <strong>${name}</strong>!</p>
          
          <p>Obrigado pelo seu interesse nos nossos serviços. Aqui está seu link personalizado para agendamento:</p>
          
          <div class="service-info">
            <h3 style="margin: 0 0 10px 0; color: #444f55;">${service.name}</h3>
            <p style="margin: 0; font-size: 18px; font-weight: 600; color: #444f55;">${service.price}</p>
          </div>
          
          <div style="text-align: center;">
            <a href="${service.link}" class="cta-button">
              🔗 AGENDAR AGORA
            </a>
          </div>
          
          <p><strong>Importante:</strong></p>
          <ul>
            <li>Este link é personalizado para você</li>
            <li>Clique no botão acima para ser direcionado ao sistema de agendamento</li>
            <li>Escolha o melhor horário disponível</li>
            <li>Você receberá uma confirmação por WhatsApp</li>
          </ul>
          
          <p>Caso tenha dúvidas, entre em contato conosco.</p>
          
          <p>Aguardamos você! 💅✨</p>
        </div>
        
        <div class="footer">
          <p><strong>Gomanic Brasil</strong><br>
          Unhas de qualidade profissional</p>
          <p style="font-size: 12px; margin-top: 15px;">
            Este email foi enviado porque você solicitou informações no nosso site.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};
