import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade | Unhas 5 Estrelas',
  description: 'Política de privacidade e tratamento de dados pessoais da Unhas 5 Estrelas LTDA',
  robots: 'noindex',
};

export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #444f55 0%, #3B3B3A 100%)'
    }}>
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 pb-24 max-w-4xl">
        <header className="mb-12">
          <h1 className="mb-4" style={{
            color: '#FEFEFE',
            fontFamily: 'Horizon, serif',
            fontSize: 'clamp(28px, 8vw, 48px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            Política de Privacidade
          </h1>
          <p style={{
            color: '#FEFEFE',
            fontFamily: 'Garet, sans-serif',
            fontSize: 'clamp(14px, 4vw, 16px)',
            opacity: 0.8,
            lineHeight: 1.6
          }}>
            Última atualização: 27 de agosto de 2025
          </p>
        </header>
        <div className="space-y-8 prose prose-invert max-w-none">
          <section>
            <h2 style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 'clamp(18px, 5vw, 24px)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '20px',
              lineHeight: 1.3
            }}>
              1. INTRODUÇÃO
            </h2>
            <p style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 'clamp(14px, 4vw, 16px)',
              lineHeight: 1.7,
              opacity: 0.9,
              marginBottom: '16px'
            }}>
              A UNHAS 5 ESTRELAS LTDA, CNPJ 53.316.798/0001-41, está comprometida com a proteção da sua 
              privacidade e dos seus dados pessoais. Esta Política de Privacidade descreve como coletamos, 
              usamos, armazenamos e protegemos suas informações pessoais, em conformidade com a Lei Geral 
              de Proteção de Dados (LGPD - Lei 13.709/2018) e demais normas aplicáveis.
            </p>
          </section>

          <section>
            <h2 style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 'clamp(18px, 5vw, 24px)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '20px',
              lineHeight: 1.3
            }}>
              2. DADOS COLETADOS
            </h2>
            <p style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 'clamp(14px, 4vw, 16px)',
              lineHeight: 1.7,
              opacity: 0.9,
              marginBottom: '16px'
            }}>
              Coletamos as seguintes informações quando você utiliza nossos serviços:
            </p>
            <ul style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 16,
              lineHeight: 1.7,
              opacity: 0.9,
              marginBottom: '16px',
              paddingLeft: '20px'
            }}>
              <li>Nome completo</li>
              <li>Número de telefone/WhatsApp</li>
              <li>Endereço de e-mail</li>
              <li>Preferências de serviços</li>
              <li>Dados de navegação (cookies e analytics)</li>
            </ul>
          </section>

          <section>
            <h2 style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 'clamp(18px, 5vw, 24px)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '20px',
              lineHeight: 1.3
            }}>
              3. FINALIDADES DO TRATAMENTO
            </h2>
            <p style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 'clamp(14px, 4vw, 16px)',
              lineHeight: 1.7,
              opacity: 0.9,
              marginBottom: '16px'
            }}>
              Utilizamos seus dados pessoais para:
            </p>
            <ul style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 16,
              lineHeight: 1.7,
              opacity: 0.9,
              marginBottom: '16px',
              paddingLeft: '20px'
            }}>
              <li>Processar agendamentos de serviços</li>
              <li>Entrar em contato para confirmar e lembrar compromissos</li>
              <li>Enviar informações sobre nossos serviços</li>
              <li>Melhorar a experiência do usuário em nosso site</li>
              <li>Análise de dados para aprimoramento dos serviços</li>
            </ul>
          </section>

          <section>
            <h2 style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 'clamp(18px, 5vw, 24px)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '20px',
              lineHeight: 1.3
            }}>
              4. BASE LEGAL
            </h2>
            <p style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 'clamp(14px, 4vw, 16px)',
              lineHeight: 1.7,
              opacity: 0.9,
              marginBottom: '16px'
            }}>
              O tratamento dos seus dados pessoais é baseado no consentimento expresso fornecido por você 
              ao marcar a opção correspondente em nosso formulário, conforme Art. 7º, I da LGPD.
            </p>
          </section>

          <section>
            <h2 style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 'clamp(18px, 5vw, 24px)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '20px',
              lineHeight: 1.3
            }}>
              5. SEUS DIREITOS
            </h2>
            <p style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 'clamp(14px, 4vw, 16px)',
              lineHeight: 1.7,
              opacity: 0.9,
              marginBottom: '16px'
            }}>
              Você tem os seguintes direitos sobre seus dados pessoais:
            </p>
            <ul style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 16,
              lineHeight: 1.7,
              opacity: 0.9,
              marginBottom: '16px',
              paddingLeft: '20px'
            }}>
              <li>Confirmação da existência de tratamento</li>
              <li>Acesso aos dados</li>
              <li>Correção de dados incompletos ou inexatos</li>
              <li>Anonimização ou eliminação de dados desnecessários</li>
              <li>Portabilidade dos dados</li>
              <li>Eliminação dos dados tratados com consentimento</li>
              <li>Revogação do consentimento</li>
            </ul>
          </section>

          <section>
            <h2 style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 'clamp(18px, 5vw, 24px)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '20px',
              lineHeight: 1.3
            }}>
              6. CONTROLADOR DOS DADOS
            </h2>
            <div style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 16,
              lineHeight: 1.7,
              opacity: 0.9,
              marginBottom: '20px'
            }}>
              <p style={{ marginBottom: '12px' }}>
                <strong>Razão Social:</strong> UNHAS 5 ESTRELAS LTDA
              </p>
              <p style={{ marginBottom: '12px' }}>
                <strong>CNPJ:</strong> 53.316.798/0001-41
              </p>
              <p style={{ marginBottom: '12px' }}>
                <strong>Contato:</strong> +55 48 99197-0099
              </p>
              <p>
                A UNHAS 5 ESTRELAS LTDA atua como controladora dos seus dados pessoais e é responsável 
                por determinar as finalidades e os meios de tratamento dos seus dados pessoais.
              </p>
            </div>
          </section>

          <section>
            <h2 style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 'clamp(18px, 5vw, 24px)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '20px',
              lineHeight: 1.3
            }}>
              7. RETENÇÃO DOS DADOS
            </h2>
            <p style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 'clamp(14px, 4vw, 16px)',
              lineHeight: 1.7,
              opacity: 0.9,
              marginBottom: '16px'
            }}>
              Seus dados pessoais serão mantidos pelo período necessário para o cumprimento das finalidades 
              para as quais foram coletados, respeitando os prazos legais de retenção. Após esse período, 
              os dados serão eliminados ou anonimizados, salvo nos casos em que a legislação exigir a 
              conservação por prazo superior.
            </p>
          </section>

          <section>
            <h2 style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 'clamp(18px, 5vw, 24px)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '20px',
              lineHeight: 1.3
            }}>
              8. COMPARTILHAMENTO DE DADOS
            </h2>
            <p style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 'clamp(14px, 4vw, 16px)',
              lineHeight: 1.7,
              opacity: 0.9,
              marginBottom: '16px'
            }}>
              A UNHAS 5 ESTRELAS LTDA não compartilha seus dados pessoais com terceiros, exceto nas 
              seguintes hipóteses: quando necessário para o cumprimento de obrigação legal, para 
              proteção da vida ou da incolumidade física do titular ou de terceiro, para tutela da 
              saúde em procedimentos realizados por profissionais da área da saúde, ou mediante 
              seu consentimento expresso.
            </p>
          </section>

          <section>
            <h2 style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 'clamp(18px, 5vw, 24px)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '20px',
              lineHeight: 1.3
            }}>
              9. SEGURANÇA DOS DADOS
            </h2>
            <p style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 'clamp(14px, 4vw, 16px)',
              lineHeight: 1.7,
              opacity: 0.9,
              marginBottom: '16px'
            }}>
              Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais 
              contra acesso não autorizado, alteração, divulgação ou destruição não autorizada. Utilizamos 
              tecnologias de criptografia, controles de acesso e monitoramento contínuo para garantir a 
              segurança das informações.
            </p>
          </section>

          <section>
            <h2 style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 'clamp(18px, 5vw, 24px)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '20px',
              lineHeight: 1.3
            }}>
              10. ALTERAÇÕES NESTA POLÍTICA
            </h2>
            <p style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 'clamp(14px, 4vw, 16px)',
              lineHeight: 1.7,
              opacity: 0.9,
              marginBottom: '16px'
            }}>
              Esta Política de Privacidade pode ser atualizada periodicamente para refletir mudanças em 
              nossas práticas ou na legislação aplicável. Recomendamos que você revise regularmente esta 
              página para se manter informado sobre como protegemos suas informações.
            </p>
          </section>

          <section>
            <h2 style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 'clamp(18px, 5vw, 24px)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '20px',
              lineHeight: 1.3
            }}>
              11. CANAIS DE ATENDIMENTO
            </h2>
            <div style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 16,
              lineHeight: 1.7,
              opacity: 0.9,
              marginBottom: '16px'
            }}>
              <p style={{ marginBottom: '12px' }}>
                Para exercer seus direitos, esclarecer dúvidas ou fazer solicitações relacionadas ao 
                tratamento dos seus dados pessoais, entre em contato conosco através dos seguintes canais:
              </p>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                padding: '20px', 
                borderRadius: '12px',
                marginTop: '20px'
              }}>
                <p style={{ marginBottom: '8px' }}>
                  <strong>WhatsApp:</strong> <a 
                    href="https://wa.me/5548991970099"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#FEFEFE',
                      textDecoration: 'underline',
                      opacity: 0.9
                    }}
                    className="hover:opacity-100 transition-opacity"
                  >
                    +55 48 99197-0099
                  </a>
                </p>
                <p>
                  <strong>PIX:</strong> 48996737351
                </p>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-16 pt-8 border-t border-white/20">
          <div className="text-center">
            <p style={{
              color: '#FEFEFE',
              fontFamily: 'Garet, sans-serif',
              fontSize: 14,
              opacity: 0.7,
              marginBottom: '12px'
            }}>
              Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
            </p>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '20px'
            }}>
              <p style={{
                color: '#FEFEFE',
                fontFamily: 'Garet, sans-serif',
                fontSize: 14,
                marginBottom: '8px'
              }}>
                <strong>UNHAS 5 ESTRELAS LTDA</strong>
              </p>
              <p style={{
                color: '#FEFEFE',
                fontFamily: 'Garet, sans-serif',
                fontSize: 14,
                marginBottom: '8px'
              }}>
                CNPJ: 53.316.798/0001-41
              </p>
              <p style={{
                color: '#FEFEFE',
                fontFamily: 'Garet, sans-serif',
                fontSize: 14,
                marginBottom: '8px'
              }}>
                <strong>WhatsApp:</strong> <a 
                  href="https://wa.me/5548991970099"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#FEFEFE',
                    textDecoration: 'underline',
                    opacity: 0.9
                  }}
                  className="hover:opacity-100 transition-opacity"
                >
                  +55 48 99197-0099
                </a>
              </p>
            </div>
          </div>
        </footer>

        {/* Sticky bottom button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 backdrop-blur-xl border-t z-50" 
             style={{
               background: 'rgba(68, 79, 85, 0.95)',
               borderColor: 'rgba(255, 255, 255, 0.2)'
             }}>
          <div className="container mx-auto max-w-4xl">
            <a 
              href="/"
              className="block w-full text-center px-8 py-3 rounded-xl border backdrop-blur-sm transition-all hover:bg-white/10"
              style={{
                borderColor: '#FEFEFE',
                color: '#FEFEFE',
                fontFamily: 'Garet, sans-serif',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                background: 'linear-gradient(135deg, rgba(68,79,85,0.8) 0%, rgba(59,59,58,0.8) 100%)'
              }}
            >
              VOLTAR AO SITE
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
