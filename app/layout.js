import { Jost } from 'next/font/google';

const jost = Jost({
    subsets: ['latin'],
    weight: ['300', '500', '600', '700', '800'],
    style: ['normal', 'italic'],
});


export const metadata = {
  metadataBase: new URL('https://www.healthfirstmedicorp.com'),
  title: {
    default: 'Healthfirst Medicorp | Buy CPR Manikins & AEDs in Pune, Maharashtra',
    template: '%s | Healthfirst Medicorp',
  },
  description: 'Buy CPR manikins, AEDs, and medical training equipment online in India.',
  openGraph: {
    type: 'website',
    siteName: 'Healthfirst Medicorp',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
  },
  verification: {
  other: {
    'msvalidate.01': 'F1CBD139A85C4F73AEC243DE3353EF88',
  },
},
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Healthfirst Medicorp',
  image: 'https://www.healthfirstmedicorp.com/icon.png',
  '@id': 'https://www.healthfirstmedicorp.com',
  url: 'https://www.healthfirstmedicorp.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  areaServed: 'IN',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jost.className}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script src="https://cdn.jsdelivr.net/npm/@algolia/experiences/dist/experiences.js?appId=3R1T248WSI&apiKey=9e64a8840e36ec442d98b4d5666568a0&experienceId=3R1T248WSI&env=prod"></script>
        {children}
      </body>
    </html>
  );
}
