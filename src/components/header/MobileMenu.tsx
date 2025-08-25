import { MobileMenuProps } from './types'

export default function MobileMenu({ isOpen, items, onClose }: MobileMenuProps) {
  return (
    <nav className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
      isOpen 
        ? 'opacity-100 visible' 
        : 'opacity-0 invisible'
    }`}>
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(59, 59, 58, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
        onClick={onClose}
      ></div>
      
      <div className={`relative h-full flex flex-col justify-center items-center text-center px-6 transform transition-transform duration-500 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
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
          
          <div className="space-y-1 mb-6">
            {items.map((item, index) => (
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
                onClick={onClose}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex justify-center space-x-4 mb-5">
            <a 
              href="https://wa.me/554891970099" 
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

          <button 
            onClick={() => {
              onClose()
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
  )
}
