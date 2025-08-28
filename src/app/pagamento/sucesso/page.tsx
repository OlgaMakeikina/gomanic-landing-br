'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderInfo, setOrderInfo] = useState<any>(null);
  
  const orderId = searchParams?.get('order');
  const paymentId = searchParams?.get('payment_id');
  const status = searchParams?.get('status');

  useEffect(() => {
    if (orderId) {
      // Здесь можно загрузить информацию о заказе
      setOrderInfo({ orderId, paymentId, status });
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
              PAGAMENTO CONFIRMADO!
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
              Seu agendamento foi confirmado com sucesso. Você receberá um email com todos os detalhes em breve.
            </p>

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
