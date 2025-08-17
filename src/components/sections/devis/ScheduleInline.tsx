// src/components/sections/devis/ScheduleInline.tsx
'use client';

import React, { type CSSProperties, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import CalendlyGate from '@/components/integrations/CalendlyGate';
import { Calendar, ChevronRight } from 'lucide-react';

declare global {
    interface Window {
        dataLayer?: Array<Record<string, unknown>>;
    }
}

const motifStyle: CSSProperties = {
    backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
    backgroundSize: '16px 16px',
    color: 'var(--color-ormat)',
};

// URL par défaut (même que sur la page Contact)
const DEFAULT_CALENDLY_URL = 'https://calendly.com/alchimiste-creations/appel-decouverte?hide_event_type_details=1';

export default function ScheduleInlineSection({
    id = 'prendre-un-creneau',
    className,
    name,
    email,
    source = 'devis',
    calendlyUrl,
}: {
    id?: string;
    className?: string;
    name?: string;
    email?: string;
    source?: string;
    calendlyUrl?: string; // optionnel: permet d'override si besoin
}) {
    // Priorité: prop -> env -> fallback par défaut
    const finalUrl = useMemo(() => {
        const fromProp = calendlyUrl && calendlyUrl.startsWith('http') ? calendlyUrl : '';
        const fromEnv = (process.env.NEXT_PUBLIC_CALENDLY_URL || '').startsWith('http') ? (process.env.NEXT_PUBLIC_CALENDLY_URL as string) : '';
        return fromProp || fromEnv || DEFAULT_CALENDLY_URL;
    }, [calendlyUrl]);

    return (
        <section id={id} className={cn('relative py-12 md:py-20 px-6 md:px-8 lg:px-[100px] xl:px-[150px]', className)} aria-labelledby={`${id}-title`}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background pointer-events-none" aria-hidden />
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0 pointer-events-none" aria-hidden />
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0 pointer-events-none" aria-hidden>
                <Image src="/deco/about-wave.png" alt="" role="presentation" fill priority className="object-cover" sizes="100vw" />
            </div>
            <div className="relative max-w-7xl mx-auto space-y-8">
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/40 rounded-full px-4 py-1">
                        <Calendar className="w-3.5 h-3.5" aria-hidden />
                        Prendre un créneau
                    </span>
                    <h2 id={`${id}-title`} className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Un échange rapide pour finaliser
                    </h2>
                    <p className="mt-3 text-foreground/80">20-30 min pour valider le périmètre et repartir avec un devis clair.</p>
                </div>

                <article className="relative overflow-hidden rounded-[22px] border border-sauge/40 bg-background p-5 md:p-6 shadow-sm">
                    <div className="pointer-events-none absolute inset-0 opacity-10" style={motifStyle} aria-hidden />
                    {/* Même logique que la page Contact : CalendlyGate s'occupe du consent + fallback onglet */}
                    <CalendlyGate url={finalUrl} name={name} email={email} source={source} className="relative" />
                </article>

                {/* CTAs secondaires */}
                <div className="flex flex-wrap items-center gap-3">
                    <Link
                        href="#brief-express"
                        className={cn(
                            'group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl',
                            'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                            'border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                        )}
                    >
                        Remplir le brief express
                        <ChevronRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" aria-hidden />
                    </Link>
                </div>
            </div>
        </section>
    );
}
