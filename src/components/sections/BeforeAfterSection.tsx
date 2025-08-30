'use client'

export default function BeforeAfterSection() {
  const COLORS = { dark: "#3B3B3A", gray: "#444e55", white: "#FEFEFE" }
  
  const transformations = [
    {
      titulo: "Transformação Natural",
      imagem: "/images/before-after/0_1_12.jpeg",
      descricao: "Manicure perfeita com acabamento profissional"
    },
    {
      titulo: "Design Sofisticado", 
      imagem: "/images/before-after/0_2_1_1.jpeg",
      descricao: "Nail art exclusiva e refinada"
    },
    {
      titulo: "Resultado Premium",
      imagem: "/images/before-after/u2311792965_Ultra_realistic_close-up_of_a_womans_hand_showing_595803a8-9f6b-4a5a-93c2-954b9f859655_1.png", 
      descricao: "Unhas fortalecidas e embelezadas"
    }
  ]

  return (
    <section id="antes-depois" className="relative py-20" style={{ backgroundColor: COLORS.white }}>
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <div
            className="uppercase tracking-[0.22em] mb-3"
            style={{ color: COLORS.gray, fontFamily: "Garet, sans-serif", fontSize: 14, opacity: 0.85 }}
          >
            ANTES E DEPOIS
          </div>

          <h2
            className="uppercase mb-6"
            style={{
              color: COLORS.gray,
              fontFamily: "Horizon, sans-serif",
              letterSpacing: "0.12em",
              fontWeight: 500,
              fontSize: 28,
            }}
          >
            ANTES E DEPOIS
          </h2>
          
          <p
            className="mx-auto max-w-3xl"
            style={{ color: COLORS.gray, opacity: 0.8, fontFamily: "Garet, sans-serif", fontSize: 16 }}
          >
            Veja as transformações reais das nossas clientes. Resultados que falam por si só.
          </p>
        </div>
        
        {/* Галерея до и после - 3 фото */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {transformations.map((transformation, index) => (
            <div key={index} className="group">
              <div className="relative rounded-2xl overflow-hidden mb-6 transition-all duration-500 hover:scale-105" 
                   style={{backgroundColor: '#f5f5f5'}}>
                <div className="relative aspect-[4/3]">
                  <img 
                    src={transformation.imagem}
                    alt={transformation.titulo}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{filter: 'brightness(1.1) contrast(1.05)'}}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 
                  className="mb-3"
                  style={{
                    color: COLORS.gray,
                    fontFamily: "Horizon, sans-serif",
                    fontSize: 18,
                    fontWeight: 500,
                    letterSpacing: "0.02em"
                  }}
                >
                  {transformation.titulo}
                </h3>
                
                <p 
                  style={{
                    color: COLORS.gray,
                    opacity: 0.8,
                    fontFamily: "Garet, sans-serif",
                    fontSize: 14,
                    lineHeight: 1.6
                  }}
                >
                  {transformation.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA после блока до/после */}
        <div className="text-center mt-16">
          <button
            onClick={() => document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-12 py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #444e55 0%, #3a434a 100%)',
              color: COLORS.white,
              border: 'none',
              fontFamily: "Garet, sans-serif",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              boxShadow: "0 10px 28px rgba(68,78,85,0.3)",
              cursor: "pointer"
            }}
          >
            QUERO MEU ANTES E DEPOIS
          </button>
          
          <p className="mt-4 text-sm" style={{color: COLORS.gray, opacity: 0.7}}>
            ✨ Transformação garantida ou devolvemos seu dinheiro
          </p>
        </div>
      </div>
    </section>
  )
}