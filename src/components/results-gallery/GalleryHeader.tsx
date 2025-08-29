import styles from './styles.module.css'

export default function GalleryHeader() {
  return (
    <header className={styles.header}>
      <p className={styles.overline}>RESULTADOS</p>
      <h2 id="gallery-heading" className={styles.title}>
        SUAS UNHAS ESTARÃO ASSIM
        <br />
        JÁ AMANHÃ
      </h2>
      <p className={styles.subtitle}>
        Nossas manicures vão reproduzir esse mesmo nível de <strong>brilho e perfeição</strong> nas suas mãos.
      </p>
    </header>
  )
}
