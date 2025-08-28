import { useState } from 'react'

export default function PortfolioSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // === GLASSMORPHISM НА БЕЛОМ ФОНЕ =====
  const COLORS = { dark: "#3B3B3A", gray: "#444e55", white: "#FEFEFE" }
  const GLASS = {
    // Темный glassmorphism на белом фоне
    cardBg: `rgba(59, 59, 58, 0.08)`,
    cardBorder: "rgba(59, 59, 58, 0.15)",
    cardShadow: "0 20px 40px rgba(59, 59, 58, 0.1)",
    // Итоговая карточка
    ctaBg: `rgba(68, 79, 85, 0.95)`,
    ctaBorder: "rgba(68, 79, 85, 1)",
    ctaShadow: "0 32px 64px rgba(68, 79, 85, 0.3)",
  }

  const galleryImages = [
    "0_0 (5).jpeg",      // позиция 0
    "0_3 (25).jpeg",     // позиция 1 - ЗАМЕНЕНО!
    "0_0 (9).jpeg",      // позиция 2
    "0_1 (8).jpeg",      // позиция 3
    "0_1 (9).jpeg",      // позиция 4
    "0_2 (3).jpeg",      // позиция 5
    "0_3 (3).jpeg",      // позиция 6
    "0_3 (6).jpeg",      // позиция 7
    "0_3 (9).jpeg"       // позиция 8
  ]

  console.log("Gallery images:", galleryImages)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const getVisibleImages = () => {
    const images = []
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + galleryImages.length) % galleryImages.length
      images.push({ filename: galleryImages[index], offset: i })
    }
    return images
  }

  return (
    <section id="portfolio" className="relative py-20" style={{ backgroundColor: COLORS.white }}>
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <div
            className="uppercase tracking-[0.22em] mb-3"
            style={{ color: '#444e55', fontFamily: "Garet, sans-serif", fontSize: 14, opacity: 0.85 }}
          >
            RESULTADOS
          </div>

          <h2
            className="uppercase mb-6"
            style={{
              color: '#444e55',
              fontFamily: "Horizon, sans-serif",
              letterSpacing: "0.12em",
              fontWeight: 500,
              fontSize: 28,
            }}
          >
            SUAS UNHAS ESTARÃO ASSIM JÁ AMANHÃ
          </h2>

          <p
            className="mx-auto max-w-3xl"
            style={{ color: '#444e55', fontFamily: "Garet, sans-serif", fontSize: 16 }}
          >
            Nossas manicures vão reproduzir esse mesmo nível de <span style={{ fontWeight: 700 }}>brilho e perfeição</span> nas suas mãos.
          </p>
        </div>
        
        {/* Галерея карусель */}
        <div className="relative flex justify-center items-center mb-16 h-[500px]">
          {/* Кнопка назад */}
          <button
            onClick={prevImage}
            className="absolute left-4 z-20 w-14 h-14 rounded-full backdrop-blur-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
            style={{
              background: GLASS.cardBg,
              border: `1px solid ${GLASS.cardBorder}`,
              boxShadow: GLASS.cardShadow,
              color: COLORS.gray,
              fontSize: '24px'
            }}
          >
            ←
          </button>

          {/* Изображения */}
          <div className="flex items-center justify-center space-x-12">
            {getVisibleImages().map(({ filename, offset }, i) => {
              const isCenter = offset === 0
              const scale = isCenter ? 1 : 0.75
              const opacity = isCenter ? 1 : 0.6
              const zIndex = isCenter ? 10 : 5
              
              return (
                <div
                  key={`${filename}-${currentIndex}-${i}`}
                  className="transition-all duration-500 cursor-pointer"
                  style={{
                    transform: `scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex
                  }}
                  onClick={() => {
                    if (offset === -1) prevImage()
                    if (offset === 1) nextImage()
                  }}
                >
                  <div 
                    className="relative backdrop-blur-xl rounded-2xl overflow-hidden group"
                    style={{
                      background: GLASS.cardBg,
                      border: "none",
                      boxShadow: GLASS.cardShadow,
                      width: isCenter ? "400px" : "280px",
                      height: isCenter ? "480px" : "350px"
                    }}
                  >
                    {/* Glassmorphism градиенты */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 via-gray-500/2 to-transparent rounded-2xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-gray-600/8 via-transparent to-gray-600/5 rounded-2xl"></div>
                    
                    <div className="relative z-10 h-full">
                      <img 
                        src={`/images/gallery/${filename}`} 
                        alt={`Resultado Premium ${currentIndex + offset + 1}`}
                        key={`${filename}-update`}
                        className="w-full h-full object-cover rounded-2xl transition-all duration-500"
                        style={{ 
                          filter: 'brightness(0.95) contrast(1.05)'
                        }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Кнопка вперед */}
          <button
            onClick={nextImage}
            className="absolute right-4 z-20 w-14 h-14 rounded-full backdrop-blur-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
            style={{
              background: GLASS.cardBg,
              border: `1px solid ${GLASS.cardBorder}`,
              boxShadow: GLASS.cardShadow,
              color: COLORS.gray,
              fontSize: '24px'
            }}
          >
            →
          </button>
        </div>

        {/* Индикаторы */}
        <div className="flex justify-center space-x-2 mb-16">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{
                backgroundColor: index === currentIndex ? COLORS.gray : 'rgba(68, 78, 85, 0.3)'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
