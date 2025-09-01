'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { trackPurchase, trackCompleteRegistration } from '@/utils/facebook-pixel';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderInfo, setOrderInfo] = useState<any>(null);
  const [serviceInfo, setServiceInfo] = useState<any>(null);
  
  const orderId = searchParams?.get('order');
  const paymentId = searchParams?.get('payment_id');
  const status = searchParams?.get('status');

  useEffect(() => {
    if (orderId) {
      // Загружаем данные заказа
      fetch(`/api/booking/${orderId}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data) {
            setOrderInfo(data);
            // Получаем информацию о сервисе
            const services: Record<string, {name: string, price: string}> = {
              'manicure-gel': { name: 'Manicure + Gel', price: 'R$ 80' },
              'alongamento-gel': { name: 'Alongamento + Gel', price: 'R$ 119' },
              'combo-completo': { name: 'Combo Completo', price: 'R$ 160' }
            };
            setServiceInfo(services[data.service as keyof typeof services] || null);
            
            // Meta Pixel: Track successful purchase
            const service = services[data.service as keyof typeof services];
            if (service) {
              const servicePrice = parseInt(service.price.replace(/\D/g, ''));
              trackPurchase(orderId, servicePrice, 'BRL');
              trackCompleteRegistration('booking');
            }
          }
        })
        .catch(err => console.warn('Erro ao carregar dados:', err));
    }
  }, [orderId, paymentId, status]);

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#FEFEFE] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Glass effect card */}
        <div 
          className="relative backdrop-blur-xl rounded-2xl border overflow-hidden text-center"
          style={{ 
            background: 'rgba(255, 255, 255, 0.12)', 
            borderColor: 'rgba(255, 255, 255, 0.25)', 
            boxShadow: '0 32px 64px rgba(0,0,0,0.1)' 
          }}
        >
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent rounded-2xl" />
          <div className="absolute inset-0 bg-gradient-to-tl from-black/10 via-transparent to-black/5 rounded-2xl" />
          
          <div className="relative z-10 p-8">
            {/* Success icon */}
            <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 
              className="mb-4"
              style={{
                color: '#444f55',
                fontFamily: 'Horizon, sans-serif',
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              🎉 PAGAMENTO CONFIRMADO!
            </h1>
            
            <p 
              className="mb-6"
              style={{
                color: '#444f55',
                fontFamily: 'Garet, sans-serif',
                fontSize: 16,
                opacity: 0.8,
                lineHeight: 1.6
              }}
            >
              Parabéns! Seu pagamento foi aprovado com sucesso.<br/>
              Você receberá todos os detalhes por email.
            </p>

            <div 
              className="bg-green-50/80 rounded-xl p-4 mb-6"
              style={{ 
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(34, 197, 94, 0.2)'
              }}
            >
              <h3 
                className="mb-3"
                style={{
                  color: '#16a34a',
                  fontFamily: 'Garet, sans-serif',
                  fontSize: 16,
                  fontWeight: 600
                }}
              >
                ✨ Próximo Passo: Agendar sua sessão VIP
              </h3>
              
              <p 
                className="mb-4"
                style={{
                  color: '#444f55',
                  fontFamily: 'Garet, sans-serif',
                  fontSize: 14,
                  lineHeight: 1.5
                }}
              >
                Entre em contato conosco pelo WhatsApp para agendar seu horário preferido:
              </p>

              <a
                href={`https://wa.me/5548991970099?text=${encodeURIComponent(`Olá! Acabei de realizar o pagamento e gostaria de agendar minha sessão de manicure VIP.\n\nDados do pedido:\n• Pedido: #${orderId}\n${paymentId ? `• Pagamento: #${paymentId}\n` : ''}${serviceInfo ? `• Serviço: ${serviceInfo.name}\n• Valor: ${serviceInfo.price}\n` : ''}• Status: Confirmado\n\nQuando posso agendar meu horário?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl backdrop-blur-sm border transition-all hover:scale-105 flex items-center justify-center space-x-2"
                style={{
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: 'white',
                  fontFamily: 'Garet, sans-serif',
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                  display: 'inline-flex'
                }}
              >
                <span>📱</span>
                <span>AGENDAR NO WHATSAPP</span>
              </a>
            </div>

            {orderInfo && (
              <div 
                className="bg-white/10 rounded-xl p-4 mb-6 text-left"
                style={{ backdropFilter: 'blur(10px)' }}
              >
                <h3 
                  className="mb-2"
                  style={{
                    color: '#444f55',
                    fontFamily: 'Garet, sans-serif',
                    fontSize: 14,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}
                >
                  Detalhes do Pedido
                </h3>
                <div style={{ color: '#444f55', fontSize: 14, opacity: 0.9 }}>
                  <p><strong>Pedido:</strong> #{orderId}</p>
                  {paymentId && <p><strong>Pagamento:</strong> #{paymentId}</p>}
                  <p><strong>Status:</strong> Confirmado</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={handleBackToHome}
                className="w-full py-3 px-6 rounded-xl backdrop-blur-sm border transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(68,79,85,0.9) 0%, rgba(59,59,58,0.9) 100%)',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: '#FEFEFE',
                  fontFamily: 'Garet, sans-serif',
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}
              >
                VOLTAR AO INÍCIO
              </button>

              <p style={{
                color: '#444f55',
                fontFamily: 'Garet, sans-serif',
                fontSize: 12,
                opacity: 0.6,
                textAlign: 'center'
              }}>
                Em caso de dúvidas, entre em contato conosco
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
