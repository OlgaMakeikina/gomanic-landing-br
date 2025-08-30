'use client';

import React from 'react';
import Image from 'next/image';
import styles from './BeforeAfterGallery.module.css';

const photoData = [
  '/images/before-after/0_1_12.jpeg',
  '/images/before-after/0_2_1_1.jpeg',
  '/images/before-after/u2311792965_Ultra_realistic_close-up_of_a_womans_hand_showing_595803a8-9f6b-4a5a-93c2-954b9f859655_1.png'
];

const BeforeAfterGallery: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Antes e Depois</h2>
          <p className={styles.subtitle}>
            Veja os resultados incríveis que nossas técnicas profissionais proporcionam
          </p>
        </div>
        
        <div className={styles.gallery}>
          {photoData.map((photo, index) => (
            <div key={index} className={styles.imageWrapper}>
              <Image
                src={photo}
                alt={`Transformação ${index + 1}`}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
        
        {/* CTA блок */}
        <div className="text-center mt-16">
          <div 
            className="inline-block relative backdrop-blur-xl rounded-2xl border max-w-4xl"
            style={{
              background: 'rgba(68, 78, 85, 0.95)',
              borderColor: 'rgba(68, 78, 85, 1)',
              boxShadow: '0 32px 64px rgba(68, 78, 85, 0.3)',
              padding: "40px 32px",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-black/15 via-transparent to-black/10 rounded-2xl"></div>
            
            <div className="relative z-10">
              <p 
                style={{
                  color: '#FEFEFE',
                  fontFamily: "Horizon, sans-serif",
                  fontSize: 24,
                  letterSpacing: "0.08em",
                  fontWeight: 500,
                  lineHeight: 1.5,
                  textTransform: "uppercase",
                  marginBottom: "24px"
                }}
              >
                O mesmo resultado pode ser seu.<br />
                <span style={{ fontWeight: 700 }}>Reserve agora e economize 50%</span>
              </p>
              
              <button
                onClick={() => document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-12 py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                style={{
                  background: '#FEFEFE',
                  color: '#444e55',
                  border: '1px solid #FEFEFE',
                  fontFamily: "Garet, sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  boxShadow: "0 10px 28px rgba(254,254,254,0.15)",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = '#FEFEFE'
                  e.currentTarget.style.boxShadow = "0 10px 28px rgba(59,59,57,0.45)"
                  e.currentTarget.style.border = '1px solid #FEFEFE'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FEFEFE'
                  e.currentTarget.style.color = '#444e55'
                  e.currentTarget.style.boxShadow = "0 10px 28px rgba(254,254,254,0.15)"
                  e.currentTarget.style.border = '1px solid #FEFEFE'
                }}
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

export default BeforeAfterGallery;