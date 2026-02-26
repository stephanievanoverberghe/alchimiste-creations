import type { Metadata } from 'next';
import Script from 'next/script';
import { Cormorant_Garamond, Raleway } from 'next/font/google';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import Header from '@/presentation/components/Header';
import Footer from '@/presentation/components/Footer';
import ConsentBanner from '@/presentation/components/legal/ConsentBanner';
import './globals.css';

config.autoAddCss = false;

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-cormorant' });
const raleway = Raleway({ subsets: ['latin'], weight: ['300', '400', '700'], variable: '--font-raleway' });

export const metadata: Metadata = {
    title: { default: 'Alchimiste Créations — Studio web premium', template: '%s | Alchimiste Créations' },
    description: 'Refonte et création de sites web premium pour thérapeutes, artistes et indépendants sensibles.',
    metadataBase: new URL('https://alchimiste-creations.vercel.app/'),
    openGraph: {
        title: 'Alchimiste Créations — Studio web premium',
        description: 'Sites clairs, vivants et rassurants pour attirer les bons clients.',
        url: 'https://alchimiste-creations.vercel.app/',
        siteName: 'Alchimiste Créations',
        images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: 'Alchimiste Créations' }],
        locale: 'fr_FR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Alchimiste Créations — Studio web premium',
        description: 'Sites clairs, vivants et rassurants pour attirer les bons clients.',
        images: ['/images/og-default.png'],
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="fr" className={`${cormorant.variable} ${raleway.variable}`}>
            <head>
                <Script id="consent-default" strategy="beforeInteractive">
                    {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'denied','functionality_storage':'denied','security_storage':'granted'});`}
                </Script>
            </head>
            <body>
                <a href="#main-content" className="skip-link">
                    Aller au contenu
                </a>
                <Header />
                <main id="main-content" className="flex-1">
                    {children}
                </main>
                <Footer />
                <ConsentBanner />
            </body>
        </html>
    );
}
