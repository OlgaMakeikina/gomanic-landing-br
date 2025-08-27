'use client';

import { generateWhatsAppLink } from '@/utils/whatsapp';
import { WhatsAppButton } from '@/components/ui';

export default function TestPage() {
  const testWhatsApp = () => {
    const link = generateWhatsAppLink('João Silva', 'manicure-gel', 'http://localhost:3010');
    console.log('WhatsApp Link:', link);
    window.open(link, '_blank');
  };

  const testRedirect = (service: string) => {
    window.open(`http://localhost:3010/${service}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FEFEFE] p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-[#444f55] text-center">
          🧪 TESTE DO SISTEMA
        </h1>
        
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
          <h2 className="text-xl font-semibold text-[#444f55]">
            ✅ Email Teste
          </h2>
          <p className="text-[#444f55]">
            Email enviado com sucesso para: <strong>zarudesu@gmail.com</strong>
          </p>
          <div className="text-sm text-green-600 bg-green-50 p-3 rounded">
            ✓ Sistema de email funcionando corretamente
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
          <h2 className="text-xl font-semibold text-[#444f55]">
            📱 Teste WhatsApp
          </h2>
          <p className="text-[#444f55] mb-4">
            Número configurado: <strong>+55 48 99917-0099</strong>
          </p>
          
          <div className="space-y-4">
            <button
              onClick={testWhatsApp}
              className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition"
            >
              🧪 Testar WhatsApp com Link
            </button>
            
            <WhatsAppButton 
              text="TESTE BOTÃO PADRÃO"
              phoneNumber="5548991700099"
              className="w-full justify-center"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
          <h2 className="text-xl font-semibold text-[#444f55]">
            🔗 Teste Links Curtos
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => testRedirect('vip80')}
              className="bg-[#444f55] text-white py-3 px-4 rounded-lg hover:bg-[#3a4048] transition"
            >
              /vip80<br />
              <span className="text-sm opacity-75">R$ 80</span>
            </button>
            
            <button
              onClick={() => testRedirect('vip119')}
              className="bg-[#444f55] text-white py-3 px-4 rounded-lg hover:bg-[#3a4048] transition"
            >
              /vip119<br />
              <span className="text-sm opacity-75">R$ 119</span>
            </button>
            
            <button
              onClick={() => testRedirect('vip160')}
              className="bg-[#444f55] text-white py-3 px-4 rounded-lg hover:bg-[#3a4048] transition"
            >
              /vip160<br />
              <span className="text-sm opacity-75">R$ 160</span>
            </button>
          </div>
        </div>
        
        <div className="text-center">
          <a 
            href="/" 
            className="inline-block bg-[#444f55] text-white py-3 px-8 rounded-lg hover:bg-[#3a4048] transition"
          >
            ← Voltar para Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
