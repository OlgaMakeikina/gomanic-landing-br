'use client'

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

export default function Home() {
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
