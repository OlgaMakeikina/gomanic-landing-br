'use client';

import { useState, useEffect } from 'react';
import { trackFormSubmission } from '@/utils/analytics';
import { 
  validateLatinAmericanPhone, 
  validateBrazilianName, 
  validateEmail,
  formatLatinAmericanPhone
} from '@/utils/validation';
import { openWhatsAppChat } from '@/utils/whatsapp';

interface BookingFormProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export default function BookingForm({ className = '', variant = 'default' }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    consentLGPD: false,
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // GLASS стили как в SegurancaQualidade
  const GLASS = {
    cardBg: 'rgba(255, 255, 255, 0.12)',
    cardBorder: 'rgba(255, 255, 255, 0.25)',
    cardShadow: '0 32px 64px rgba(0,0,0,0.5)',
  };

  // Список услуг
  const validateField = (field: string, value: string) => {
    let validation: { isValid: boolean; error?: string };
    
    switch (field) {
      case 'name':
        validation = validateBrazilianName(value);
        break;
      case 'phone':
        validation = validateLatinAmericanPhone(value);
        break;
      case 'email':
        validation = validateEmail(value);
        break;
      default:
        return;
    }
    
    setErrors(prev => ({
      ...prev,
      [field]: validation.isValid ? '' : validation.error || ''
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    let processedValue = value;
    
    if (field === 'phone') {
      processedValue = formatLatinAmericanPhone(value);
    }
    
    setFormData(prev => ({ ...prev, [field]: processedValue }));
    
    if (value.trim()) {
      validateField(field, value);
    } else {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const services = [
    {
      id: 'manicure-gel',
      name: 'MANICURE + NIVELAMENTO + ESMALTAÇÃO EM GEL',
      price: 'R$ 80'
    },
    {
      id: 'alongamento-gel', 
      name: 'ALONGAMENTO + MANICURE + ESMALTAÇÃO EM GEL',
      price: 'R$ 119'
    },
    {
      id: 'combo-completo',
      name: 'COMBO: MANICURE + ESMALTAÇÃO EM GEL + PEDICURE + PLÁSTICA DOS PÉS',
      price: 'R$ 160'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const nameValidation = validateBrazilianName(formData.name);
    const phoneValidation = validateLatinAmericanPhone(formData.phone);
    const emailValidation = validateEmail(formData.email);

    setErrors({
      name: nameValidation.isValid ? '' : nameValidation.error || '',
      phone: phoneValidation.isValid ? '' : phoneValidation.error || '',
      email: emailValidation.isValid ? '' : emailValidation.error || ''
    });

    if (!nameValidation.isValid || !phoneValidation.isValid || !emailValidation.isValid) {
      setError('Por favor, corrija os erros nos campos acima');
      setIsSubmitting(false);
      return;
    }

    // Валидация выбора услуги
    if (!formData.service) {
      setError('Por favor, escolha uma opção de serviço');
      setIsSubmitting(false);
      return;
    }

    if (!formData.consentLGPD) {
      setError('É necessário aceitar os termos para continuar');
      setIsSubmitting(false);
      return;
    }

    try {
      trackFormSubmission('booking_form');
      
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'booking' }),
      });

      const result = await response.json();
      
      if (result.success) {
        // Redirect to MercadoPago
        if (result.data.paymentUrl) {
          window.location.href = result.data.paymentUrl;
          return;
        }
        
        setIsSubmitted(true);
        
        // Analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'conversion', {
            send_to: 'AW-XXXXXXXXX/XXXXXXXXXXXXX',
          });
        }
      } else {
        setError(result.error || 'Erro ao processar agendamento');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div 
        className={`relative backdrop-blur-xl rounded-2xl border overflow-hidden text-center ${className}`}
        style={{ 
          background: GLASS.cardBg, 
          borderColor: GLASS.cardBorder, 
          boxShadow: GLASS.cardShadow 
        }}
      >
        {/* Градиентные слои как в SegurancaQualidade */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent rounded-2xl" />
        <div className="absolute inset-0 bg-gradient-to-tl from-black/20 via-transparent to-black/10 rounded-2xl" />
        
        <div className="relative z-10 p-8">
          <div className="text-green-400 mb-4" style={{
            fontFamily: 'Garet, sans-serif', 
            fontSize: 14,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 600
          }}>
            ✅ REDIRECIONANDO PARA PAGAMENTO
          </div>
          <p style={{
            color: '#FEFEFE',
            fontFamily: 'Garet, sans-serif',
            fontSize: 16,
            opacity: 0.9,
            lineHeight: 1.6
          }}>
            Aguarde, você está sendo redirecionado para o MercadoPago para finalizar seu agendamento.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative backdrop-blur-xl rounded-2xl border overflow-hidden ${className}`}
      style={{ 
        background: GLASS.cardBg, 
        borderColor: GLASS.cardBorder, 
        boxShadow: GLASS.cardShadow 
      }}
    >
      {/* Градиентные слои как в SegurancaQualidade */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent rounded-2xl" />
      <div className="absolute inset-0 bg-gradient-to-tl from-black/20 via-transparent to-black/10 rounded-2xl" />
      
      <div className="relative z-10 p-8">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block mb-3" style={{
                color: '#FEFEFE',
                fontFamily: 'Garet, sans-serif',
                fontSize: 14,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                opacity: 0.85
              }}>
                NOME *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onBlur={(e) => validateField('name', e.target.value)}
                className={`glass-input w-full px-4 py-3 rounded-xl border backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-white/40 ${
                  errors.name ? 'border-red-400' : ''
                }`}
                placeholder="Seu nome completo"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  borderColor: errors.name ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.2)',
                  color: '#FEFEFE',
                  fontFamily: 'Garet, sans-serif',
                  fontSize: 16
                }}
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1 font-medium">
                  {errors.name}
                </p>
              )}
            </div>
            
            <div>
              <label className="block mb-3" style={{
                color: '#FEFEFE',
                fontFamily: 'Garet, sans-serif',
                fontSize: 14,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                opacity: 0.85
              }}>
                WHATSAPP / CELULAR *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                onBlur={(e) => validateField('phone', e.target.value)}
                className={`glass-input w-full px-4 py-3 rounded-xl border backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-white/40 ${
                  errors.phone ? 'border-red-400' : ''
                }`}
                placeholder="+55 (48) 99999-9999"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  borderColor: errors.phone ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.2)',
                  color: '#FEFEFE',
                  fontFamily: 'Garet, sans-serif',
                  fontSize: 16
                }}
              />
              {errors.phone && (
                <p className="text-red-400 text-sm mt-1 font-medium">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-3" style={{
                color: '#FEFEFE',
                fontFamily: 'Garet, sans-serif',
                fontSize: 14,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                opacity: 0.85
              }}>
                EMAIL *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={(e) => validateField('email', e.target.value)}
                className={`glass-input w-full px-4 py-3 rounded-xl border backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-white/40 ${
                  errors.email ? 'border-red-400' : ''
                }`}
                placeholder="seu@email.com"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  borderColor: errors.email ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.2)',
                  color: '#FEFEFE',
                  fontFamily: 'Garet, sans-serif',
                  fontSize: 16
                }}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-3" style={{
                color: '#FEFEFE',
                fontFamily: 'Garet, sans-serif',
                fontSize: 14,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                opacity: 0.85
              }}>
                ESCOLHA SUA OPÇÃO *
              </label>
              <div className="space-y-3">
                {services.map((service) => (
                  <div 
                    key={service.id}
                    className={`backdrop-blur-sm rounded-xl p-4 border cursor-pointer transition-all ${
                      formData.service === service.id 
                        ? 'border-white/60' 
                        : 'border-white/20 hover:border-white/40'
                    }`}
                    style={{
                      background: formData.service === service.id 
                        ? 'rgba(255, 255, 255, 0.25)' 
                        : 'rgba(255, 255, 255, 0.1)',
                      minHeight: '60px'
                    }}
                    onClick={() => setFormData({ ...formData, service: service.id })}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="radio"
                        name="service"
                        value={service.id}
                        checked={formData.service === service.id}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="mt-1 text-white focus:ring-white/40"
                        style={{ accentColor: '#FEFEFE' }}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center gap-4">
                          <h4 style={{
                            color: '#FEFEFE',
                            fontFamily: 'Garet, sans-serif',
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            lineHeight: 1.2,
                            flex: '1',
                            paddingRight: '8px'
                          }}>
                            {service.name}
                          </h4>
                          <span style={{
                            color: '#FEFEFE',
                            fontFamily: 'Horizon, sans-serif',
                            fontSize: 14,
                            fontWeight: 500,
                            letterSpacing: '0.03em',
                            flexShrink: 0,
                            whiteSpace: 'nowrap'
                          }}>
                            {service.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-start space-x-3 p-4 rounded-xl border backdrop-blur-sm"
                   style={{
                     background: 'rgba(255, 255, 255, 0.08)',
                     borderColor: 'rgba(255, 255, 255, 0.15)',
                   }}>
                <input
                  type="checkbox"
                  id="consentLGPD"
                  checked={formData.consentLGPD}
                  onChange={(e) => setFormData({ ...formData, consentLGPD: e.target.checked })}
                  className="mt-1 rounded focus:ring-white/40"
                  style={{ accentColor: '#FEFEFE' }}
                />
                <label htmlFor="consentLGPD" className="cursor-pointer" style={{
                  color: '#FEFEFE',
                  fontFamily: 'Garet, sans-serif',
                  fontSize: 13,
                  lineHeight: 1.5,
                  opacity: 0.9
                }}>
                  Ao marcar esta opção, autorizo o tratamento dos meus dados pessoais para fins de agendamento e comunicação. 
                  <br />
                  <a 
                    href="/politica-privacidade" 
                    className="underline hover:no-underline transition-all"
                    style={{ 
                      color: '#FEFEFE',
                      opacity: 0.8 
                    }}
                  >
                    Leia nossa Política de Privacidade
                  </a>
                </label>
              </div>
            </div>

            {error && (
              <div 
                className="backdrop-blur-sm rounded-xl p-3 border"
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  borderColor: 'rgba(239, 68, 68, 0.3)',
                  color: '#FEF2F2',
                  fontFamily: 'Garet, sans-serif',
                  fontSize: 14
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl border backdrop-blur-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, rgba(68,79,85,0.95) 0%, rgba(59,59,58,0.95) 100%)',
                borderColor: '#FEFEFE',
                color: '#FEFEFE',
                fontFamily: 'Garet, sans-serif',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '16px 48px'
              }}
            >
              {isSubmitting ? 'PROCESSANDO...' : 'CONTINUAR PARA PAGAMENTO'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}