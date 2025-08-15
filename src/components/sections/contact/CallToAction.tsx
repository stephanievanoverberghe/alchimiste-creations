// components/sections/contact/CallToActionContact.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CalendarClock, Mail, ShieldCheck, Clock as ClockIcon, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';

export default function CallToActionSection({
    scheduleId = 'contact-schedule',
    email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'orangestreet@live.fr',
    note = 'Réponse sous 24–48h ouvrées — sans jargon, sans pression.',
    className,
}: {
    scheduleId?: string;
    email?: string;
    note?: string;
    className?: string;
}) {
    const mailtoHref = `mailto:${email}?subject=${encodeURIComponent('Contact — Appel découverte')}`;

    const handleScroll = useCallback<React.MouseEventHandler<HTMLAnchorElement>>(
        (e) => {
            e.preventDefault();
            const el = document.getElementById(scheduleId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                (el as HTMLElement | null)?.focus?.({ preventScroll: true });
            } else {
                // fallback au cas où la section n’existe pas (rare)
                location.hash = `#${scheduleId}`;
            }
        },
        [scheduleId]
    );

    return (
        <section id="contact-cta-final" aria-labelledby="contact-cta-final-title" className={cn('relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]', className)}>
            {/* Fond or avec opacité 10% UNIQUEMENT sur mobile */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />

            {/* Vague décorative visible uniquement à partir de md */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/home-wave.png" alt="Vague décorative" className="h-auto" fill priority />
            </div>
            <div className="relative max-w-7xl mx-auto">
                {/* Carte CTA */}
                <div className="group relative overflow-hidden rounded-[22px] border border-sauge/30 bg-background/70 p-6 md:p-10 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    {/* motif discret */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                        aria-hidden
                    />

                    {/* Contenu */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6 relative z-[1]">
                        <div>
                            <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                                <MessageSquare className="w-3.5 h-3.5" aria-hidden />
                                <span>Dernière étape</span>
                            </span>

                            <h2 id="contact-cta-final-title" className="mt-4 md:mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                                Prêt ? On cale un créneau.
                            </h2>

                            <p className="mt-3 text-base md:text-lg text-foreground/80 max-w-2xl">
                                30&nbsp;minutes pour cadrer ton besoin et la suite. Tu préfères écrire&nbsp;? Envoie-moi un email.
                            </p>

                            {/* Micro-chips de réassurance */}
                            <ul className="mt-4 flex flex-wrap items-center gap-2">
                                <li>
                                    <span className="inline-flex items-center gap-2 rounded-full border border-sauge/30 bg-sauge/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-sauge">
                                        <ClockIcon className="w-3.5 h-3.5" aria-hidden />
                                        30 min
                                    </span>
                                </li>
                                <li>
                                    <span className="inline-flex items-center gap-2 rounded-full border border-sauge/30 bg-sauge/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-sauge">
                                        <ShieldCheck className="w-3.5 h-3.5" aria-hidden />
                                        Sans pression
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Boutons */}
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 shrink-0">
                            <Link
                                href={`#${scheduleId}`}
                                onClick={handleScroll}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl
                  bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase
                  border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                                aria-label="Réserver un appel découverte"
                            >
                                <CalendarClock className="w-4 h-4" aria-hidden />
                                Réserver un appel
                            </Link>

                            <a
                                href={mailtoHref}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl
                  border border-sauge/40 bg-background hover:bg-sauge/10 text-sm font-semibold tracking-widest uppercase transition hover:scale-105"
                                aria-label="Écrire un email"
                            >
                                <Mail className="w-4 h-4" aria-hidden />
                                Écrire un email
                            </a>
                        </div>
                    </div>

                    {/* note + séparateur animé bas */}
                    <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-foreground/80 relative z-[1]">
                        <div className="inline-flex items-center gap-2 rounded-xl border border-sauge/30 bg-sauge/10 px-3 py-2">
                            <ClockIcon className="w-3.5 h-3.5 text-sauge" aria-hidden />
                            {note}
                        </div>
                    </div>

                    <div className="pointer-events-none absolute left-6 right-6 bottom-6 h-[2px] overflow-hidden">
                        <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                        <div
                            className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                            aria-hidden
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
