import nodemailer from 'nodemailer';

interface AdminNotificationData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  service: string;
  price: string;
  paymentId?: string;
  timestamp: string;
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

export const sendAdminNotification = async (data: AdminNotificationData): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!EMAIL_CONFIG.auth.user || !EMAIL_CONFIG.auth.pass) {
      console.warn('Email não configurado - pulando notificação admin');
      return { success: false, error: 'Email não configurado' };
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      console.warn('ADMIN_EMAIL não configurado');
      return { success: false, error: 'Admin email não configurado' };
    }

    const transporter = nodemailer.createTransport(EMAIL_CONFIG);
    const emailHTML = generateAdminEmailHTML(data);

    const mailOptions = {
      from: `"Gomanic Brasil - Sistema" <${EMAIL_CONFIG.auth.user}>`,
      to: adminEmail,
      subject: `🔔 Nova Compra: ${data.service} - ${data.customerName}`,
      html: emailHTML
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Notificação admin enviada para:', adminEmail);
    return { success: true };
  } catch (error) {
    console.error('❌ Erro ao enviar notificação admin:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
};

const generateAdminEmailHTML = (data: AdminNotificationData): string => {
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
          background: #f5f5f5;
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
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          color: white;
          text-align: center;
          padding: 20px;
        }
        .content {
          padding: 30px 20px;
        }
        .alert-badge {
          background: #dc2626;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 20px;
        }
        .customer-info {
          background: #f8fafc;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          border-left: 4px solid #dc2626;
        }
        .service-info {
          background: #f0fdf4;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          border-left: 4px solid #16a34a;
        }
        .footer {
          background: #f8fafc;
          text-align: center;
          padding: 20px;
          font-size: 14px;
          color: #666;
        }
        .data-row {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .data-label {
          font-weight: 600;
          color: #374151;
        }
        .data-value {
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 24px;">🔔 NOVA COMPRA</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Gomanic Brasil - Notificação Admin</p>
        </div>
        
        <div class="content">
          <div class="alert-badge">NOVA VENDA</div>
          
          <p>Uma nova compra foi realizada no site!</p>
          
          <div class="customer-info">
            <h3 style="margin: 0 0 15px 0; color: #dc2626;">👤 Dados do Cliente</h3>
            <div class="data-row">
              <span class="data-label">Nome:</span>
              <span class="data-value">${data.customerName}</span>
            </div>
            <div class="data-row">
              <span class="data-label">Email:</span>
              <span class="data-value">${data.customerEmail}</span>
            </div>
            <div class="data-row">
              <span class="data-label">Telefone:</span>
              <span class="data-value">${data.customerPhone}</span>
            </div>
          </div>
          
          <div class="service-info">
            <h3 style="margin: 0 0 15px 0; color: #16a34a;">💅 Serviço Adquirido</h3>
            <div class="data-row">
              <span class="data-label">Serviço:</span>
              <span class="data-value">${data.service}</span>
            </div>
            <div class="data-row">
              <span class="data-label">Valor:</span>
              <span class="data-value">${data.price}</span>
            </div>
            <div class="data-row">
              <span class="data-label">Pedido:</span>
              <span class="data-value">#${data.orderId}</span>
            </div>
            ${data.paymentId ? `<div class="data-row">
              <span class="data-label">Pagamento:</span>
              <span class="data-value">#${data.paymentId}</span>
            </div>` : ''}
            <div class="data-row">
              <span class="data-label">Data/Hora:</span>
              <span class="data-value">${new Date(data.timestamp).toLocaleString('pt-BR')}</span>
            </div>
          </div>
          
          <div style="background: #eff6ff; border-radius: 8px; padding: 15px; margin: 15px 0;">
            <h3 style="color: #1d4ed8; margin-top: 0;">📱 Próximos Passos</h3>
            <p style="margin-bottom: 0;">O cliente receberá um email com link para WhatsApp. Aguarde o contato para agendamento!</p>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>Gomanic Brasil - Sistema Administrativo</strong><br>
          Notificação automática de nova venda</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
