'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ReactNode } from 'react';

export default function BackgroundImageWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    const imageMap: Record<string, string> = {
        '/': '/hero/hero-accueil.png',
        '/a-propos': '/hero/hero-apropos.png',
        '/contact': '/hero/hero-contact.png',
        '/methode': '/hero/hero-methode.png',
        '/offres': '/hero/hero-packs.png',
        '/projets': '/hero/hero-projets.png',
    };

    const backgroundImage = imageMap[pathname] || '/hero/hero-accueil.png';

    return (
        <div className="relative h-screen w-full text-background bg-foreground overflow-hidden">
            <Image src={backgroundImage} alt="Image de fond" fill priority className="object-cover z-0" />
            <div className="absolute inset-0 bg-foreground/70 z-10" />
            <div className="relative z-20">{children}</div>

            {/* Bandes décoratives latérales visibles à partir de lg */}
            <div className="hidden lg:block absolute top-56 left-0 z-10">
                <Image src="/deco/left-band.png" alt="Décoration gauche" width={100} height={1000} className="object-cover" />
            </div>

            <div className="hidden lg:block absolute top-0 right-0 z-10">
                <Image src="/deco/right-band.png" alt="Décoration droite" width={80} height={300} className="object-cover" />
            </div>
        </div>
    );
}
