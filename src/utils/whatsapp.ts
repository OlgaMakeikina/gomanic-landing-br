interface WhatsAppConfig {
  businessNumber: string;
  baseUrl: string;
}

interface ServiceInfo {
  id: string;
  name: string;
  price: string;
  shortCode: string;
}

const WHATSAPP_CONFIG: WhatsAppConfig = {
  businessNumber: '5548999170099',
  baseUrl: 'https://api.whatsapp.com/send'
};

const SERVICES: Record<string, ServiceInfo> = {
  'manicure-gel': {
    id: 'manicure-gel',
    name: 'MANICURE + NIVELAMENTO + ESMALTAÇÃO EM GEL',
    price: 'R$ 80',
    shortCode: 'vip80'
  },
  'alongamento-gel': {
    id: 'alongamento-gel',
    name: 'ALONGAMENTO + MANICURE + ESMALTAÇÃO EM GEL',
    price: 'R$ 119',
    shortCode: 'vip119'
  },
  'combo-completo': {
    id: 'combo-completo',
    name: 'COMBO: MANICURE + ESMALTAÇÃO EM GEL + PEDICURE + PLÁSTICA DOS PÉS',
    price: 'R$ 160',
    shortCode: 'vip160'
  }
};

export const generateWhatsAppLink = (
  name: string,
  serviceId: string,
  siteUrl: string = process.env.NEXT_PUBLIC_SITE_URL || 'https://gomanic.com.br'
): string => {
  const service = SERVICES[serviceId];
  
  if (!service) {
    throw new Error('Serviço não encontrado');
  }

  const shortLink = `${siteUrl}/${service.shortCode}`;
  
  const message = `Olá! Sou *${name}* e gostaria de agendar o serviço:

✨ *${service.name}*
💰 *${service.price}*

Aqui está meu link personalizado para agendamento:
🔗 ${shortLink}

Obrigado! 💅`;

  const encodedMessage = encodeURIComponent(message);
  
  return `${WHATSAPP_CONFIG.baseUrl}?phone=${WHATSAPP_CONFIG.businessNumber}&text=${encodedMessage}`;
};

export const openWhatsAppChat = (name: string, serviceId: string): void => {
  const whatsappUrl = generateWhatsAppLink(name, serviceId);
  
  if (typeof window !== 'undefined') {
    window.open(whatsappUrl, '_blank');
  }
};

export const getServiceInfo = (serviceId: string): ServiceInfo | null => {
  return SERVICES[serviceId] || null;
};

export const getAllServices = (): ServiceInfo[] => {
  return Object.values(SERVICES);
};
