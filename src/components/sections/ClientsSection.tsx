'use client'

import { 
  ClientsSectionHeader, 
  DesktopClientsGallery, 
  MobileClientsGallery 
} from './clients';

export default function ClientsSection() {
  const COLORS = { dark: "#3B3B3A", white: "#FEFEFE" }

  return (
    <section 
      id="clientes" 
      className="py-20" 
      style={{ 
        background: 'linear-gradient(135deg, #3B3B3A 0%, #2a2a29 50%, #1f1f1e 100%)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 -20px 60px rgba(0, 0, 0, 0.4)'
      }}
      aria-labelledby="clientes-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <ClientsSectionHeader colors={COLORS} />
        <DesktopClientsGallery colors={COLORS} />
        <MobileClientsGallery colors={COLORS} />
      </div>

      {/* Мобильные стили для скрытия скроллбара в карусели */}
      <style jsx>{`
        @media (max-width: 768px) {
          .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }
          
          /* Плавная анимация для мобильного CTA */
          @keyframes mobile-cta-fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          /* Добавляем анимацию для мобильной галереи */
          .md\\:hidden {
            animation: mobile-cta-fade-in 0.8s ease-out;
          }
        }
      `}</style>
    </section>
  )
}