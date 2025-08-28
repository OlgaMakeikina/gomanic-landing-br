'use client'

import { useState, useEffect } from 'react'

const heroSlides = [
  {
    id: 1,
    image: '/images/hero/0_3 (10).jpeg',
    title: 'GOMANIC × UNHAS',
    subtitle: 'Manicure premium pela metade do preço',
    content: 'Descubra o mundo VIP da manicure profissional com preços exclusivos para membros.'
  },
  {
    id: 2,
    image: '/images/hero/0_3 (8).jpeg',
    title: 'PREÇOS VIP',
    subtitle: 'Economia de até 50% em todos os serviços',
    services: [
      { name: 'Manicure + nivelamento + esmaltação em gel', oldPrice: 160, newPrice: 80 },
      { name: 'Alongamento + manicure + esmaltação em gel', oldPrice: 200, newPrice: 119 },
      { name: 'Combo: manicure + esmaltação em gel + pedicure + plástica dos pés', oldPrice: 320, newPrice: 160 }
    ]
  },
  {
    id: 3,
    image: '/images/hero/0_0 (6) (1).jpeg',
    title: 'PASSE VIP',
    subtitle: 'Vantagens exclusivas para membros VIP',
    benefits: [
      'Preço fixo mesmo se a promoção acabar',
      'Garantia de vaga sempre disponível',
      'Serviço bônus em cada visita',
      'Atendimento prioritário'
    ]
  }
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 7000)
    return () => clearInterval(slideInterval)
  }, [isPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const handleButtonAction = (action: string, id?: string) => {
    if (action === 'next') {
      nextSlide()
    } else if (action === 'whatsapp') {
      window.open('https://wa.me/5548919700099', '_blank')
    } else if (id) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const currentSlideData = heroSlides[currentSlide]

  return (
    <section 
      id="hero" 
      className="h-screen relative overflow-hidden flex items-center"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      style={{ minHeight: '100dvh' }}
    >
      <div className="absolute inset-0 w-full h-full z-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {slide.image.startsWith('#') ? (
              <div className="w-full h-full" style={{ backgroundColor: slide.image }}></div>
            ) : (
              <img src={slide.image} alt={`Slide ${slide.id}`} className="w-full h-full object-cover" />
            )}
          </div>
        ))}
      </div>

      {currentSlide === 0 || currentSlide === 1 || currentSlide === 2 ? (
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      ) : null}

      <div className="vogue-container relative z-20 w-full">
        <div className="max-w-6xl mx-auto text-center lg:text-left px-4 lg:px-0">
          
          {/* Slide 1 - Мобильная адаптация */}
          {currentSlideData.id === 1 && (
            <div key="slide1" className="animate-fade-in flex items-center justify-center min-h-screen py-20 lg:py-0">
              <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8 lg:mb-12">
                  <h1 style={{
                    fontFamily: 'Horizon, Arial, sans-serif',
                    fontSize: 'clamp(3rem, 8vw, 7rem)',
                    fontWeight: 'normal',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    lineHeight: '0.9',
                    color: '#FEFEFE',
                    textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                    marginBottom: '0'
                  }}>
                    GOMANIC
                  </h1>
                  <div style={{
                    fontFamily: 'Horizon, Arial, sans-serif',
                    fontSize: 'clamp(3rem, 8vw, 7rem)',
                    fontWeight: 'normal',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    lineHeight: '0.9',
                    color: '#FEFEFE',
                    textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                    marginTop: '-0.5rem'
                  }}>
                    UNHAS
                  </div>
                </div>
                
                <div className="mb-6 lg:mb-8">
                  <p style={{
                    fontFamily: 'Garet, sans-serif',
                    fontSize: 'clamp(1.2rem, 3vw, 2.25rem)',
                    fontWeight: 600,
                    color: '#FEFEFE',
                    textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                    lineHeight: '1.2',
                    marginBottom: '0'
                  }}>
                    Manicure premium pela metade do preço
                  </p>
                </div>
                
                <div className="mb-8 lg:mb-12">
                  <p style={{
                    fontFamily: 'Garet, sans-serif',
                    fontSize: 'clamp(1rem, 2vw, 1.375rem)',
                    fontWeight: 400,
                    color: '#FEFEFE',
                    opacity: 0.85,
                    textShadow: '0 1px 5px rgba(0,0,0,0.3)',
                    lineHeight: '1.5',
                    maxWidth: '600px',
                    margin: '0 auto',
                    padding: '0 1rem'
                  }}>
                    {currentSlideData.content}
                  </p>
                </div>
                
                <div className="flex flex-col gap-4 justify-center items-center px-4">
                  <button 
                    onClick={() => handleButtonAction('scroll', 'agendamento')}
                    className="transition-all duration-300 hover:scale-105 touch-manipulation w-full max-w-sm"
                    style={{
                      backgroundColor: '#3B3B3A',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '16px 24px',
                      fontFamily: 'Garet, sans-serif',
                      fontSize: '14px',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      color: '#FEFEFE',
                      cursor: 'pointer',
                      minHeight: '48px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#444e55'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#3B3B3A'
                    }}
                  >
                    QUERO SER VIP
                  </button>
                  
                  <button 
                    onClick={() => handleButtonAction('next')}
                    className="transition-all duration-300 hover:scale-105 touch-manipulation w-full max-w-sm"
                    style={{
                      backgroundColor: 'transparent',
                      border: '2px solid rgba(255, 255, 255, 0.4)',
                      borderRadius: '8px',
                      padding: '14px 24px',
                      fontFamily: 'Garet, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      color: '#FEFEFE',
                      cursor: 'pointer',
                      minHeight: '48px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                      e.currentTarget.style.borderColor = '#FEFEFE'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)'
                    }}
                  >
                    SABER MAIS
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Slide 2 - Компактная мобильная версия */}
          {currentSlideData.id === 2 && (
            <div key="slide2" className="animate-fade-in flex items-center justify-center min-h-screen py-16 lg:py-0">
              <div className="max-w-6xl w-full mx-auto px-2 lg:px-4">
                
                <div className="relative bg-black/30 rounded-xl lg:rounded-2xl border border-white/30 p-4 lg:p-12 shadow-[0_32px_64px_rgba(0,0,0,0.3)] mx-2 lg:mx-0">
                  
                  <div className="relative z-10">
                    <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start lg:items-center">
                      
                      <div className="text-center lg:text-left">
                        <div className="inline-flex items-center mb-3 lg:mb-6 px-3 lg:px-5 py-1 lg:py-3 rounded-full bg-white/25 backdrop-blur-md border border-white/40 shadow-lg">
                          <span style={{
                            fontFamily: 'Garet, sans-serif',
                            fontSize: '10px',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: '#FEFEFE'
                          }}>
                            EXCLUSIVO VIP
                          </span>
                        </div>
                        
                        <h1 style={{
                          fontFamily: 'Horizon, Arial, sans-serif',
                          fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
                          fontWeight: 'normal',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          lineHeight: '0.9',
                          color: '#FEFEFE',
                          textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                          marginBottom: '8px'
                        }}>
                          PREÇOS VIP
                        </h1>
                        
                        <p style={{
                          fontFamily: 'Garet, sans-serif',
                          fontSize: 'clamp(12px, 2.5vw, 18px)',
                          fontWeight: 500,
                          color: '#FEFEFE',
                          textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                          marginBottom: '16px',
                          lineHeight: '1.4'
                        }}>
                          Economia de até 50% em todos os serviços
                        </p>
                        
                        <div className="flex justify-center lg:justify-start">
                          <button 
                            onClick={() => handleButtonAction('scroll', 'agendamento')}
                            className="transition-all duration-300 hover:scale-105 touch-manipulation"
                            style={{
                              backgroundColor: '#3B3B3A',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '14px 32px',
                              fontFamily: 'Garet, sans-serif',
                              fontSize: '14px',
                              fontWeight: 600,
                              letterSpacing: '0.05em',
                              textTransform: 'uppercase',
                              color: '#FEFEFE',
                              cursor: 'pointer',
                              minHeight: '48px',
                              minWidth: '140px',
                              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#444e55'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#3B3B3A'
                            }}
                          >
                            AGENDAR
                          </button>
                        </div>
                      </div>

                      <div className="text-left">
                        <div className="space-y-4 lg:space-y-8">
                          {currentSlideData.services?.map((service, index) => (
                            <div key={index}>
                              <div style={{
                                fontFamily: 'Horizon, Arial, sans-serif',
                                fontSize: 'clamp(11px, 2vw, 17px)',
                                fontWeight: 'normal',
                                color: '#FEFEFE',
                                opacity: 0.9,
                                marginBottom: '4px',
                                lineHeight: '1.2',
                                textTransform: 'uppercase',
                                letterSpacing: '0.02em'
                              }}>
                                {service.name}
                              </div>
                              <div className="flex items-center gap-2 lg:gap-4">
                                <span style={{
                                  fontFamily: 'Garet, sans-serif',
                                  fontSize: 'clamp(12px, 2vw, 16px)',
                                  fontWeight: 400,
                                  color: '#FEFEFE',
                                  opacity: 0.5,
                                  textDecoration: 'line-through'
                                }}>
                                  R$ {service.oldPrice}
                                </span>
                                <span style={{
                                  fontFamily: 'Horizon, Arial, sans-serif',
                                  fontSize: 'clamp(13px, 2.5vw, 17px)',
                                  fontWeight: 'normal',
                                  color: '#3B3B3A',
                                  backgroundColor: '#FEFEFE',
                                  padding: '3px 6px',
                                  borderRadius: '4px',
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                                }}>
                                  R$ {service.newPrice}
                                </span>
                              </div>
                              {index < currentSlideData.services!.length - 1 && (
                                <div className="w-full h-px bg-white/15 mt-3 lg:mt-6"></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Slide 3 - Мобильная адаптация */}
          {currentSlideData.id === 3 && (
            <div key="slide3" className="animate-fade-in flex items-center justify-center min-h-screen py-20 lg:py-0">
              <div className="max-w-6xl w-full mx-auto px-4">
                
                <div className="relative bg-black/30 rounded-xl lg:rounded-2xl border border-white/30 p-6 lg:p-12 shadow-[0_32px_64px_rgba(0,0,0,0.3)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/4 via-white/1 to-transparent rounded-xl lg:rounded-2xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-tl from-black/5 via-transparent to-black/2 rounded-xl lg:rounded-2xl"></div>
                  
                  <div className="relative z-10">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
                      
                      <div className="text-center lg:text-left">
                        <div className="inline-flex items-center mb-4 lg:mb-6 px-4 lg:px-5 py-2 lg:py-3 rounded-full bg-white/25 backdrop-blur-md border border-white/40 shadow-lg">
                          <span style={{
                            fontFamily: 'Garet, sans-serif',
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: '#FEFEFE'
                          }}>
                            EXCLUSIVO VIP
                          </span>
                        </div>
                        
                        <h1 style={{
                          fontFamily: 'Horizon, Arial, sans-serif',
                          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                          fontWeight: 'normal',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          lineHeight: '0.9',
                          color: '#FEFEFE',
                          textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                          marginBottom: '12px'
                        }}>
                          PASSE VIP
                        </h1>
                        
                        <p style={{
                          fontFamily: 'Garet, sans-serif',
                          fontSize: 'clamp(14px, 3vw, 18px)',
                          fontWeight: 500,
                          color: '#FEFEFE',
                          textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                          marginBottom: '24px',
                          lineHeight: '1.4'
                        }}>
                          Vantagens exclusivas para membros VIP
                        </p>
                        
                        <div className="flex flex-col gap-3 lg:gap-4">
                          <button 
                            onClick={() => handleButtonAction('scroll', 'agendamento')}
                            className="transition-all duration-300 hover:scale-105 touch-manipulation"
                            style={{
                              backgroundColor: '#3B3B3A',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '16px 24px',
                              fontFamily: 'Garet, sans-serif',
                              fontSize: '14px',
                              fontWeight: 600,
                              letterSpacing: '0.05em',
                              textTransform: 'uppercase',
                              color: '#FEFEFE',
                              cursor: 'pointer',
                              width: '100%',
                              minHeight: '48px',
                              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#444e55'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#3B3B3A'
                            }}
                          >
                            QUERO SER VIP
                          </button>
                          
                          <button 
                            onClick={() => handleButtonAction('whatsapp')}
                            className="transition-all duration-300 hover:scale-105 touch-manipulation"
                            style={{
                              backgroundColor: 'transparent',
                              border: '2px solid rgba(255, 255, 255, 0.4)',
                              borderRadius: '8px',
                              padding: '14px 24px',
                              fontFamily: 'Garet, sans-serif',
                              fontSize: '14px',
                              fontWeight: 400,
                              letterSpacing: '0.05em',
                              textTransform: 'uppercase',
                              color: '#FEFEFE',
                              cursor: 'pointer',
                              width: '100%',
                              minHeight: '48px'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                              e.currentTarget.style.borderColor = '#FEFEFE'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent'
                              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)'
                            }}
                          >
                            CONTATO DIRETO
                          </button>
                        </div>
                      </div>

                      <div className="text-left">
                        <div className="space-y-6 lg:space-y-8">
                          {currentSlideData.benefits?.map((benefit, index) => (
                            <div key={index}>
                              <div className="flex items-start gap-3 lg:gap-4">
                                <span style={{
                                  color: '#FEFEFE', 
                                  fontSize: '18px', 
                                  marginTop: '1px',
                                  textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                                  flexShrink: 0
                                }}>✓</span>
                                <span style={{
                                  fontFamily: 'Horizon, Arial, sans-serif',
                                  fontSize: 'clamp(13px, 2.5vw, 17px)',
                                  fontWeight: 'normal',
                                  color: '#FEFEFE',
                                  opacity: 0.9,
                                  lineHeight: '1.3',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.02em'
                                }}>
                                  {benefit}
                                </span>
                              </div>
                              {index < currentSlideData.benefits!.length - 1 && (
                                <div className="w-full h-px bg-white/15 mt-4 lg:mt-6"></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

      {/* Slide indicator - мобильная адаптация */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="text-center">
          <span className="text-sm" style={{
            color: '#FEFEFE', 
            opacity: 0.8,
            fontFamily: 'Garet, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(14px, 2vw, 16px)'
          }}>
            {currentSlide + 1} / {heroSlides.length}
          </span>
        </div>
      </div>

      {/* Navigation arrows - мобильная адаптация */}
      <button
        onClick={() => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)}
        className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 touch-manipulation"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>

      <button
        onClick={() => goToSlide((currentSlide + 1) % heroSlides.length)}
        className="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 touch-manipulation"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9,6 15,12 9,18"></polyline>
        </svg>
      </button>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  )
}
