'use client'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { href: "#promocoes-2", label: "PROMOÇÕES" },
    { href: "#portfolio", label: "PORTFÓLIO" },
    { href: "#seguranca", label: "SEGURANÇA" },
    { href: "#clientes", label: "CLIENTES" },
    { href: "#vip-exclusivo", label: "VIP CLUB" },
    { href: "#como-funciona", label: "PROCESSO" },
    { href: "#agendamento", label: "CONTATO" }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{backgroundColor: '#FEFEFE', borderBottom: '1px solid rgba(68, 78, 85, 0.1)'}}>
      <div className="max-w-8xl mx-auto px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo - адаптивный дизайн */}
          <a href="#hero" className="flex items-center hover:opacity-70 transition-opacity">
            {/* Desktop логотип - одна строка */}
            <div className="hidden lg:flex items-center space-x-3">
              <span className="vogue-logo text-lg">GOMANIC</span>
              <div className="w-px h-4 bg-[#444e55]"></div>
              <span className="vogue-logo text-lg">UNHAS 5 ESTRELAS</span>
            </div>
            
            {/* Mobile логотип - две строки, меньшими буквами */}
            <div className="flex lg:hidden flex-col items-start">
              <span className="vogue-logo text-sm leading-none" style={{color: '#444e55'}}>GOMANIC</span>
              <span className="vogue-logo text-xs leading-none opacity-80" style={{color: '#444e55'}}>UNHAS 5 ESTRELAS</span>
            </div>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className="vogue-caption hover:opacity-70 transition-opacity px-3 py-2 text-xs whitespace-nowrap" 
                style={{color: '#3B3B3A', fontSize: '11px', letterSpacing: '0.1em', fontWeight: 600}}
              >
                {item.label}
              </a>
            ))}
            <div className="ml-4 text-xs px-4 py-2 relative backdrop-blur-xl rounded-full border border-white border-opacity-40"
                 style={{
                   background: 'linear-gradient(135deg, rgba(245, 228, 230, 0.95) 0%, rgba(245, 228, 230, 0.8) 100%)',
                   color: '#3B3B3A',
                   boxShadow: '0 8px 32px rgba(245, 228, 230, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                   fontWeight: 700,
                   letterSpacing: '0.1em',
                   animation: 'pulse 2s ease-in-out infinite'
                 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/15 to-transparent rounded-full pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-black/5 via-transparent to-black/3 rounded-full pointer-events-none"></div>
              <div className="absolute inset-0 rounded-full"
                   style={{
                     background: 'linear-gradient(135deg, rgba(245, 228, 230, 0.3) 0%, rgba(245, 228, 230, 0.1) 100%)',
                     animation: 'glow 1.5s ease-in-out infinite alternate'
                   }}></div>
              <span className="relative z-10">3 VAGAS</span>
              <style jsx>{`
                @keyframes pulse {
                  0%, 100% { transform: scale(1); }
                  50% { transform: scale(1.05); }
                }
                @keyframes glow {
                  0% { opacity: 0.8; box-shadow: 0 0 20px rgba(245, 228, 230, 0.5); }
                  100% { opacity: 1; box-shadow: 0 0 30px rgba(245, 228, 230, 0.8), 0 0 40px rgba(245, 228, 230, 0.3); }
                }
              `}</style>
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2 relative transition-all duration-300 z-50 touch-manipulation" 
            aria-label="Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <div className="w-6 h-6 relative mx-auto">
              <div 
                className={`absolute w-6 h-0.5 transition-all duration-300 ${
                  isMobileMenuOpen 
                    ? 'top-1/2 left-0 rotate-45 -translate-y-1/2' 
                    : 'top-0 left-0 rotate-0'
                }`}
                style={{backgroundColor: isMobileMenuOpen ? '#FEFEFE' : '#444e55'}}
              ></div>
              <div 
                className={`absolute top-1/2 left-0 w-6 h-0.5 -translate-y-1/2 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}
                style={{backgroundColor: '#444e55'}}
              ></div>
              <div 
                className={`absolute w-6 h-0.5 transition-all duration-300 ${
                  isMobileMenuOpen 
                    ? 'top-1/2 left-0 -rotate-45 -translate-y-1/2' 
                    : 'bottom-0 left-0 rotate-0'
                }`}
                style={{backgroundColor: isMobileMenuOpen ? '#FEFEFE' : '#444e55'}}
              ></div>
            </div>
          </button>
        </div>
        
        {/* Mobile Navigation - с глассморфизмом */}
        <nav className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
          isMobileMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }`}>
          {/* Фон с блюром */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(59, 59, 58, 0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Компактный контейнер с глассморфизмом */}
          <div className={`relative h-full flex flex-col justify-center items-center text-center px-6 transform transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            
            {/* Glassmorphism контейнер для контента */}
            <div 
              className="p-8 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(254, 254, 254, 0.1) 0%, rgba(254, 254, 254, 0.05) 100%)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '1px solid rgba(254, 254, 254, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(254, 254, 254, 0.1)'
              }}
            >
              
              {/* Navigation links - с Horizon шрифтом */}
              <div className="space-y-1 mb-6">
                {menuItems.map((item, index) => (
                  <a 
                    key={index}
                    href={item.href} 
                    className="block hover:opacity-70 transition-all duration-300 py-2 text-base touch-manipulation"
                    style={{
                      color: '#FEFEFE', 
                      minHeight: '40px', 
                      lineHeight: '40px',
                      fontFamily: 'Horizon, sans-serif',
                      fontSize: '14px',
                      fontWeight: 'normal',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase'
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Contact icons - компактно */}
              <div className="flex justify-center space-x-4 mb-5">
                {/* WhatsApp */}
                <a 
                  href="https://wa.me/5548919700099" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full contact-icon whatsapp-icon touch-manipulation"
                  style={{
                    backgroundColor: '#25D366',
                    border: '1px solid rgba(254, 254, 254, 0.2)',
                    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
                  }}
                  aria-label="WhatsApp"
                >
                  <img 
                    src="/images/contacts/icons8-whatsapp-100.png" 
                    alt="WhatsApp" 
                    width={24} 
                    height={24}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </a>

                {/* Phone */}
                <a 
                  href="tel:+5548919700099" 
                  className="w-12 h-12 flex items-center justify-center rounded-full contact-icon phone-icon touch-manipulation"
                  style={{
                    backgroundColor: '#444e55',
                    border: '1px solid rgba(254, 254, 254, 0.2)',
                    boxShadow: '0 4px 12px rgba(68, 78, 85, 0.3)'
                  }}
                  aria-label="Telefone"
                >
                  <img 
                    src="/images/contacts/icons8-call-100.png" 
                    alt="Telefone" 
                    width={20} 
                    height={20}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </a>

                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/unhas_cinco_estrelas?igsh=YXFiN2psamRvd2Fq" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full contact-icon instagram-icon touch-manipulation"
                  style={{
                    background: 'linear-gradient(45deg, #F09433 0%, #E6683C 25%, #DC2743 50%, #CC2366 75%, #BC1888 100%)',
                    border: '1px solid rgba(254, 254, 254, 0.2)',
                    boxShadow: '0 4px 12px rgba(225, 48, 108, 0.3)'
                  }}
                  aria-label="Instagram"
                >
                  <img 
                    src="/images/contacts/icons8-instagram-100.png" 
                    alt="Instagram" 
                    width={20} 
                    height={20}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </a>
              </div>

              {/* Booking button - с глассморфизмом */}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="booking-button px-6 py-3 mb-4 touch-manipulation"
                style={{
                  background: 'linear-gradient(135deg, rgba(68, 78, 85, 0.9) 0%, rgba(68, 78, 85, 0.8) 100%)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  color: '#FEFEFE',
                  border: '1px solid rgba(254, 254, 254, 0.3)',
                  fontFamily: 'Garet, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  minHeight: '44px',
                  boxShadow: '0 4px 12px rgba(68, 78, 85, 0.4), inset 0 1px 0 rgba(254, 254, 254, 0.1)'
                }}
              >
                AGENDAR AGORA
              </button>

              {/* Urgency indicator - с глассморфизмом */}
              <div 
                className="urgency-indicator inline-block px-4 py-2 rounded" 
                style={{
                  background: 'linear-gradient(135deg, rgba(68, 78, 85, 0.4) 0%, rgba(68, 78, 85, 0.3) 100%)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(254, 254, 254, 0.2)',
                  boxShadow: '0 2px 8px rgba(68, 78, 85, 0.2)'
                }}
              >
                <div className="vogue-caption text-xs" style={{color: '#FEFEFE'}}>⏰ 3 VAGAS RESTANTES</div>
              </div>
              
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}