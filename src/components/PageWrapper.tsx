'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isSimplePage = ['/mentions-legales', '/politique-confidentialite', '/cgu', '/faq'].includes(pathname);
    const isPackPage = pathname.startsWith('/offres/') && pathname !== '/offres';

    return (
        <div className="flex min-h-screen flex-col">
            {isSimplePage || isPackPage ? (
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
            {/* Footer collé en bas s'il n'y a pas assez de contenu */}
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
