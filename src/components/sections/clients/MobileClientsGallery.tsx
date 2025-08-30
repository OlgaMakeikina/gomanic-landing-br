'use client'

interface MobileClientsGalleryProps {
  colors: {
    dark: string;
    white: string;
  };
}

export default function MobileClientsGallery({ colors }: MobileClientsGalleryProps) {
  return (
    <div className="md:hidden">
      {/* Галерея 2x2 */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {/* Фото 1 - новое изображение */}
        <figure className="aspect-square overflow-hidden rounded-2xl group">
          <img
            src="/images/clients/0_3.jpeg"
            alt="Cliente satisfeita - resultado perfeito"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            style={{filter: 'brightness(1.1) contrast(1.05) saturate(1.2)'}}
          />
        </figure>

        {/* Фото 2 - новое изображение */}
        <figure className="aspect-square overflow-hidden rounded-2xl group">
          <img
            src="/images/clients/0_3_1.jpeg"
            alt="Cliente feliz com resultado"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            style={{filter: 'brightness(1.1) contrast(1.05)'}}
          />
        </figure>

        {/* Фото 3 - девушка на диване */}
        <figure className="aspect-square overflow-hidden rounded-2xl group">
          <img
            src="/images/clients/0_0_25.jpeg"
            alt="Cliente relaxando no sofá"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            style={{filter: 'brightness(1.1) contrast(1.05)'}}
          />
        </figure>

        {/* Видео блок */}
        <div className="aspect-square overflow-hidden rounded-2xl group">
          <video className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                 autoPlay loop muted playsInline
                 style={{aspectRatio: '1/1'}}>
            <source src="/images/clients/u2311792965_httpss.mj.runUTcEApe-3E8_Ultra_realistic_hyper_de_f3873cb7-a4ac-4988-ae27-89ca058a275d_3.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* CTA плашка с отступами по бокам */}
      <div className="rounded-2xl border shadow-2xl p-6 text-center relative overflow-hidden backdrop-blur-xl mx-3"
           style={{ 
             background:"rgba(68,78,85,.90)", 
             borderColor:"rgba(254,254,254,.3)",
             boxShadow: "0 25px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)"
           }}>
        {/* Glassmorphism градиенты */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-black/20 via-transparent to-black/10 rounded-2xl"></div>
        
        <div className="relative z-10">
          <h4 className="uppercase tracking-[0.12em] mb-4"
              style={{ 
                color: colors.white, 
                fontFamily:"Horizon, sans-serif", 
                fontWeight:600, 
                fontSize:18,
                lineHeight:1.3,
                textShadow: "0 2px 8px rgba(0,0,0,0.4)"
              }}>
            SEJA A PRÓXIMA CLIENTE SATISFEITA
          </h4>
          
          <p className="mb-6 opacity-90"
             style={{ 
               color: colors.white, 
               fontFamily:"Garet, sans-serif", 
               fontSize:14,
               lineHeight:1.5
             }}>
            Milhares de clientes já confiaram em nosso trabalho
          </p>
          
          <button
            onClick={() => document.getElementById('agendamento')?.scrollIntoView({ behavior:'smooth' })}
            className="w-full rounded-2xl px-6 py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300 transform active:scale-95"
            style={{ 
              background: "linear-gradient(135deg, rgba(254,254,254,0.98) 0%, rgba(254,254,254,0.92) 100%)", 
              color: colors.dark,
              border: "1px solid rgba(255,255,255,0.4)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 8px 25px rgba(254,254,254,0.2)"
            }}
          >
            QUERO FAZER PARTE
          </button>
        </div>
      </div>
    </div>
  );
}