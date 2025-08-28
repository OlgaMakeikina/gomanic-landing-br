import { ProcessStepCardProps } from './types'

export default function DesktopStepCard({ passo, index }: ProcessStepCardProps) {
  return (
    <div className="relative mb-16 last:mb-0">
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
          <div className="backdrop-blur-xl rounded-2xl p-8 border relative"
               style={{
                 background: 'rgba(255, 255, 255, 0.12)',
                 borderColor: 'rgba(255, 255, 255, 0.25)',
                 boxShadow: '0 32px 64px rgba(0,0,0,0.5)'
               }}>
            
            {/* Glassmorphism градиенты */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-black/20 via-transparent to-black/10 rounded-2xl"></div>
            
            <div className="relative z-10">
            <div className="mb-6 rounded-xl overflow-hidden"
                 style={{boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'}}>
              <img src={passo.imagem} alt={passo.titulo} className="w-full h-48 object-cover" />
            </div>
            <h3 className="vogue-caption mb-4" style={{color: '#FEFEFE'}}>{passo.titulo}</h3>
            <p className="vogue-body text-lg mb-4" style={{color: '#FEFEFE', fontWeight: 600}}>{passo.descricao}</p>
           
            {passo.seguranca && (
              <div className="mt-6">
                {index === 0 ? (
                  <button
                    onClick={() => document.getElementById("agendamento")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                    className="group w-full p-4 rounded-lg backdrop-blur-sm border border-white border-opacity-20 transition-all duration-300 cursor-pointer hover:bg-opacity-80"
                    style={{background: 'rgba(254, 254, 254, 0.12)'}}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(254, 254, 254, 0.20)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(254, 254, 254, 0.12)'
                      e.currentTarget.style.transform = 'translateY(0px)'
                    }}
                  >
                    <p className="text-sm text-center font-semibold flex items-center justify-center gap-2" style={{color: '#FEFEFE'}}>
                      {passo.seguranca}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </p>
                  </button>
                ) : (
                  <div className="p-4 rounded-lg backdrop-blur-sm border border-white border-opacity-20" style={{background: 'rgba(254, 254, 254, 0.12)'}}>
                    <p className="text-sm text-center" style={{color: '#FEFEFE'}}>{passo.seguranca}</p>
                  </div>
                )}
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
