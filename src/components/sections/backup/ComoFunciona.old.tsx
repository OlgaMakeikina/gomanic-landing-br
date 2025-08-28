'use client'

export default function ComoFunciona() {
  const passos = [
    {
      numero: "1",
      titulo: "Escolha o serviço",
      descricao: "Selecione seu pacote VIP preferido",
      detalhes: "Navegue pelos nossos serviços premium e escolha o que mais combina com você",
      seguranca: "",
      imagem: "/images/process/0_3 (16).jpeg"
    },
    {
      numero: "2", 
      titulo: "Pague a entrada",
      descricao: "PIX ou cartão - segurança total",
      detalhes: "Pagamento criptografado com as maiores empresas do Brasil",
      seguranca: "Pagamento da entrada é 100% seguro. Se não puder comparecer, reagendamos ou devolvemos o valor",
      imagem: "/images/process/0_0 (8) (1).jpeg"
    },
    {
      numero: "3",
      titulo: "Confirmação no WhatsApp",
      descricao: "Receba todos os detalhes",
      detalhes: "Localização, horário e instruções especiais direto no seu WhatsApp",
      seguranca: "Confirmação instantânea",
      imagem: "/images/process/0_1 (11).jpeg"
    },
    {
      numero: "4",
      titulo: "Compareça e finalize",
      descricao: "Relaxe e complete o pagamento",
      detalhes: "Aproveite seu tratamento VIP e pague o restante no local com desconto",
      seguranca: "Garantia de satisfação 100%",
      imagem: "/images/process/0_0 (7).jpeg"
    }
  ]

  return (
    <section id="como-funciona" className="py-20" style={{backgroundColor: '#444e55'}}>
      <div className="vogue-container">
        <div className="text-center mb-20">
          <div className="vogue-caption mb-4" style={{color: '#FEFEFE'}}>PROCESSO</div>
          <h2 className="vogue-subhead mb-8" style={{color: '#FEFEFE'}}>COMO FUNCIONA</h2>
          <div className="w-20 h-px mx-auto mb-8" style={{backgroundColor: '#FEFEFE', opacity: 0.3}}></div>
          <p className="vogue-body max-w-3xl mx-auto text-lg" style={{color: '#FEFEFE', opacity: 0.9}}>
            4 passos simples para garantir sua manicure premium com total segurança
          </p>
        </div>
        
        {/* Десктопная версия */}
        <div className="max-w-4xl mx-auto hidden lg:block">
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2">
              <div className="w-full h-full backdrop-blur-xl rounded-full border border-white border-opacity-30"
                   style={{
                     background: 'rgba(254, 254, 254, 0.15)',
                     boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                   }} />
            </div>
            
            {passos.map((passo, index) => (
              <div key={index} className="relative mb-16 last:mb-0">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-8">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full text-2xl relative backdrop-blur-xl border border-white border-opacity-40"
                       style={{
                         background: 'rgba(254, 254, 254, 0.25)',
                         color: '#444e55',
                         boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                       }}>
                    <span className="relative z-10 font-bold text-2xl">{passo.numero}</span>
                  </div>
                </div>
                
                <div className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                    <div className="backdrop-blur-xl rounded-2xl p-8 border border-white border-opacity-20">
                      <div className="mb-6 rounded-xl overflow-hidden"
                           style={{boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'}}>
                        <img src={passo.imagem} alt={passo.titulo} className="w-full h-48 object-cover" />
                      </div>
                      <h3 className="vogue-caption mb-4" style={{color: '#FEFEFE'}}>{passo.titulo}</h3>
                      <p className="vogue-body text-lg mb-4" style={{color: '#FEFEFE', fontWeight: 600}}>{passo.descricao}</p>
                      <p className="vogue-body text-base mb-4" style={{color: '#FEFEFE', opacity: 0.9}}>{passo.detalhes}</p>
                      {passo.seguranca && (
                        <div className="mt-6 p-4 rounded-lg backdrop-blur-sm border border-white border-opacity-20" style={{background: 'rgba(254, 254, 254, 0.12)'}}>
                          <p className="text-sm text-center" style={{color: '#FEFEFE'}}>{passo.seguranca}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Мобильная + планшетная версия */}
        <div className="block lg:hidden max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1">
              <div className="w-full h-full backdrop-blur-xl rounded-full border border-white border-opacity-30"
                   style={{
                     background: 'rgba(254, 254, 254, 0.15)',
                     boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                   }} />
            </div>
            
            {passos.map((passo, index) => (
              <div key={index} className="relative mb-12 last:mb-0 pl-20">
                <div className="absolute left-0 top-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full text-xl relative backdrop-blur-xl border border-white border-opacity-40"
                       style={{
                         background: 'rgba(254, 254, 254, 0.25)',
                         color: '#444e55',
                         boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                       }}>
                    <span className="relative z-10 font-bold text-xl">{passo.numero}</span>
                  </div>
                </div>
                
                <div className="backdrop-blur-xl rounded-2xl p-6 border border-white border-opacity-20 relative"
                     style={{
                       background: 'rgba(254, 254, 254, 0.08)',
                       boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                     }}>
                  <div className="relative z-10">
                    {/* 📲 Для md — 2 колонки */}
                    <div className="md:flex md:items-start md:gap-6">
                      <div className="mb-4 md:mb-0 rounded-xl overflow-hidden md:w-40 md:h-40 md:flex-shrink-0"
                           style={{boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'}}>
                        <img src={passo.imagem} alt={passo.titulo} className="w-full h-full object-cover" />
                      </div>
                      <div className="md:flex-1">
                        <h3 className="vogue-caption mb-3" style={{color: '#FEFEFE'}}>{passo.titulo}</h3>
                        <p className="vogue-body text-base mb-3" style={{color: '#FEFEFE', fontWeight: 600}}>{passo.descricao}</p>
                        <p className="vogue-body text-sm mb-3" style={{color: '#FEFEFE', opacity: 0.9}}>{passo.detalhes}</p>
                        {passo.seguranca && (
                          <div className="mt-4 p-3 rounded-lg backdrop-blur-sm border border-white border-opacity-20" style={{background: 'rgba(254, 254, 254, 0.12)'}}>
                            <p className="text-xs text-center" style={{color: '#FEFEFE'}}>{passo.seguranca}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
