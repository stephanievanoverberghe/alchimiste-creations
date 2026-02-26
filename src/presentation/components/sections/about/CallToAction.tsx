'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FileText, CalendarClock, Mail, Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import { aboutCallToActionCopy } from '@/infrastructure/content/about-copy';

export default function CallToActionSection({ note = aboutCallToActionCopy.note }: { note?: string }) {
    return (
        <section id="cta-contact" aria-labelledby="cta-contact-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-25 xl:px-37.5">
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />

            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/home-wave.png" alt={aboutCallToActionCopy.waveAlt} className="h-auto" fill priority />
            </div>
            <div className="relative max-w-7xl mx-auto">
                <div className="group relative overflow-hidden rounded-[22px] border border-sauge/30 bg-background/70 p-6 md:p-10 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
                            backgroundSize: '16px 16px',
                            color: 'var(--color-ormat)',
                        }}
                        aria-hidden
                    />

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6 relative z-1">
                        <div>
                            <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                                <Mail className="w-3.5 h-3.5" aria-hidden />
                                <span>{aboutCallToActionCopy.badge}</span>
                            </span>
                            <h2 id="cta-contact-title" className="mt-4 md:mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                                {aboutCallToActionCopy.title}
                            </h2>
                            <p className="mt-3 text-base md:text-lg text-foreground/80 max-w-2xl">{aboutCallToActionCopy.intro}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 shrink-0">
                            <Link
                                href="/devis"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                            >
                                <FileText className="w-4 h-4" aria-hidden />
                                {aboutCallToActionCopy.actions.quote}
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-sauge/40 bg-background hover:bg-sauge/10 text-sm font-semibold tracking-widest uppercase transition hover:scale-105"
                            >
                                <CalendarClock className="w-4 h-4" aria-hidden />
                                {aboutCallToActionCopy.actions.call}
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-foreground/80 relative z-1">
                        <div className="inline-flex items-center gap-2 rounded-xl border border-sauge/30 bg-sauge/10 px-3 py-2">
                            <Clock className="w-3.5 h-3.5 text-sauge" aria-hidden />
                            {aboutCallToActionCopy.trustItems.responseTime}
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-xl border border-terracotta/30 bg-terracotta/10 px-3 py-2">
                            <MessageSquare className="w-3.5 h-3.5 text-terracotta" aria-hidden />
                            {aboutCallToActionCopy.trustItems.noJargon}
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-xl border border-sauge/30 bg-sauge/10 px-3 py-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-sauge" aria-hidden />
                            {aboutCallToActionCopy.trustItems.privacy}
                        </div>
                    </div>

                    <div className="mt-4 md:mt-6 text-xs text-foreground/70 relative z-1">{note}</div>
                    <div className="pointer-events-none absolute left-6 right-6 bottom-6 h-0.5 overflow-hidden">
                        <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                        <div
                            className="absolute inset-y-0 left-0 w-0 bg-linear-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                            aria-hidden
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
