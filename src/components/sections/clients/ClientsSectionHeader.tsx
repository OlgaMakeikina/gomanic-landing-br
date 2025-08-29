'use client'

interface ClientsSectionHeaderProps {
  colors: {
    white: string;
  };
}

export default function ClientsSectionHeader({ colors }: ClientsSectionHeaderProps) {
  return (
    <header className="text-center mb-16">
      <p
        className="uppercase tracking-[0.22em] mb-3"
        style={{ color: colors.white, fontFamily: "Garet, sans-serif", fontSize: 14, opacity: 0.85 }}
      >
        FOTOS DE CLIENTES
      </p>

      <h2
        id="clientes-heading"
        className="uppercase mb-6 text-2xl sm:text-2xl md:text-3xl lg:text-5xl"
        style={{
          color: colors.white,
          fontFamily: "Horizon, sans-serif",
          letterSpacing: "0.12em",
          fontWeight: 500,
        }}
      >
        NOSSOS CLIENTES SATISFEITOS
      </h2>
      
      <p
        className="mx-auto max-w-3xl"
        style={{ color: colors.white, opacity: 0.9, fontFamily: "Garet, sans-serif", fontSize: 16 }}
      >
        Milhares de clientes satisfeitas que já confiaram em nosso trabalho
      </p>
    </header>
  );
}