export default function PortfolioHeader() {
  return (
    <div className="text-center mb-16">
      <div
        className="uppercase tracking-[0.22em] mb-3"
        style={{ color: '#444e55', fontFamily: "Garet, sans-serif", fontSize: 14, opacity: 0.85 }}
      >
        RESULTADOS
      </div>

      <h2
        className="uppercase mb-6"
        style={{
          color: '#444e55',
          fontFamily: "Horizon, sans-serif",
          letterSpacing: "0.12em",
          fontWeight: 500,
          fontSize: 28,
        }}
      >
        SUAS UNHAS ESTARÃO ASSIM
        <br />
        JÁ AMANHÃ
      </h2>

      <p
        className="mx-auto max-w-3xl"
        style={{ color: '#444e55', fontFamily: "Garet, sans-serif", fontSize: 16 }}
      >
        Nossas manicures vão reproduzir esse mesmo nível de <span style={{ fontWeight: 700 }}>brilho e perfeição</span> nas suas mãos.
      </p>
    </div>
  )
}
