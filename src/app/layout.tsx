import './globals.css'
import { defaultSEO } from '@/utils/seo'
import Script from 'next/script'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://gomanic.com.br'),
  title: defaultSEO.title,
  description: defaultSEO.description,
  keywords: defaultSEO.keywords,
  openGraph: {
    title: defaultSEO.title,
    description: defaultSEO.description,
    url: defaultSEO.canonical,
    siteName: 'Gomanic Brasil',
    images: [
      {
        url: defaultSEO.ogImage!,
        width: 1200,
        height: 630,
        alt: 'Gomanic Brasil - Manicure pela Metade do Preço',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: defaultSEO.twitterCard as any,
    title: defaultSEO.title,
    description: defaultSEO.description,
    images: [defaultSEO.ogImage!],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: defaultSEO.canonical,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const GA_ID = process.env.GOOGLE_ANALYTICS_ID;
  
  return (
    <html lang="pt-BR">
      <head>
        <link 
          rel="preload" 
          href="/fonts/horizon.otf" 
          as="font" 
          type="font/otf" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preload" 
          href="/fonts/Garet-Book.otf" 
          as="font" 
          type="font/otf" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preload" 
          href="/fonts/Garet-Heavy.otf" 
          as="font" 
          type="font/otf" 
          crossOrigin="anonymous"
        />
        
        <link rel="icon" type="image/x-icon" href="/icons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#444f55" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Gomanic" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BeautySalon",
              "name": "Gomanic Brasil",
              "description": "Serviços de manicure profissional com especialistas certificados",
              "url": process.env.NEXT_PUBLIC_SITE_URL
            }),
          }}
        />
      </head>
      <body>
        {children}
        
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.FACEBOOK_PIXEL_ID || ''}');
            fbq('track', 'PageView');
          `}
        </Script>
      </body>
    </html>
  )
}
