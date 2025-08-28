interface N8NSubmissionData {
  orderId: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  paymentStatus: string;
  preferenceId?: string;
  mercadoPagoUrl?: string;
  createdAt: string;
}

interface N8NResponse {
  success: boolean;
  data?: any;
  error?: string;
}

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || '';

export const submitToN8N = async (data: N8NSubmissionData): Promise<N8NResponse> => {
  if (!N8N_WEBHOOK_URL) {
    console.error('N8N_WEBHOOK_URL not configured');
    return { 
      success: false, 
      error: 'N8N webhook URL not configured' 
    };
  }

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: data.orderId,
        name: data.name,
        phone: data.phone,
        email: data.email,
        service: data.service,
        paymentStatus: data.paymentStatus,
        preferenceId: data.preferenceId,
        mercadoPagoUrl: data.mercadoPagoUrl,
        source: 'gomanic-landing-br',
        timestamp: data.createdAt,
        type: 'booking_with_payment'
      }),
    });

    if (!response.ok) {
      throw new Error(`N8N API error: ${response.status}`);
    }

    const responseData = await response.json();
    return { success: true, data: responseData };
  } catch (error) {
    console.error('N8N submission error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

export default { submitToN8N };