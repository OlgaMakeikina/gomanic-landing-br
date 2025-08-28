'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ResultsGallery.module.css';

const portfolioData = [
  "0_0 (5).jpeg",
  "0_0 (6).jpeg", 
  "0_0 (9).jpeg",
  "0_1 (8).jpeg",
  "0_1 (9).jpeg",
  "0_2 (3).jpeg",
  "0_3 (3).jpeg",
  "0_3 (6).jpeg",
  "0_3 (9).jpeg"
];

const beforeAfterData = [
  '/images/before-after/0_0 (16).jpeg',
  '/images/before-after/0_3 (22).jpeg',
  '/images/before-after/0_1 (14).jpeg'
];

const ResultsGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'before-after'>('portfolio');

  return (
    <section id="portfolio" className={styles.section}>
      <div className={styles.container}>
        {/* Заголовок секции */}
        <div className={styles.header}>
          <div className={styles.overline}>RESULTADOS</div>
          <h2 className={styles.title}>SUAS UNHAS ESTARÃO ASSIM JÁ AMANHÃ</h2>
          <p className={styles.subtitle}>
            Nossas manicures vão reproduzir esse mesmo nível de <strong>brilho e perfeição</strong> nas suas mãos.
          </p>
        </div>

        {/* Табы с glassmorphism */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'portfolio' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('portfolio')}
            >
              <div className={styles.tabNumber}>1</div>
              <div>
                <div className={styles.tabTitle}>PORTFÓLIO</div>

              </div>
            </button>
            
            <button
              className={`${styles.tab} ${activeTab === 'before-after' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('before-after')}
            >
              <div className={styles.tabNumber}>2</div>
              <div>
                <div className={styles.tabTitle}>ANTES E DEPOIS</div>
              </div>
            </button>
          </div>
        </div>

        {/* Контент галереи */}
        <div className={styles.galleryContainer}>
          {activeTab === 'portfolio' && (
            <div className={styles.portfolioGrid}>
              {portfolioData.map((image, index) => (
                <div key={index} className={styles.portfolioItem}>
                  <Image
                    src={`/images/gallery/${image}`}
                    alt={`Portfolio ${index + 1}`}
                    fill
                    className={styles.portfolioImage}
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'before-after' && (
            <div className={styles.beforeAfterGrid}>
              {beforeAfterData.map((photo, index) => (
                <div key={index} className={styles.beforeAfterItem}>
                  <Image
                    src={photo}
                    alt={`Transformação ${index + 1}`}
                    fill
                    className={styles.beforeAfterImage}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA блок */}
        <div className={styles.ctaContainer}>
          <div className={styles.ctaBox}>
            <div className={styles.ctaGradient1}></div>
            <div className={styles.ctaGradient2}></div>
            
            <div className={styles.ctaContent}>
              <p className={styles.ctaText}>
                O mesmo resultado pode ser seu.<br />
                <span className={styles.ctaSecondary}>Reserve agora e</span><br />
                <span className={styles.ctaHighlight}>economize 50%</span>
              </p>
              
              <button
                onClick={() => document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' })}
                className={styles.ctaButton}
              >
                Quero garantir minha vaga agora
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsGallery;