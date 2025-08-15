// app/layout.tsx
import type { Metadata } from 'next';
import Script from 'next/script';
import { Cormorant_Garamond, Raleway } from 'next/font/google';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import './globals.css';
import PageWrapper from '@/components/PageWrapper';
import ConsentBanner from '@/components/legal/ConsentBanner';

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-cormorant',
});

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['300', '400', '700'],
    variable: '--font-raleway',
});

export const metadata: Metadata = {
    title: {
        default: 'Alchimiste Créations — Développeuse web à Lille',
        template: '%s | Alchimiste Créations',
    },
    description:
        'Création de sites web sur mesure à Lille et à distance. Spécialiste WordPress et React/Next.js, j’accompagne artistes, thérapeutes et entrepreneurs du cœur à concevoir des sites esthétiques, performants et alignés à leur univers.',
    keywords: [
        'développeuse web Lille',
        'site vitrine WordPress',
        'site e-commerce',
        'React',
        'Next.js',
        'création site sur mesure',
        'freelance web Lille',
        'Alchimiste Créations',
    ],
    authors: [{ name: 'Stéphanie', url: 'https://alchimiste-creations.vercel.app/' }],
    metadataBase: new URL('https://alchimiste-creations.vercel.app/'),
    openGraph: {
        title: 'Alchimiste Créations — Développeuse web à Lille',
        description: 'Création de sites WordPress et React/Next.js sur mesure pour artistes, thérapeutes et entrepreneurs du cœur.',
        url: 'https://alchimiste-creations.vercel.app/',
        siteName: 'Alchimiste Créations',
        images: [
            {
                // ⚠️ Pas besoin de /public dans le chemin des images OG
                url: '/images/og-default.jpg',
                width: 1200,
                height: 630,
                alt: 'Alchimiste Créations — Développeuse web à Lille',
            },
        ],
        locale: 'fr_FR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Alchimiste Créations — Développeuse web à Lille',
        description: 'Sites WordPress et React/Next.js sur mesure, alliant esthétique, fluidité et sens.',
        images: ['/images/og-default.jpg'],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" className={`${cormorant.variable} ${raleway.variable}`}>
            <head>
                {/* (optionnel) retire ce noindex en prod */}
                <meta name="robots" content="noindex, nofollow" />

                {/* Consent Mode par défaut = denied (avant tout script analytics/ads) */}
                <Script id="consent-default" strategy="beforeInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent','default',{
              'ad_storage':'denied',
              'ad_user_data':'denied',
              'ad_personalization':'denied',
              'analytics_storage':'denied',
              'functionality_storage':'denied',
              'security_storage':'granted'
            });
          `}
                </Script>

                {/* Si tu as GA/GTM, insère leurs scripts APRÈS ce bloc */}
            </head>
            <body>
                <PageWrapper>{children}</PageWrapper>

                {/* Bannière de consentement (client) – s’affiche si pas de choix ou expiré */}
                <ConsentBanner />
            </body>
        </html>
    );
}
