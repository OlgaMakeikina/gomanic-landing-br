declare global {
  interface Window {
    fbq: (action: string, event: string, data?: any) => void;
  }
}

export const trackEvent = (event: string, data?: any) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', event, data);
  }
};

export const trackCustomEvent = (eventName: string, data?: any) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, data);
  }
};

export const trackPurchase = (orderId: string, value: number, currency: string = 'BRL') => {
  trackEvent('Purchase', {
    value: value,
    currency: currency,
    content_ids: [orderId],
    content_type: 'product'
  });
};

export const trackAddToCart = (serviceId: string, value: number) => {
  trackEvent('AddToCart', {
    value: value,
    currency: 'BRL',
    content_ids: [serviceId],
    content_type: 'product'
  });
};

export const trackInitiateCheckout = (orderId: string, value: number) => {
  trackEvent('InitiateCheckout', {
    value: value,
    currency: 'BRL',
    content_ids: [orderId],
    content_type: 'product'
  });
};

export const trackLead = (content_name?: string) => {
  trackEvent('Lead', {
    content_name: content_name || 'Contact Form'
  });
};

export const trackCompleteRegistration = (method: string = 'booking') => {
  trackEvent('CompleteRegistration', {
    content_name: method
  });
};

export const checkPixelStatus = () => {
  if (typeof window !== 'undefined') {
    console.log('Meta Pixel Status:');
    console.log('- fbq function exists:', typeof window.fbq === 'function');
    console.log('- Pixel ID in env:', process.env.FACEBOOK_PIXEL_ID ? 'Set' : 'Not set');
    
    // Test pixel call
    if (window.fbq) {
      window.fbq('track', 'PageView');
      console.log('- Test PageView event sent');
    }
  }
};
