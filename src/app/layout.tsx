import Script from 'next/script';
import type { Metadata } from 'next';
import { Cormorant_Garamond, Raleway } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import BackgroundImageWrapper from '@/components/BackgroundImageWrapper';

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
                <Script src="https://kit.fontawesome.com/e5228146fd.js" crossOrigin="anonymous" strategy="beforeInteractive" />

                {/* ✅ ENVELOPPE CLIENT QUI GÈRE L’IMAGE */}
                <BackgroundImageWrapper>
                    <Header />
                    <main className="flex flex-col items-center justify-center h-[calc(100vh-72px)]">{children}</main>
                </BackgroundImageWrapper>
            </body>
        </html>
    );
}
