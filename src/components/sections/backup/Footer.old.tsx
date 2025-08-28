'use client'
import { useState } from 'react'

export default function Footer() {
  const [showMap, setShowMap] = useState(false)

  return (
    <footer className="py-20 border-t relative" style={{backgroundColor: '#444e55', color: '#FEFEFE', borderTopColor: '#FEFEFE'}}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-20 mb-16 items-start">
          
          {/* Logo */}
          <div className="lg:col-span-4 text-center flex flex-col min-h-[200px]">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <span className="text-xs uppercase tracking-wider font-bold" style={{color: '#FEFEFE'}}>GOMANIC</span>
              <div className="w-px h-4 bg-[#FEFEFE] opacity-70"></div>
              <span className="text-xs uppercase tracking-wider font-bold" style={{color: '#FEFEFE'}}>BRASIL</span>
            </div>
            <div className="w-16 h-px mb-8 mx-auto" style={{backgroundColor: '#FEFEFE', opacity: 0.3}}></div>
            <p className="text-sm leading-relaxed mb-8" style={{color: '#FEFEFE'}}>
              Manicure profissional com novos especialistas pela metade do preço.
            </p>
            
            <div className="mt-auto">
              <button 
                onClick={() => document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-60 mx-auto px-6 py-3 transition-all duration-300 rounded-lg transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden"
                style={{
                  backgroundColor: 'rgba(254, 254, 254, 0.9)',
                  color: '#444e55',
                  border: '1px solid rgba(254, 254, 254, 0.3)',
                  fontFamily: 'Garet, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(254, 254, 254, 0.1)'
                  e.currentTarget.style.color = '#FEFEFE'
                  e.currentTarget.style.border = '1px solid rgba(254, 254, 254, 0.5)'
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(254, 254, 254, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(254, 254, 254, 0.9)'
                  e.currentTarget.style.color = '#444e55'
                  e.currentTarget.style.border = '1px solid rgba(254, 254, 254, 0.3)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
                QUERO SER VIP AGORA
              </button>
            </div>
          </div>
          
          {/* Контакты и соцсети */}
          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-wider mb-8 text-center" style={{color: '#FEFEFE', letterSpacing: '0.15em'}}>CONTATOS E REDES SOCIAIS</div>
            <div className="w-16 h-px mb-8 mx-auto" style={{backgroundColor: '#FEFEFE', opacity: 0.3}}></div>
            
            {/* Все иконки в строку */}
            <div className="flex items-center gap-4 justify-center">
              <a href="tel:+5548919700099" className="hover:opacity-70 transition-all duration-300 transform hover:scale-110 w-14 h-14 flex items-center justify-center rounded-full flex-shrink-0" style={{
                backgroundColor: 'rgba(254, 254, 254, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(254, 254, 254, 0.2)'
              }}>
                <img src="/images/contacts/icons8-call-100.png" alt="Phone" className="w-7 h-7" style={{filter: 'brightness(0) invert(1)'}} />
              </a>
              <a href="https://www.instagram.com/unhas_cinco_estrelas?igsh=YXFiN2psamRvd2Fq" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-all duration-300 transform hover:scale-110 w-14 h-14 flex items-center justify-center rounded-full flex-shrink-0" style={{
                backgroundColor: 'rgba(254, 254, 254, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(254, 254, 254, 0.2)'
              }}>
                <img src="/images/contacts/icons8-instagram-100.png" alt="Instagram" className="w-7 h-7" style={{filter: 'brightness(0) invert(1)'}} />
              </a>
              <a href="https://wa.me/5548919700099" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-all duration-300 transform hover:scale-110 w-14 h-14 flex items-center justify-center rounded-full flex-shrink-0" style={{
                backgroundColor: 'rgba(254, 254, 254, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(254, 254, 254, 0.2)'
              }}>
                <img src="/images/contacts/icons8-whatsapp-100.png" alt="WhatsApp" className="w-7 h-7" style={{filter: 'brightness(0) invert(1)'}} />
              </a>
            </div>
          </div>
          
          {/* Адрес и карта */}
          <div className="lg:col-span-5 flex flex-col min-h-[200px]">
            <div className="text-xs uppercase tracking-wider mb-8 text-center" style={{color: '#FEFEFE', letterSpacing: '0.15em'}}>ENDEREÇO</div>
            <div className="w-16 h-px mb-8 mx-auto" style={{backgroundColor: '#FEFEFE', opacity: 0.3}}></div>
            
            <div className="space-y-6 flex-grow">
              <div className="flex justify-center">
                <div className="flex items-start gap-2">
                  <img src="/images/contacts/icons8-location-100 (1).png" alt="Location" className="w-5 h-5 mt-1 flex-shrink-0" style={{filter: 'brightness(0) invert(1)'}} />
                  <div className="text-sm leading-relaxed">
                    <a href="https://maps.app.goo.gl/WAF49srxPQj4tdeV9" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{color: '#FEFEFE', textDecoration: 'none'}}>
                      <div>Sala 1, Rod. Armando Calil Bulos, 5795</div>
                      <div>Ingleses Norte, Florianópolis - SC, 88058-001</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-auto">
              <div className="flex justify-center">
                <button
                  onClick={() => setShowMap(!showMap)}
                  className="px-8 py-3 transition-all duration-300 rounded-lg transform hover:scale-105 hover:-translate-y-1"
                  style={{
                    backgroundColor: 'rgba(254, 254, 254, 0.1)',
                    color: '#FEFEFE',
                    border: '1px solid rgba(254, 254, 254, 0.3)',
                    fontFamily: 'Garet, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(254, 254, 254, 0.2)'
                    e.currentTarget.style.color = '#FEFEFE'
                    e.currentTarget.style.border = '1px solid rgba(254, 254, 254, 0.5)'
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(254, 254, 254, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(254, 254, 254, 0.1)'
                    e.currentTarget.style.color = '#FEFEFE'
                    e.currentTarget.style.border = '1px solid rgba(254, 254, 254, 0.3)'
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {showMap ? 'ESCONDER MAPA' : 'MOSTRAR NO MAPA'}
                </button>
              </div>
            </div>
              
            {/* Встроенная карта */}
            {showMap && (
              <div className="w-full h-48 rounded-lg overflow-hidden mt-4 relative" style={{
                border: '1px solid rgba(254, 254, 254, 0.3)',
                backgroundColor: 'rgba(254, 254, 254, 0.05)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3541.0222368395143!2d-48.40632452486441!3d-27.4374177153309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x952742015f97e645%3A0x8b786a982e3a40e3!2sRod.%20Armando%20Calil%20Bulos%2C%205795%20-%20Ingleses%20Norte%2C%20Florian%C3%B3polis%20-%20SC%2C%2088058-001!5e0!3m2!1sen!2sbr!4v1755612096169!5m2!1sen!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{border: 0, borderRadius: '8px'}} 
                  allowFullScreen={true}
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>

        </div>
        
        {/* Реквизиты компании - на всю ширину */}
        <div className="mt-16 pt-8 border-t" style={{borderTopColor: 'rgba(254, 254, 254, 0.2)'}}>
          <div className="text-xs uppercase tracking-wider mb-8 text-center" style={{color: '#FEFEFE', letterSpacing: '0.15em'}}>DADOS DA EMPRESA</div>
          <div className="w-16 h-px mb-8 mx-auto" style={{backgroundColor: '#FEFEFE', opacity: 0.3}}></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-xs uppercase tracking-wider mb-2" style={{color: '#FEFEFE', opacity: 0.7}}>RAZÃO SOCIAL</div>
              <div style={{
                color: '#FEFEFE',
                fontFamily: 'Garet, sans-serif',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: 1.4
              }}>
                UNHAS 5 ESTRELAS LTDA
              </div>
            </div>
            
            <div>
              <div className="text-xs uppercase tracking-wider mb-2" style={{color: '#FEFEFE', opacity: 0.7}}>CNPJ</div>
              <div style={{
                color: '#FEFEFE',
                fontFamily: 'Garet, sans-serif',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: 1.4
              }}>
                53.316.798/0001-41
              </div>
            </div>
            
            <div>
              <div className="text-xs uppercase tracking-wider mb-2" style={{color: '#FEFEFE', opacity: 0.7}}>CONTA BANCÁRIA</div>
              <div style={{
                color: '#FEFEFE',
                fontFamily: 'Garet, sans-serif',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: 1.4
              }}>
                Agência 1<br />
                Conta 15180643906
              </div>
            </div>
            
            <div>
              <div className="text-xs uppercase tracking-wider mb-2" style={{color: '#FEFEFE', opacity: 0.7}}>PIX</div>
              <div style={{
                color: '#FEFEFE',
                fontFamily: 'Garet, sans-serif',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: 1.4
              }}>
                (48) 99673-7351
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 text-center" style={{borderTopColor: '#FEFEFE'}}>
          <div className="flex items-center justify-center space-x-3">
            <span className="text-xs uppercase tracking-wider font-bold" style={{color: '#FEFEFE'}}>© 2025 GOMANIC</span>
            <div className="w-px h-4 bg-[#FEFEFE] opacity-70"></div>
            <span className="text-xs uppercase tracking-wider font-bold" style={{color: '#FEFEFE'}}>BRASIL. TODOS OS DIREITOS RESERVADOS.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
