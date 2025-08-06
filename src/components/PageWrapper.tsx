'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Hero from './Hero';
import BackgroundImageWrapper from './BackgroundImageWrapper';
import Footer from './Footer';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isSimplePage = ['/mentions-legales', '/politique-confidentialite', '/cgu', '/faq'].includes(pathname);

    return (
        <div className="flex flex-col min-h-screen">
            {isSimplePage ? (
                <>
                    <Header />
                    <main className="flex-1 flex justify-center items-center text-base lg:text-5xl">{children}</main>
                </>
            ) : (
                <>
                    <BackgroundImageWrapper>
                        <Header />
                        <Hero />
                    </BackgroundImageWrapper>
                    <main className="flex-1">{children}</main>
                </>
            )}
            <Footer />
        </div>
    );
}
