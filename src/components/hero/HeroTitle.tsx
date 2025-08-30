import Image from 'next/image'

interface HeroTitleProps {
  title: string
  subtitle: string
  content?: string
  align?: 'center' | 'left'
  showLocationInfo?: boolean
}

export default function HeroTitle({ title, subtitle, content, align = 'center', showLocationInfo = false }: HeroTitleProps) {
  // Специальная логика для "GOMANIC Especialistas" - GOMANIC крупный сверху, Especialistas мелкий снизу
  const isGomanicEspecialistas = title === 'GOMANIC Especialistas'
  
  // 1) Если передан "A × B", используем его
  const hasDivider = title.includes(' × ')
  const [part1, part2] = hasDivider
    ? (title.split(' × ') as [string, string])
    : isGomanicEspecialistas
    ? (['GOMANIC', 'Especialistas'] as [string, string]) // GOMANIC крупный, Especialistas мелкий
    : (() => {
        // 2) Иначе: всё, кроме последнего слова — первая строка, последнее — вторая
        const words = title.trim().split(/\s+/)
        const last = words.pop() ?? ''
        return [words.join(' '), last] as [string, string]
      })()

  return (
    <>
      <div className={`mb-8 lg:mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
        <h1
          style={{
            fontFamily: 'Horizon, Arial, sans-serif',
            textTransform: 'uppercase',
            color: '#FEFEFE',
            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            lineHeight: 1.0,
            margin: 0
          }}
        >
          {/* Первая строка — условные стили */}
          {part1 && (
            <span
              style={{
                display: 'block',
                fontWeight: isGomanicEspecialistas ? 800 : 400,
                letterSpacing: isGomanicEspecialistas ? '0.04em' : '0.08em',
                fontSize: isGomanicEspecialistas ? 'clamp(2rem, 7vw, 5.5rem)' : 'clamp(1.1rem, 3.2vw, 2.2rem)',
                lineHeight: isGomanicEspecialistas ? 0.9 : 1.0
              }}
            >
              {part1}
            </span>
          )}

          {/* Вторая строка — условные стили */}
          <span
            style={{
              display: 'block',
              fontWeight: isGomanicEspecialistas ? 400 : 800,
              letterSpacing: isGomanicEspecialistas ? '0.08em' : '0.04em',
              lineHeight: isGomanicEspecialistas ? 1.0 : 0.9,
              marginTop: part1 ? '-0.15em' : 0,
              fontSize: isGomanicEspecialistas ? 'clamp(1.1rem, 3.2vw, 2.2rem)' : 'clamp(2rem, 7vw, 5.5rem)'
            }}
          >
            {part2}
          </span>
        </h1>

        {/* Location info - only when showLocationInfo is true */}
        {showLocationInfo && (
          <>
            {/* Desktop version - always right aligned under H1 */}
            <div className="hidden lg:flex lg:justify-end lg:mt-4 lg:mb-6">
              <div className="flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/10">
                <Image
                  src="/images/contacts/icons8-location-100.png"
                  alt="Location"
                  width={40}
                  height={40}
                  className="opacity-90"
                />
                <div className="text-left">
                  <p className="text-sm text-white/80 uppercase tracking-wider font-medium">
                    espaco de atendimento:
                  </p>
                  <p className="text-lg text-white font-bold tracking-wide">
                    ESTÚDIO UNHAS 5 ESTRELAS
                  </p>
                  <p className="text-sm text-white/80 uppercase tracking-wider font-medium">
                    INGLESES
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile version - centered under H1 */}
            <div className="lg:hidden flex justify-center mt-4 mb-6">
              <div className="flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
                <Image
                  src="/images/contacts/icons8-location-100.png"
                  alt="Location"
                  width={32}
                  height={32}
                  className="opacity-90"
                />
                <div className="text-center">
                  <p className="text-xs text-white/80 uppercase tracking-wider font-medium">
                    espaco de atendimento:
                  </p>
                  <p className="text-sm text-white font-bold tracking-wide">
                    ESTÚDIO UNHAS 5 ESTRELAS
                  </p>
                  <p className="text-xs text-white/80 uppercase tracking-wider font-medium">
                    INGLESES
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className={`mb-6 lg:mb-8 ${align === 'center' ? 'text-center' : 'text-left'}`}>
        <p
          style={{
            fontFamily: 'Garet, sans-serif',
            fontSize: 'clamp(1.1rem, 2.6vw, 2rem)',
            fontWeight: 600,
            color: '#FEFEFE',
            textShadow: '0 2px 10px rgba(0,0,0,0.4)',
            lineHeight: 1.2,
            margin: 0
          }}
        >
          {subtitle}
        </p>
      </div>

      {content && (
        <div className={`mb-8 lg:mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
          <p
            style={{
              fontFamily: 'Garet, sans-serif',
              fontSize: 'clamp(1rem, 2vw, 1.375rem)',
              fontWeight: 400,
              color: '#FEFEFE',
              opacity: 0.85,
              textShadow: '0 1px 5px rgba(0,0,0,0.3)',
              lineHeight: 1.5,
              maxWidth: 600,
              margin: '0 auto',
              padding: '0 1rem'
            }}
          >
            {content}
          </p>
        </div>
      )}
    </>
  )
}
