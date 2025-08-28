"use client"

import { useMemo, useState } from "react"
import { useCountdown, formatTimeForPromo } from '@/hooks/useCountdown'

export default function PromocoesMes2() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null)
  
  const promocoes = useMemo(
    () => [
      {
        titulo: "MANICURE + NIVELAMENTO + ESMALTAÇÃO EM GEL",
        precoNormal: "R$ 160",
        precoVIP: "R$ 80",
        pagamentoAntecipado: "R$ 80",
        inclui: [
          "Ferramentas esterilizadas",
          "Nivelamento perfeito da unha",
          "Esmalte em gel premium com brilho até 4 semanas",
        ],
      },
      {
        titulo: "ALONGAMENTO + MANICURE + ESMALTAÇÃO EM GEL",
        precoNormal: "R$ 200", 
        precoVIP: "R$ 119",
        pagamentoAntecipado: "R$ 119",
        inclui: [
          "Modelagem de comprimento e formato",
          "Reforço da resistência",
          "Esmalte em gel premium",
        ],
      },
      {
        titulo: "COMBO: MANICURE + ESMALTAÇÃO EM GEL + PEDICURE + PLÁSTICA DOS PÉS",
        precoNormal: "R$ 320",
        precoVIP: "R$ 160", 
        pagamentoAntecipado: "R$ 160",
        inclui: [
          "Cuidados completos para mãos e pés",
          "Esmaltação premium de longa duração",
          "SPA e plástica dos pés",
        ],
      },
    ],
    []
  )

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index)
  }

  // === СИНХРОНИЗИРОВАННЫЙ TIMER С VIP СЕКЦИЕЙ ========================
  const { time, mounted } = useCountdown()
  const remaining = formatTimeForPromo(time)

  return (
    <section id="promocoes-2" className="relative py-20" aria-labelledby="promocoes-heading" style={{ 
      background: 'linear-gradient(135deg, #444e55 0%, #3a434a 25%, #2f3940 50%, #3a434a 75%, #444e55 100%)', 
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 -20px 60px rgba(0, 0, 0, 0.4)' 
    }}>
      {/* Текстурный фон */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(1000px 500px at 15% 0%, rgba(254,254,254,0.08) 0%, rgba(254,254,254,0) 60%), radial-gradient(900px 450px at 85% 100%, rgba(254,254,254,0.06) 0%, rgba(254,254,254,0) 60%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <div
            className="uppercase tracking-[0.22em] mb-3"
            style={{ color: '#FEFEFE', fontFamily: "Garet, sans-serif", fontSize: 14, opacity: 0.85 }}
          >
            OFERTAS ESPECIAIS
          </div>

   <h2
  id="promocoes-heading"
  className="uppercase mb-6 text-2xl sm:text-2xl md:text-3xl lg:text-5xl"
  style={{
    color: '#FEFEFE',
    fontFamily: "Horizon, sans-serif",
    letterSpacing: "0.12em",
    fontWeight: 500,
  }}
>
  PROMOÇÕES DO MÊS
</h2>

          {/* Объединенный блок: Таймер + Срочность */}
          <div
            className="mx-auto inline-flex flex-col items-center gap-3 rounded-2xl px-6 py-4 backdrop-blur-md border shadow-lg"
            style={{
              background: "rgba(255, 255, 255, 0.25)",
              borderColor: "rgba(255, 255, 255, 0.40)",
              fontFamily: "Garet, sans-serif",
            }}
          >
            {/* Таймер */}
            <div
              className="flex items-center gap-3"
              style={{
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.1em",
              }}
              aria-live="polite"
            >
              <div className="text-center">
                <span className="uppercase block mb-2" style={{ color: '#FEFEFE', fontSize: '13px' }}>Expira em</span>
                <div className="tabular-nums font-bold text-2xl" style={{ color: '#FEFEFE' }}>
                  {mounted ? remaining : '--:--:--:--'}
                </div>
                <div className="flex justify-center gap-8 mt-2" style={{ color: '#FEFEFE', opacity: 0.8, fontSize: '11px' }}>
                  <span>DIAS</span>
                  <span>HRS</span>
                  <span>MIN</span>
                  <span>SEG</span>
                </div>
              </div>
            </div>
            
            {/* Элемент срочности */}
            <div
              className="flex items-center gap-2"
              style={{
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: '#FEFEFE',
                animation: "pulse 2s infinite",
              }}
            >
              <span>🔥</span>
              <span>Apenas 30 vagas! Não perca!</span>
            </div>
          </div>

          <p
            className="mt-6 mx-auto max-w-2xl"
            style={{ color: '#FEFEFE', opacity: 0.85, fontFamily: "Garet, sans-serif", fontSize: 14 }}
          >
            Preços exclusivos para portadores do Passe VIP
          </p>
        </div>

        {/* Аккордеон с фото */}
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
          {/* Фото слева - 50% */}
          <div className="flex justify-center">
            <img 
              src="/images/promocoes/offer.jpeg" 
              alt="Promoções de manicure" 
              className="w-full rounded-2xl object-cover"
              style={{
                aspectRatio: "1/1",
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.2)"
              }}
            />
          </div>
          
          {/* Аккордеоны справа - 50% */}
          <div 
            className="space-y-4"
            style={{
              minHeight: "100%"
            }}
          >
            {promocoes.map((promo, index) => (
              <div
                key={index}
                className="relative backdrop-blur-xl rounded-2xl border transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                }}
              >
                {/* Градиенты */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent rounded-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-black/20 via-transparent to-black/10 rounded-2xl"></div>
                
                {/* Заголовок аккордеона */}
                <div 
                  className="relative z-10 flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="flex-1 pr-4">
                    <h3
                      className="text-left mb-2"
                      style={{
                        color: '#FEFEFE',
                        fontFamily: "Horizon, sans-serif",
                        fontSize: 14,
                        letterSpacing: "0.03em",
                        fontWeight: 500,
                        lineHeight: 1.2,
                        textTransform: "uppercase",
                      }}
                    >
                      {promo.titulo}
                    </h3>
                    
                    {/* Цены */}
                    <div className="flex items-center gap-3 mb-2">
                      <span 
                        style={{ 
                          color: '#FEFEFE', 
                          opacity: 0.6, 
                          textDecoration: "line-through",
                          fontFamily: "Garet, sans-serif",
                          fontSize: 12
                        }}
                      >
                        {promo.precoNormal}
                      </span>
                      <span
                        className="inline-flex items-center rounded-lg px-3 py-1"
                        style={{
                          background: '#FEFEFE',
                          color: '#444e55',
                          fontWeight: 800,
                          fontFamily: "Horizon, sans-serif",
                          fontSize: 16,
                          letterSpacing: "0.02em",
                          boxShadow: "0 4px 12px rgba(254,254,254,0.25)",
                        }}
                      >
                        {promo.precoVIP}
                      </span>
                    </div>
                    
                    {/* Предоплата */}
                    
                    <div 
                      className="text-sm"
                      style={{ 
                        color: '#FEFEFE', 
                        opacity: 0.8,
                        fontFamily: "Garet, sans-serif",
                        fontSize: 11
                      }}
                    >
                      Pagamento antecipado: {promo.pagamentoAntecipado}
                    </div>
                  
                  </div>
                  
                  {/* Кнопка раскрытия */}
                  <button
                    className="flex items-center justify-center w-7 h-7 rounded-full transition-transform duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      transform: openAccordion === index ? 'rotate(45deg)' : 'rotate(0deg)'
                    }}
                  >
                    <span style={{ color: '#FEFEFE', fontSize: 14, fontWeight: 'bold' }}>+</span>
                  </button>
                </div>

                {/* Контент аккордеона */}
                {openAccordion === index && (
                  <div 
                    className="relative z-10 px-4 pb-4 border-t"
                    style={{ borderTopColor: 'rgba(255, 255, 255, 0.15)' }}
                  >
                    <div className="pt-3">
                      <div
                        className="mb-2 uppercase"
                        style={{ 
                          color: '#FEFEFE', 
                          fontFamily: "Garet, sans-serif", 
                          fontSize: 10, 
                          opacity: 0.8, 
                          letterSpacing: "0.1em" 
                        }}
                      >
                        O QUE ESTÁ INCLUÍDO:
                      </div>
                      <ul className="space-y-1 mb-4">
                        {promo.inclui.map((item, i) => (
                          <li 
                            key={i} 
                            className="flex items-start"
                            style={{ 
                              color: '#FEFEFE', 
                              fontFamily: "Garet, sans-serif", 
                              fontSize: 12,
                              opacity: 0.9
                            }}
                          >
                            <span className="mr-2 mt-0.5 text-green-400">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Кнопка записи внутри аккордеона */}
                      <button
                        onClick={() =>
                          document.getElementById("agendamento")?.scrollIntoView({ behavior: "smooth", block: "start" })
                        }
                        className="w-full px-4 py-2 rounded-lg transition-all duration-300"
                        style={{
                          background: '#FEFEFE',
                          color: '#444e55',
                          border: '1px solid #FEFEFE',
                          fontFamily: "Garet, sans-serif",
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          boxShadow: "0 4px 12px rgba(254,254,254,0.15)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "transparent"
                          e.currentTarget.style.color = '#FEFEFE'
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(254,254,254,0.10)"
                          e.currentTarget.style.border = '1px solid #FEFEFE'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#FEFEFE'
                          e.currentTarget.style.color = '#444e55'
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(254,254,254,0.15)"
                          e.currentTarget.style.border = '1px solid #FEFEFE'
                        }}
                      >
                        QUERO GARANTIR MINHA VAGA AGORA
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Кнопка записи под аккордеонами */}
            <div className="mt-8">
              <button
                onClick={() =>
                  document.getElementById("agendamento")?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="w-full px-6 py-3 mt-14 rounded-xl transition-all duration-300 transform hover:scale-105"
                style={{
                  background: '#FEFEFE',
                  color: '#444e55',
                  border: '1px solid #FEFEFE',
                  fontFamily: "Garet, sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  boxShadow: "0 8px 24px rgba(254,254,254,0.20)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = '#FEFEFE'
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(254,254,254,0.15)"
                  e.currentTarget.style.border = '1px solid #FEFEFE'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FEFEFE'
                  e.currentTarget.style.color = '#444e55'
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(254,254,254,0.20)"
                  e.currentTarget.style.border = '1px solid #FEFEFE'
                }}
              >
                QUERO GARANTIR MINHA VAGA AGORA
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
