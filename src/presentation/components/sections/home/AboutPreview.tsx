'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IdCard, CalendarDays, MessageSquare, ClipboardCheck, User } from 'lucide-react';
import { getHomeAboutPreviewContent } from '@/application/home';

const content = getHomeAboutPreviewContent();

const highlightIcons = [CalendarDays, MessageSquare, ClipboardCheck] as const;

export default function AboutPreviewSection() {
    return (
        <section aria-labelledby="about-title" className="relative overflow-x-hidden py-16 md:py-28 px-6 md:px-8 lg:px-25 xl:px-37.5">
            <div className="relative max-w-7xl mx-auto">
                <div className="group relative overflow-hidden rounded-[28px] border border-sauge/30 bg-background shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <div className="md:grid md:grid-cols-[0.5fr_1.1fr] text-center md:text-left">
                        <div className="relative h-56 sm:h-72 md:h-full md:min-h-90 lg:min-h-105">
                            <Image
                                src="/home/profil.jpeg"
                                alt={content.imageAlt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 40vw"
                                className="object-cover object-[50%_12%] md:object-center"
                                priority
                            />
                        </div>

                        <div className="relative p-6 md:p-8">
                            <div
                                className="pointer-events-none absolute inset-0 opacity-10"
                                style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                                aria-hidden
                            />

                            <span className="relative z-1 inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                                <IdCard className="w-3.5 h-3.5" aria-hidden />
                                {content.badge}
                            </span>

                            <h2 id="about-title" className="relative z-1 mt-5 text-terracotta font-title text-2xl md:text-3xl lg:text-4xl font-bold tracking-widest leading-tight">
                                {content.title}
                            </h2>

                            <div className="relative z-1 mt-3 h-0.5 overflow-hidden">
                                <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                <div
                                    className="absolute inset-y-0 left-0 w-0 bg-linear-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                    aria-hidden
                                />
                            </div>

                            <p className="relative z-1 mt-4 text-base md:text-lg text-foreground/80 leading-relaxed">
                                {content.introBeforeEmphasis} {content.introEmphasis.length > 0 ? <em>{content.introEmphasis}</em> : null}
                                {content.introAfterEmphasis}
                            </p>

                            <ul className="relative z-1 mt-5 grid sm:grid-cols-3 gap-2.5">
                                {content.highlights.map((highlight, index) => {
                                    const Icon = highlightIcons[index];

                                    return (
                                        <li
                                            key={highlight}
                                            className="inline-flex items-center gap-2 rounded-xl border border-sauge/30 bg-sauge/10 text-foreground/85 px-3 py-2 text-sm"
                                        >
                                            <Icon className="w-4 h-4 text-sauge" aria-hidden />
                                            {highlight}
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className="relative z-1 mt-6 md:text-end">
                                <Link
                                    href="/me-decouvrir"
                                    className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                                >
                                    <User className="w-4 h-4" aria-hidden />
                                    {content.cta}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
