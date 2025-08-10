'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';

export default function ContactTeaserCard() {
    return (
        <Link
            href="/contact"
            className="
        group relative flex h-full flex-col overflow-hidden
        rounded-3xl border border-sauge/30 bg-background/70 shadow-sm
        transition-all hover:-translate-y-1.5 hover:shadow-md
      "
        >
            {/* Header visuel */}
            <div className="relative aspect-[16/10]">
                <div className="absolute inset-0 bg-gradient-to-br from-terracotta/20 via-ormat/10 to-sauge/10" />
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:16px_16px] text-ormat" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-3 rounded-full border border-ormat/40 bg-background/70 px-4 py-2 backdrop-blur-sm">
                        <FontAwesomeIcon icon={faWandMagicSparkles} className="text-terracotta" />
                        <span className="text-xs tracking-[0.15em] uppercase text-terracotta font-semibold">Ton projet ici</span>
                    </div>
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-transparent" />
            </div>

            {/* Contenu */}
            <div className="p-4">
                <h3 className="text-sm md:text-base font-semibold text-foreground/90">Et si on créait le tien ?</h3>
                <p className="mt-1 mb-4 text-xs md:text-sm text-foreground/70">Un site vivant, aligné, à ton image. Parlons de ce que tu veux faire rayonner.</p>
            </div>

            {/* Ligne animée FIXÉE tout en bas */}
            <div className="pointer-events-none absolute left-4 right-4 bottom-4 h-[2px] overflow-hidden">
                <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                <div
                    className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                    aria-hidden
                />
            </div>
        </Link>
    );
}
