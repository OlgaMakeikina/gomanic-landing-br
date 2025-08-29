'use client'
import React, { useState } from 'react'

export default function SegurancaQualidade(): JSX.Element {
  const [isPlaying] = useState(false)

  const COLORS = { dark: '#444f55', gray: '#3B3B3A', white: '#FEFEFE' }
  const GLASS = {
    cardBg: 'rgba(255, 255, 255, 0.12)',
    cardBorder: 'rgba(255, 255, 255, 0.25)',
    cardShadow: '0 32px 64px rgba(0,0,0,0.5)',
  }

  const certificacoes = [
    {
      imagem: '/images/higiene/0_3 (13).jpeg',
      titulo: 'Higienização Profissional',

      detalhes: 'Protocolo hospitalar de limpeza',
    },
    {
      imagem: '/images/higiene/0_3 (21).jpeg',
      titulo: 'Materiais Certificados',

      detalhes: 'Importados e testados dermatologicamente',
    },
    {
      imagem: '/images/higiene/0_0 (20).jpeg',
      titulo: 'Segurança Total',
      detalhes: 'Ambiente controlado e monitorado',
    },
  ] as const

  return (
    <section 
      id="seguranca" 
      className="relative py-20" 
      style={{ 
        backgroundColor: COLORS.dark,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 -20px 60px rgba(0, 0, 0, 0.4)'
      }}
      aria-labelledby="seguranca-heading"
    >
      {/* Текстурный фон */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(1000px 500px at 15% 0%, rgba(254,254,254,0.08) 0%, rgba(254,254,254,0) 60%), radial-gradient(900px 450px at 85% 100%, rgba(254,254,254,0.06) 0%, rgba(254,254,254,0) 60%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Заголовок */}
        <header className="text-center mb-16">
          <p
            className="uppercase tracking-[0.22em] mb-3"
            style={{ color: COLORS.white, fontFamily: 'Garet, sans-serif', fontSize: 14, opacity: 0.85 }}
          >
            HIGIENE E QUALIDADE
          </p>

          <h2
            id="seguranca-heading"
            className="uppercase mb-6 text-2xl sm:text-2xl md:text-3xl lg:text-5xl"
            style={{
              color: COLORS.white,
              fontFamily: 'Horizon, sans-serif',
              letterSpacing: '0.12em',
              fontWeight: 500,
            }}
          >
            POR QUE MILHARES DE CLIENTES NOS ESCOLHEM?
          </h2>

          <p
            className="mx-auto max-w-3xl"
            style={{ color: COLORS.white, opacity: 0.9, fontFamily: 'Garet, sans-serif', fontSize: 16 }}
          >
            Sua saúde é nossa prioridade
          </p>
        </header>

        {/* Верхние карточки (ограничение ширины на md) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:justify-items-center gap-6 md:gap-8 mb-16 max-w-5xl mx-auto">
          {certificacoes.map((cert, index) => (
            <article
              key={index}
              className="relative w-full md:max-w-[420px] backdrop-blur-xl rounded-2xl border overflow-hidden"
              style={{ background: GLASS.cardBg, borderColor: GLASS.cardBorder, boxShadow: GLASS.cardShadow }}
              aria-labelledby={`cert-title-${index}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent rounded-2xl" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-tl from-black/20 via-transparent to-black/10 rounded-2xl" aria-hidden="true" />

              <div className="relative z-10">
                <img
                  src={cert.imagem}
                  alt={`${cert.titulo} - ${cert.detalhes}`}
                  className="w-full h-64 md:h-60 lg:h-64 object-cover"
                  style={{ filter: 'brightness(1.1) contrast(1.05)' }}
                />

                <div className="p-8 text-center">
                  <h3
                    id={`cert-title-${index}`}
                    className="mb-4"
                    style={{
                      color: COLORS.white,
                      fontFamily: 'Horizon, sans-serif',
                      fontSize: 16,
                      letterSpacing: '0.03em',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                    }}
                  >
                    {cert.titulo}
                  </h3>

                  <p style={{ color: COLORS.white, fontFamily: 'Garet, sans-serif', fontSize: 13, opacity: 0.75 }}>
                    {cert.detalhes}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Обучение и сертификация */}
        <section className="mt-20" aria-labelledby="formacao-heading">
          <header className="text-center mb-16">
            <h3
              id="formacao-heading"
              style={{
                color: COLORS.white,
                fontFamily: 'Horizon, sans-serif',
                fontSize: 20, // Уменьшен с 24 для мобильных
                letterSpacing: '0.1em',
                fontWeight: 500,
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
              className="md:text-2xl" // На средних экранах и больше - размер 24px
            >
              Formadas com padrões internacionais
            </h3>
            <p
              style={{
                color: COLORS.white,
                fontFamily: 'Garet, sans-serif',
                fontSize: 16,
                opacity: 0.9,
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              Nossos especialistas são treinados de acordo com o programa profissional estadual da Federação Russa
            </p>
          </header>

          {/* Первая строка - 3 фото */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:justify-items-center gap-6 md:gap-8 mb-8">
            <div
              className="relative w-full md:max-w-[420px] backdrop-blur-xl rounded-2xl border overflow-hidden group"
              style={{ background: GLASS.cardBg, borderColor: GLASS.cardBorder, boxShadow: GLASS.cardShadow, aspectRatio: '4/3' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
              <img
                src="/images/masters/0_0 (15).jpeg"
                alt="Instrutor Internacional 1"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ filter: 'brightness(1.1) contrast(1.05)' }}
              />
              <div className="absolute bottom-4 left-4 right-4">
                <div
                  className="backdrop-blur-sm rounded-lg p-2 border"
                  style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  <p style={{ color: '#3B3B3A', fontFamily: 'Garet, sans-serif', fontSize: 11, fontWeight: 600, textAlign: 'center' }}>
                    Formação
                  </p>
                </div>
              </div>
            </div>

            <div
              className="relative w-full md:max-w-[420px] backdrop-blur-xl rounded-2xl border overflow-hidden group"
              style={{ background: GLASS.cardBg, borderColor: GLASS.cardBorder, boxShadow: GLASS.cardShadow, aspectRatio: '4/3' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
              <img
                src="/images/masters/0_0 (22).jpeg"
                alt="Instrutor Internacional 2"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ filter: 'brightness(1.1) contrast(1.05)' }}
              />
              <div className="absolute bottom-4 left-4 right-4">
                <div
                  className="backdrop-blur-sm rounded-lg p-2 border"
                  style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  <p style={{ color: '#3B3B3A', fontFamily: 'Garet, sans-serif', fontSize: 11, fontWeight: 600, textAlign: 'center' }}>
                    Treinamento
                  </p>
                </div>
              </div>
            </div>

            <div
              className="relative w-full md:max-w-[420px] backdrop-blur-xl rounded-2xl border overflow-hidden group"
              style={{ background: GLASS.cardBg, borderColor: GLASS.cardBorder, boxShadow: GLASS.cardShadow, aspectRatio: '4/3' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
              <img
                src="/images/masters/0_3 (20).jpeg"
                alt="Certificados"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ filter: 'brightness(1.1) contrast(1.05)' }}
              />
              <div className="absolute bottom-4 left-4 right-4">
                <div
                  className="backdrop-blur-sm rounded-lg p-2 border"
                  style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  <p style={{ color: '#3B3B3A', fontFamily: 'Garet, sans-serif', fontSize: 11, fontWeight: 600, textAlign: 'center' }}>
                    Habilitação
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Вторая строка - 3 видео */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:justify-items-center gap-6 md:gap-8">
            <div
              className="relative w-full md:max-w-[420px] backdrop-blur-xl rounded-2xl border overflow-hidden group"
              style={{ background: GLASS.cardBg, borderColor: GLASS.cardBorder, boxShadow: GLASS.cardShadow, aspectRatio: '4/3' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
              <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
                <source src="/images/masters/hd.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-4 left-4 right-4">
                <div
                  className="backdrop-blur-sm rounded-lg p-2 border"
                  style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  <p style={{ color: '#3B3B3A', fontFamily: 'Garet, sans-serif', fontSize: 11, fontWeight: 600, textAlign: 'center' }}>
                    Atendimento
                  </p>
                </div>
              </div>
            </div>

            <div
              className="relative w-full md:max-w-[420px] backdrop-blur-xl rounded-2xl border overflow-hidden group"
              style={{ background: GLASS.cardBg, borderColor: GLASS.cardBorder, boxShadow: GLASS.cardShadow, aspectRatio: '4/3' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
              <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
                <source src="/images/masters/copy_61419D38-6BD1-432E-AFDE-7587071CE25C.mov" type="video/mp4" />
              </video>
              <div className="absolute bottom-4 left-4 right-4">
                <div
                  className="backdrop-blur-sm rounded-lg p-2 border"
                  style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  <p style={{ color: '#3B3B3A', fontFamily: 'Garet, sans-serif', fontSize: 11, fontWeight: 600, textAlign: 'center' }}>
                    Materiais
                  </p>
                </div>
              </div>
            </div>

            <div
              className="relative w-full md:max-w-[420px] backdrop-blur-xl rounded-2xl border overflow-hidden group"
              style={{ background: GLASS.cardBg, borderColor: GLASS.cardBorder, boxShadow: GLASS.cardShadow, aspectRatio: '4/3' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
              <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
                <source src="/images/masters/copy_E50046E2-F8A7-481A-AC2B-02659A859387.mov" type="video/mp4" />
              </video>
              <div className="absolute bottom-4 left-4 right-4">
                <div
                  className="backdrop-blur-sm rounded-lg p-2 border"
                  style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  <p style={{ color: '#3B3B3A', fontFamily: 'Garet, sans-serif', fontSize: 11, fontWeight: 600, textAlign: 'center' }}>
                    Processo
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Сертификат под фото/видео */}
          <div className="flex flex-col lg:flex-row lg:justify-center lg:items-start gap-6 mt-16">
            <div
              className="backdrop-blur-xl rounded-2xl p-6 max-w-md mx-auto"
              style={{
                background: 'linear-gradient(135deg, rgba(68,79,85,0.95) 0%, rgba(59,59,58,0.95) 100%)',
                border: '1px solid #FEFEFE',
                boxShadow: '0 32px 64px rgba(68,79,85,0.3)',
              }}
            >
              <div className="text-center">
                <h4
                  style={{
                    color: '#FEFEFE',
                    fontFamily: 'Horizon, sans-serif',
                    fontSize: 16,
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '12px',
                    lineHeight: 1.3,
                  }}
                >
                  Certificado de Segurança
                </h4>

                <div
                  className="px-4 py-3 rounded-xl"
                  style={{
                    background: '#FEFEFE',
                    color: '#3B3B3A',
                    fontFamily: 'Garet, sans-serif',
                    fontSize: 12,
                    fontWeight: 600,
                    textAlign: 'center',
                    lineHeight: 1.4,
                  }}
                >
                  Nossos materiais são completamente seguros e atendem aos padrões internacionais de qualidade
                </div>
              </div>
            </div>

            <div
              className="relative rounded-2xl border overflow-hidden max-w-xs max-h-96 mx-auto"
              style={{
                background: GLASS.cardBg,
                borderColor: GLASS.cardBorder,
                boxShadow: GLASS.cardShadow,
                aspectRatio: '2/3',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
              <img
                src="/images/masters/certificate.png"
                alt="Passaporte de segurança dos esmaltes"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(1.08) contrast(1.05)' }}
              />
            </div>
          </div>
        </section>
      </div>  
    </section>
  )
}
