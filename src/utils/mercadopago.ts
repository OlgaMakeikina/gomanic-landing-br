import { MercadoPagoConfig, Preference } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';

interface BookingData {
  name: string;
  phone: string;
  email: string;
  service: string;
}

interface ServicePrice {
  id: string;
  name: string;
  price: number;
  description: string;
}

const SERVICES: Record<string, ServicePrice> = {
  'manicure-gel': {
    id: 'manicure-gel',
    name: 'MANICURE + NIVELAMENTO + ESMALTAÇÃO EM GEL',
    price: 80.00,
    description: 'Serviço completo de manicure com nivelamento e esmaltação em gel de alta qualidade'
  },
  'alongamento-gel': {
    id: 'alongamento-gel',
    name: 'ALONGAMENTO + MANICURE + ESMALTAÇÃO EM GEL',
    price: 119.00,
    description: 'Alongamento profissional com manicure completa e esmaltação em gel'
  },
  'combo-completo': {
    id: 'combo-completo',
    name: 'COMBO: MANICURE + ESMALTAÇÃO EM GEL + PEDICURE + PLÁSTICA DOS PÉS',
    price: 160.00,
    description: 'Combo completo com todos os serviços: manicure, pedicure, esmaltação em gel e plástica dos pés'
  }
};

// Função para criar preferência de pagamento seguindo documentação oficial
export async function createPaymentPreference(bookingData: BookingData, orderId: string): Promise<{
  success: boolean;
  preferenceId?: string;
  initPoint?: string;
  sandboxInitPoint?: string;
  error?: string;
}> {
  try {
    const service = SERVICES[bookingData.service];
    
    if (!service) {
      throw new Error('Serviço não encontrado');
    }

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    
    if (!accessToken || accessToken === 'TEST-your-access-token-here') {
      console.warn('⚠️  MERCADOPAGO_ACCESS_TOKEN não configurado - retornando dados mock');
      
      // Retornar dados mock para desenvolvimento
      return {
        success: true,
        preferenceId: `mock-pref-${orderId}`,
        initPoint: 'https://mercadopago.com.br/mock-payment',
        sandboxInitPoint: 'https://sandbox.mercadopago.com.br/mock-payment'
      };
    }

    // Configuração oficial do MercadoPago
    const client = new MercadoPagoConfig({
      accessToken: accessToken,
      options: {
        timeout: 5000,
        idempotencyKey: uuidv4()
      }
    });
    
    const preference = new Preference(client);

    // Body da preferência conforme documentação
    const preferenceBody = {
      items: [
        {
          id: service.id,
          title: service.name,
          description: service.description,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: service.price
        }
      ],
      payer: {
        name: bookingData.name,
        email: bookingData.email,
        phone: {
          number: bookingData.phone.replace(/\D/g, '')
        }
      },
      external_reference: orderId,
      notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/mercadopago/webhook`,
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_SITE_URL}/pagamento/sucesso?order=${orderId}`,
        failure: `${process.env.NEXT_PUBLIC_SITE_URL}/pagamento/erro?order=${orderId}`,
        pending: `${process.env.NEXT_PUBLIC_SITE_URL}/pagamento/pendente?order=${orderId}`
      },
      auto_return: 'approved' as const,
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12,
        default_installments: 1
      },
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };

    console.log('📝 Criando preferência MercadoPago:', {
      orderId,
      service: service.name,
      price: service.price,
      email: bookingData.email
    });

    // Criar preferência usando método oficial do SDK
    const response = await preference.create({
      body: preferenceBody
    });

    console.log('✅ Preferência criada com sucesso:', {
      id: response.id,
      init_point: response.init_point ? 'disponível' : 'não disponível',
      sandbox_init_point: response.sandbox_init_point ? 'disponível' : 'não disponível'
    });

    return {
      success: true,
      preferenceId: response.id,
      initPoint: response.init_point,
      sandboxInitPoint: response.sandbox_init_point
    };

  } catch (error: any) {
    console.error('❌ Erro ao criar preferência MercadoPago:', error);
    
    if (error.cause) {
      console.error('Causa do erro:', error.cause);
    }
    if (error.response) {
      console.error('Resposta da API:', error.response);
    }

    return {
      success: false,
      error: error.message || 'Erro desconhecido no MercadoPago'
    };
  }
}

export function getServiceInfo(serviceId: string): ServicePrice | null {
  return SERVICES[serviceId] || null;
}

export function getAllServices(): ServicePrice[] {
  return Object.values(SERVICES);
}

export { SERVICES, createPaymentPreference, getServiceInfo, getAllServices };
export type { BookingData, ServicePrice };
