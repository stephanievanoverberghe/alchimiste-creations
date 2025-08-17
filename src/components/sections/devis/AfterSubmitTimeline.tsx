// src/components/sections/devis/AfterSubmitTimeline.tsx
'use client';

import React, { type CSSProperties } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ClipboardList, MailOpen, MessageSquare, FileText, Rocket, ChevronRight } from 'lucide-react';

declare global {
    interface Window {
        dataLayer?: Array<Record<string, unknown>>;
    }
}
const pushDl = (event: string, detail?: Record<string, unknown>) => window?.dataLayer?.push(detail ? { event, ...detail } : { event });

// ——— Styles utilitaires (match avec BriefExpress)
const motifStyle: CSSProperties = {
    backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
    backgroundSize: '16px 16px',
    color: 'var(--color-ormat)',
};

export type TimelineStep = {
    title: string;
    desc: string;
    meta?: string; // ex: "24–48h"
    icon?: React.ReactNode;
};

const DEFAULT_STEPS: TimelineStep[] = [
    {
        title: 'Réception & lecture',
        desc: 'Je lis ton brief, je vérifie le périmètre et les points clés.',
        meta: 'Sous 24–48h ouvrées',
        icon: <MailOpen className="w-5 h-5" aria-hidden />,
    },
    {
        title: 'Clarifications rapides',
        desc: 'Je reviens vers toi si un éclaircissement est utile (1–2 questions max).',
        meta: 'Par email / appel court',
        icon: <MessageSquare className="w-5 h-5" aria-hidden />,
    },
    {
        title: 'Devis détaillé',
        desc: 'Tu reçois un devis clair : périmètre, étapes, délai indicatif et budget.',
        meta: 'PDF + validité 15 jours',
        icon: <FileText className="w-5 h-5" aria-hidden />,
    },
    {
        title: 'Démarrage',
        desc: 'Validation → acompte → onboarding (accès, planning, premiers livrables).',
        meta: 'Kick-off planifié',
        icon: <Rocket className="w-5 h-5" aria-hidden />,
    },
];

export function AfterSubmitTimelineSection({
    id = 'processus-apres-envoi',
    className,
    title = 'Après l’envoi : comment ça se passe',
    subtitle = 'Transparence sur les étapes jusqu’au démarrage du projet.',
    steps = DEFAULT_STEPS,
}: {
    id?: string;
    className?: string;
    title?: string;
    subtitle?: string;
    steps?: TimelineStep[];
}) {
    return (
        <section id={id} className={cn('relative py-12 md:py-20 px-6 md:px-8 lg:px-[100px] xl:px-[150px]', className)} aria-labelledby={`${id}-title`}>
            {/* Contenu */}
            <div className="relative max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/40 rounded-full px-4 py-1">
                        <ClipboardList className="w-3.5 h-3.5" aria-hidden />
                        Processus
                    </span>
                    <h2 id={`${id}-title`} className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        {title}
                    </h2>
                    <p className="mt-3 text-foreground/80">{subtitle}</p>
                </div>

                {/* Carte timeline */}
                <article className="relative overflow-hidden rounded-[22px] border border-sauge/40 bg-background p-5 md:p-6 shadow-sm">
                    <div className="pointer-events-none absolute inset-0 opacity-10" style={motifStyle} aria-hidden />
                    <ol className="relative grid gap-6 md:gap-7">
                        {steps.map((s, i) => (
                            <li key={i} className="relative pl-10">
                                {/* Ligne verticale */}
                                {i < steps.length - 1 && (
                                    <span aria-hidden className="absolute left-[19px] top-8 bottom-[-12px] w-[2px] bg-gradient-to-b from-sauge/50 to-sauge/10" />
                                )}

                                {/* Puce */}
                                <span className="absolute left-0 top-0 grid size-9 place-content-center rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    {s.icon ?? <span className="font-semibold text-xs">{i + 1}</span>}
                                </span>

                                {/* Texte */}
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="text-sm md:text-base font-semibold text-foreground">{s.title}</h3>
                                        {s.meta && (
                                            <span className="inline-flex items-center rounded-full border border-sauge/40 bg-sauge/10 px-2 py-0.5 text-[11px] text-sauge">
                                                {s.meta}
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-1 text-sm text-foreground/80">{s.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ol>

                    {/* Bandeau rassurance */}
                    <div className="mt-6 rounded-xl border border-terracotta/30 bg-terracotta/5 p-4 text-sm">
                        <p className="text-foreground/85">Objectif : réduire l’incertitude et garder un rythme pro. Tu restes informé·e à chaque étape.</p>
                    </div>

                    {/* CTA secondaire vers calendrier */}
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                        <Link
                            href="#prendre-un-creneau"
                            onClick={() => pushDl('devis_call_click', { origin: 'after_submit_timeline' })}
                            className={cn(
                                'group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl',
                                'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                                'border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]',
                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                            )}
                        >
                            Réserver un appel
                            <ChevronRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" aria-hidden />
                        </Link>
                    </div>
                </article>
            </div>
        </section>
    );
}
