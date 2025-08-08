'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function VisionSection() {
    return (
        <section className="relative py-10 md:py-28 px-6 md:px-12 lg:px-[100px] xl:px-[150px]">
            <div className="relative z-10 text-foreground">
                <h2 className="text-center lg:text-start text-2xl lg:text-4xl font-semibold tracking-widest text-terracotta mb-5 md:mb-10">Ma vision du web</h2>
                <p className="text-sm md:text-base text-center lg:text-start">
                    Je crois que chaque être humain a quelque chose d’unique à offrir, et que le digital peut devenir le miroir vivant de cette essence. Pour moi, créer un site
                    web, c’est unir intuition et code, forme et fond, pour que ton activité rayonne.
                </p>
                <p className="mt-4 mb-5 md:mb-10 text-sm md:text-base text-center lg:text-start">
                    Basée près de Lille, je travaille avec des clients partout en France et à distance.
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 text-center justify-center md:justify-start">
                    <Link
                        href="/methode"
                        className={cn(
                            'px-6 py-3 rounded-2xl bg-terracotta hover:bg-terracotta/90 cursor-pointer text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                        )}
                    >
                        Découvrir ma méthode de travail
                    </Link>

                    <Link
                        href="/projets"
                        className={cn(
                            'px-6 py-3 rounded-2xl bg-ormat hover:bg-ormat/90 cursor-pointer text-foreground text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-foreground transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                        )}
                    >
                        Voir des projets réalisés
                    </Link>
                </div>
            </div>
        </section>
    );
}
