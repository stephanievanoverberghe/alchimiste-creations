'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isSimplePage = ['/mentions-legales', '/politique-confidentialite', '/cgu', '/faq'].includes(pathname);

    // 👉 Détecter si c'est une page pack slug
    const isPackPage = pathname.startsWith('/offres/') && pathname !== '/offres';

    return (
        <div className="flex flex-col min-h-screen">
            {isSimplePage || isPackPage ? (
                <>
                    <Header />
                    <main className="flex-1">{children}</main>
                </>
            ) : (
                <>
                    <>
                        <Header />
                        <Hero />
                    </>

                    <main className="flex-1">{children}</main>
                </>
            )}
            <Footer />
        </div>
    );
}
