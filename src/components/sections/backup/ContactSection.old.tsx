'use client'
import { useState } from 'react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Agendamento enviado! Entraremos em contato em breve.')
  }

  return (
    <section id="agendamento" className="vogue-section" style={{backgroundColor: '#444e55', color: '#FEFEFE'}}>
      <div className="vogue-container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-20">
            <div className="vogue-caption mb-4" style={{color: '#FEFEFE'}}>RESERVA</div>
            <h2 className="vogue-subhead mb-8" style={{color: '#FEFEFE'}}>AGENDE SEU HORÁRIO</h2>
            <div className="vogue-divider-long mx-auto mb-8" style={{backgroundColor: '#FEFEFE', opacity: 0.3}}></div>
            <p className="vogue-body" style={{color: '#FEFEFE'}}>Preencha o formulário e garanta sua vaga com 50% de desconto</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block vogue-caption mb-4" style={{color: '#FEFEFE'}}>NOME COMPLETO</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-0 py-4 bg-transparent border-0 border-b focus:outline-none transition-colors vogue-body"
                style={{
                  color: '#FEFEFE',
                  borderBottomColor: '#FEFEFE'
                }}
                placeholder="Seu nome completo"
                onFocus={(e) => e.target.style.borderBottomColor = '#FEFEFE'}
                onBlur={(e) => e.target.style.borderBottomColor = '#FEFEFE'}
              />
            </div>
            
            <div>
              <label className="block vogue-caption mb-4" style={{color: '#FEFEFE'}}>TELEFONE/WHATSAPP</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-0 py-4 bg-transparent border-0 border-b focus:outline-none transition-colors vogue-body"
                style={{
                  color: '#FEFEFE',
                  borderBottomColor: '#FEFEFE'
                }}
                placeholder="(11) 99999-9999"
                onFocus={(e) => e.target.style.borderBottomColor = '#FEFEFE'}
                onBlur={(e) => e.target.style.borderBottomColor = '#FEFEFE'}
              />
            </div>
            
            <div>
              <label className="block vogue-caption mb-4" style={{color: '#FEFEFE'}}>SERVIÇO DESEJADO</label>
              <select
                required
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
                className="w-full px-0 py-4 bg-transparent border-0 border-b focus:outline-none transition-colors vogue-body"
                style={{
                  color: '#FEFEFE',
                  borderBottomColor: '#FEFEFE',
                  backgroundColor: '#444e55'
                }}
                onFocus={(e) => e.target.style.borderBottomColor = '#FEFEFE'}
                onBlur={(e) => e.target.style.borderBottomColor = '#FEFEFE'}
              >
                <option value="" style={{backgroundColor: '#444e55', color: '#FEFEFE'}}>Escolha o serviço</option>
                <option value="manicure" style={{backgroundColor: '#444e55', color: '#FEFEFE'}}>Manicure sem esmaltação - R$ 50</option>
                <option value="manicure-gel" style={{backgroundColor: '#444e55', color: '#FEFEFE'}}>Manicure + gel - R$ 100</option>
                <option value="manicure-gel-fortalecimento" style={{backgroundColor: '#444e55', color: '#FEFEFE'}}>Manicure + gel + fortalecimento - R$ 130</option>
              </select>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block vogue-caption mb-4" style={{color: '#FEFEFE'}}>DATA PREFERIDA</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b focus:outline-none transition-colors vogue-body"
                  style={{
                    color: '#FEFEFE',
                    borderBottomColor: '#FEFEFE'
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = '#FEFEFE'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#FEFEFE'}
                />
              </div>
              
              <div>
                <label className="block vogue-caption mb-4" style={{color: '#FEFEFE'}}>HORÁRIO PREFERIDO</label>
                <select
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b focus:outline-none transition-colors vogue-body"
                  style={{
                    color: '#FEFEFE',
                    borderBottomColor: '#FEFEFE',
                    backgroundColor: '#444e55'
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = '#FEFEFE'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#FEFEFE'}
                >
                  <option value="" style={{backgroundColor: '#444e55', color: '#FEFEFE'}}>Escolha o horário</option>
                  <option value="09:00" style={{backgroundColor: '#444e55', color: '#FEFEFE'}}>09:00</option>
                  <option value="10:00" style={{backgroundColor: '#444e55', color: '#FEFEFE'}}>10:00</option>
                  <option value="11:00" style={{backgroundColor: '#444e55', color: '#FEFEFE'}}>11:00</option>
                  <option value="14:00" style={{backgroundColor: '#444e55', color: '#FEFEFE'}}>14:00</option>
                  <option value="15:00" style={{backgroundColor: '#444e55', color: '#FEFEFE'}}>15:00</option>
                  <option value="16:00" style={{backgroundColor: '#444e55', color: '#FEFEFE'}}>16:00</option>
                  <option value="17:00" style={{backgroundColor: '#444e55', color: '#FEFEFE'}}>17:00</option>
                </select>
              </div>
            </div>
            
            <div className="text-center pt-8">
              <button
                type="submit"
                className="px-16 py-6 transition-all duration-300 vogue-btn"
                style={{
                  backgroundColor: '#FEFEFE',
                  color: '#444e55',
                  border: 'none',
                  fontFamily: 'Garet, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#FEFEFE'
                  e.currentTarget.style.border = '1px solid #FEFEFE'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FEFEFE'
                  e.currentTarget.style.color = '#444e55'
                  e.currentTarget.style.border = 'none'
                }}
              >
                CONFIRMAR AGENDAMENTO
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
