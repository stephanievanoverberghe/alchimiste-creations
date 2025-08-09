'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';

export default function ContactTeaserCard() {
    return (
        <Link
            href="/contact"
            className="
        group h-full flex flex-col justify-between
        overflow-hidden rounded-3xl border border-sauge/30 bg-background
        shadow-sm transition hover:-translate-y-2 hover:shadow-md
        relative
      "
        >
            {/* Header visuel minimal (même ratio que les projets) */}
            <div className="relative aspect-[4/3]">
                {/* fond texturé/teinte brand */}
                <div className="absolute inset-0 bg-gradient-to-br from-terracotta/20 via-ormat/10 to-sauge/10" />
                {/* motif discret */}
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:16px_16px] text-ormat" />
                {/* icône centrale */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-3 rounded-full border border-ormat/40 bg-background/70 px-4 py-2 backdrop-blur-sm">
                        <FontAwesomeIcon icon={faWandMagicSparkles} className="text-terracotta" />
                        <span className="text-xs tracking-[0.15em] uppercase text-terracotta font-semibold">Votre projet ici</span>
                    </div>
                </div>
                {/* dégradé bas pour cohérence */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
            </div>

            {/* Contenu */}
            <div className="p-4">
                <h3 className="font-title text-[18px] text-brun">Et si on créait le vôtre ?</h3>
                <p className="mt-1 text-sm text-foreground/70">Un site vivant, aligné, à votre image. Parlons de ce que vous voulez faire rayonner.</p>
            </div>

            {/* CTA fixé en bas (même style que les autres) */}
            <div className="p-4 pt-0 mt-auto">
                <span
                    className="
            inline-flex items-center gap-2
            text-[11px] tracking-[0.15em] uppercase text-sauge font-semibold
            bg-background border border-sauge/30 rounded-md px-3 py-1
            transition-colors group-hover:bg-sauge/10
          "
                >
                    Me contacter
                    <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                </span>
            </div>
        </Link>
    );
}
