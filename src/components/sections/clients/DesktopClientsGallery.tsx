'use client'

interface DesktopClientsGalleryProps {
  colors: {
    dark: string;
    white: string;
  };
}

export default function DesktopClientsGallery({ colors }: DesktopClientsGalleryProps) {
  return (
    <div className="mx-auto max-w-5xl rounded-3xl p-4 md:p-5 hidden md:block">
      <div className="grid gap-3 md:gap-4 h-[620px] grid-cols-6 grid-rows-4">
        {/* Левое верхнее фото - новое изображение */}
        <figure className="col-span-2 row-span-2 overflow-hidden rounded-2xl group">
          <img
            src="/images/clients/0_3.jpeg"
            alt="Cliente satisfeita - resultado perfeito"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            style={{filter: 'brightness(1.1) contrast(1.05) saturate(1.2)'}}
          />
        </figure>

        {/* Правое верхнее фото - новое изображение */}
        <figure className="col-span-2 row-span-2 overflow-hidden rounded-2xl group">
          <img
            src="/images/clients/0_3 (1).jpeg"
            alt="Cliente feliz com resultado"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            style={{filter: 'brightness(1.1) contrast(1.05)'}}
          />
        </figure>

        {/* Текстовый блок - верхний ряд справа с glassmorphism */}
        <div className="col-span-2 row-span-1 rounded-2xl border shadow-2xl flex items-center justify-center text-center relative overflow-hidden transition-all duration-500 hover:scale-105"
             style={{ 
               background:"rgba(68,78,85,.85)", 
               borderColor:"rgba(254,254,254,.4)",
               backdropFilter: "blur(20px)",
               boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)"
             }}>
          {/* Glassmorphism градиенты */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/8 to-transparent rounded-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black/20 via-transparent to-black/10 rounded-2xl"></div>
          
          <div className="px-4 w-full relative z-10">
            <h4 className="uppercase tracking-[0.1em] mb-3"
                style={{ 
                  color: colors.white, 
                  fontFamily:"Horizon, sans-serif", 
                  fontWeight:700, 
                  fontSize:14,
                  textShadow: "0 2px 8px rgba(0,0,0,0.3)"
                }}>
              SEJA A PRÓXIMA CLIENTE SATISFEITA
            </h4>
            <button
              onClick={() => document.getElementById('agendamento')?.scrollIntoView({ behavior:'smooth' })}
              className="w-full rounded-xl px-4 py-3 font-semibold uppercase tracking-wider text-xs transition-all duration-300 transform hover:scale-110 shadow-xl"
              style={{ 
                background: "linear-gradient(135deg, rgba(254,254,254,0.95) 0%, rgba(254,254,254,0.85) 100%)", 
                color: colors.dark,
                border: "1px solid rgba(255,255,255,0.5)",
                backdropFilter: "blur(10px)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(254,254,254,1) 0%, rgba(254,254,254,0.95) 100%)"
                e.currentTarget.style.transform = "scale(1.1) translateY(-2px)"
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(254,254,254,0.3)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(254,254,254,0.95) 0%, rgba(254,254,254,0.85) 100%)"
                e.currentTarget.style.transform = "scale(1)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              QUERO FAZER PARTE
            </button>
          </div>
        </div>

        {/* Вертикальное видео stories - правый столбец */}
        <div className="col-span-2 row-span-3 overflow-hidden rounded-2xl group">
          <video className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                 autoPlay loop muted playsInline
                 style={{aspectRatio: '9/16'}}>
            <source src="/images/clients/u2311792965_httpss.mj.runUTcEApe-3E8_Ultra_realistic_hyper_de_f3873cb7-a4ac-4988-ae27-89ca058a275d_3.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Нижнее широкое фото - девушка на диване */}
        <figure className="col-span-4 row-span-2 overflow-hidden rounded-2xl group">
          <img
            src="/images/clients/0_0 (25).jpeg"
            alt="Cliente relaxando no sofá"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            style={{filter: 'brightness(1.1) contrast(1.05)'}}
          />
        </figure>
      </div>
    </div>
  );
}