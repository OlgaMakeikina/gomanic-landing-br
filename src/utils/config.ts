export const config = {
  fresha: {
    apiKey: process.env.FRESHA_API_KEY || '',
    webhookUrl: process.env.FRESHA_WEBHOOK_URL || ''
  },
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || ''
  },
  whatsapp: {
    apiKey: process.env.WHATSAPP_API_KEY || '',
    businessNumber: process.env.WHATSAPP_BUSINESS_NUMBER || ''
  }
};
