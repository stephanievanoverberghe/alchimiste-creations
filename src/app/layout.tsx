import type { Metadata } from 'next';
import { Cormorant_Garamond, Raleway } from 'next/font/google';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import './globals.css';
import PageWrapper from '@/components/PageWrapper';

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
    title: 'Alchimiste Créations',
    description: 'Transformer vos idées en expériences digitales vivantes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" className={`${cormorant.variable} ${raleway.variable}`}>
            <head>
                <meta name="robots" content="noindex, nofollow" />
            </head>
            <body className="min-h-screen">
                <PageWrapper>{children}</PageWrapper>
            </body>
        </html>
    );
}
