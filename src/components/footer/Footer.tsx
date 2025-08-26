'use client'
import { useState } from 'react'
import FooterLogo from './FooterLogo'
import SocialLinks from './SocialLinks'
import AddressSection from './AddressSection'
import CompanyInfo from './CompanyInfo'
import Copyright from './Copyright'

export default function Footer() {
  const [showMap, setShowMap] = useState(false)

  const handleCtaClick = () => {
    document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleToggleMap = () => {
    setShowMap(!showMap)
  }

  return (
    <footer className="py-20 border-t relative" style={{
      backgroundColor: '#444e55', 
      color: '#FEFEFE', 
      borderTopColor: '#FEFEFE',
      boxShadow: '0 -20px 60px rgba(0, 0, 0, 0.4)'
    }} role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-20 mb-16 items-start">
          
          <FooterLogo onCtaClick={handleCtaClick} />
          <SocialLinks />
          <AddressSection showMap={showMap} onToggleMap={handleToggleMap} />

        </div>
        
        <CompanyInfo />
        <Copyright />
      </div>
    </footer>
  )
}
