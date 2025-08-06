import Script from 'next/script';
import type { Metadata } from 'next';
import { Cormorant_Garamond, Raleway } from 'next/font/google';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import './globals.css';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BackgroundImageWrapper from '@/components/BackgroundImageWrapper';
import Footer from '@/components/Footer';

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
            <body className="min-h-screen">
                <BackgroundImageWrapper>
                    <Header />
                    <Hero />
                </BackgroundImageWrapper>
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
