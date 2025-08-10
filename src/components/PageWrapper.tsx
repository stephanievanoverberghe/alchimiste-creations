'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isSimplePage = ['/mentions-legales', '/politique-confidentialite', '/cgu', '/faq'].includes(pathname);

    return (
        <div className="flex min-h-screen flex-col">
            {isSimplePage ? (
                <>
                    <Header />
                    <main className="flex-1">{children}</main>
                </>
            ) : (
                <>
                    <Header />
                    <Hero />
                    <main className="flex-1">{children}</main>
                </>
            )}
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
