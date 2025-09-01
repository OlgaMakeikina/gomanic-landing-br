'use client'

import { useEffect } from 'react'
import Header from '@/components/header/Header'
import HeroSection from '@/components/hero/HeroSection'
import PromocoesMes2 from '@/components/sections/PromocoesMes2'
import SegurancaQualidade from '@/components/sections/SegurancaQualidade'
import ResultsGallery from '@/components/results-gallery/ResultsGallery'
import ClientsSection from '@/components/sections/ClientsSection'
import SocialProof from '@/components/sections/SocialProof'
import ComoFunciona from '@/components/como-funciona'
import VipExclusivo from '@/components/sections/VipExclusivo'
import ContactSection from '@/components/contact'
import Footer from '@/components/footer'
import { checkPixelStatus } from '@/utils/facebook-pixel'

export default function Home() {
  useEffect(() => {
    // Debug Meta Pixel on test domain
    if (typeof window !== 'undefined' && window.location.hostname.includes('test.')) {
      setTimeout(() => checkPixelStatus(), 2000);
    }
  }, []);
  return (
    <div className="min-h-screen" style={{backgroundColor: '#FEFEFE'}}>
      <Header />
      <main role="main" id="main-content">
        <HeroSection />
        <PromocoesMes2 />
        <ResultsGallery />
        <SegurancaQualidade />
        <ClientsSection />
        <SocialProof />
        <ComoFunciona />
        <VipExclusivo />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
