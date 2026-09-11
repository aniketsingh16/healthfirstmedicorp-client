import { Jost } from 'next/font/google';

const jost = Jost({
    subsets: ['latin'],
    weight: ['300', '500', '600', '700', '800'],
    style: ['normal', 'italic'],
});


export const metadata = {
  title: {
    default: 'HealthFirst Medicorp | CPR Manikins, AEDs & Medical Training Equipment in Pune, Maharashtra',
    template: '%s | HealthFirst Medicorp',
  },
  description: 'Buy CPR manikins, AEDs, and medical training equipment online in India.',
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'HealthFirst Medicorp',
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
        {children}
      </body>
    </html>
  );
}
