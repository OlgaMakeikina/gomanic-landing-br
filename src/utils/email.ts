import nodemailer from 'nodemailer';

interface ServiceInfo {
  name: string;
  price: string;
}

const EMAIL_CONFIG = {
  host: 'mx.hhivp.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
};

const SERVICE_INFO: Record<string, ServiceInfo> = {
  'manicure-gel': { name: 'Manicure + Gel', price: 'R$ 80' },
  'alongamento-gel': { name: 'Alongamento + Gel', price: 'R$ 119' },
  'combo-completo': { name: 'Combo Completo', price: 'R$ 160' }
};

export const sendBookingEmail = async (
  email: string,
  name: string,
  serviceId: string,
  orderId?: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('📧 Iniciando envio de email para:', email);
    console.log('📧 Configuração SMTP:', {
      host: EMAIL_CONFIG.host,
      port: EMAIL_CONFIG.port,
      secure: EMAIL_CONFIG.secure,
      user: EMAIL_CONFIG.auth.user
    });

    if (!EMAIL_CONFIG.auth.user || !EMAIL_CONFIG.auth.pass) {
      const error = 'Email não configurado - credenciais ausentes';
      console.error('❌', error);
      return { success: false, error };
    }

    const service = SERVICE_INFO[serviceId];
    if (!service) {
      const error = `Serviço não encontrado: ${serviceId}`;
      console.error('❌', error);
      return { success: false, error };
    }

    console.log('Criando transporter...');
    const transporter = nodemailer.createTransport(EMAIL_CONFIG);
    
    console.log('📧 Verificando conexão SMTP...');
    await transporter.verify();
    console.log('✅ Conexão SMTP verificada com sucesso');

    const emailHTML = generateEmailHTML(name, service, orderId);

    const mailOptions = {
      from: `"Gomanic Brasil - Confirmação" <${EMAIL_CONFIG.auth.user}>`,
      to: email,
      subject: `✅ Pagamento Confirmado - ${service.name}`,
      html: emailHTML,
      headers: {
        'Reply-To': EMAIL_CONFIG.auth.user,
        'X-Mailer': 'Gomanic Brasil System',
        'X-Priority': '1',
        'Message-ID': `<${Date.now()}.${Math.random()}@gomanic.com.br>`
      }
    };

    console.log('📧 Enviando email com configurações:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      hasHtml: !!mailOptions.html
    });

    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email enviado com sucesso - DETALHES COMPLETOS:', {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
      envelope: info.envelope
    });

    if (info.rejected && info.rejected.length > 0) {
      console.warn('⚠️  Alguns emails foram rejeitados:', info.rejected);
    }

    return { success: true };
  } catch (error) {
    console.error('❌ Erro detalhado ao enviar email:', {
      email: email,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      code: (error as any)?.code,
      command: (error as any)?.command,
      response: (error as any)?.response,
      responseCode: (error as any)?.responseCode,
      stack: error instanceof Error ? error.stack : 'No stack'
    });
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
};

const generateEmailHTML = (name: string, service: ServiceInfo, orderId?: string): string => {
  const whatsappNumber = process.env.WHATSAPP_BUSINESS_NUMBER || '5548991970099';
  const whatsappMessage = encodeURIComponent(`Olá! Meu pagamento foi confirmado para ${service.name}. Gostaria de agendar meu horário!\n\nDados:\n• Serviço: ${service.name}\n• Valor: ${service.price}\n${orderId ? `• Pedido: #${orderId}\n` : ''}• Status: Confirmado\n\nQuando posso agendar?`);
  
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
          text-decoration: none !important;
          padding: 15px 30px;
          border-radius: 8px;
          font-weight: 600;
          text-align: center;
          margin: 20px 0;
          transition: transform 0.2s;
        }
        .whatsapp-button:hover {
          transform: translateY(-2px);
        }
        .footer {
          background: #f8fafc;
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
          <h1 style="margin: 0; font-size: 24px;">Pagamento Confirmado!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Obrigado pela sua compra, ${name}!</p>
        </div>
        
        <div class="content">
          <div class="success-badge">PAGAMENTO APROVADO</div>
          
          <p>Seu pagamento foi processado com sucesso. Agora você pode agendar seu horário!</p>
          
          <div class="service-info">
            <h3 style="color: #16a34a; margin-top: 0;">Serviço Adquirido</h3>
            <p><strong>Serviço:</strong> ${service.name}</p>
            <p><strong>Valor:</strong> ${service.price}</p>
            ${orderId ? `<p><strong>Pedido:</strong> #${orderId}</p>` : ''}
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://wa.me/${whatsappNumber}?text=${whatsappMessage}" 
               class="whatsapp-button">
              📱 AGENDAR PELO WHATSAPP
            </a>
          </div>
          
          <p><strong>📋 Informações importantes:</strong></p>
          <ul>
            <li>Seu pagamento está confirmado e processado</li>
            <li>Clique no botão WhatsApp acima para agendamento imediato</li>
            <li>Horários disponíveis: Segunda a Sábado, 8h às 18h</li>
          </ul>

          <div style="background: #f8fafc; border-left: 4px solid #16a34a; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; font-weight: 600; color: #374151;">📍 <strong>Endereço do Salão:</strong></p>
            <p style="margin: 5px 0 0 0; color: #4b5563;">
              Sala 1, Rod. Armando Calil Bulos, 5795<br>
              Ingleses Norte, Florianópolis - SC, 88058-001<br>
              📞 (48) 99197-0099
            </p>
          </div>
          
          <p>Aguardamos você para sua sessão VIP!</p>
          
          <p style="font-size: 12px; color: #888; margin-top: 30px;">
            Em caso de dúvidas, responda este email ou entre em contato pelo WhatsApp.
          </p>
        </div>
        
        <div class="footer">
          <p><strong>Gomanic Brasil</strong><br>
          Sala 1, Rod. Armando Calil Bulos, 5795<br>
          Ingleses Norte, Florianópolis - SC, 88058-001<br>
          📞 (48) 99197-0099<br>
          📱 WhatsApp: +${whatsappNumber}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
