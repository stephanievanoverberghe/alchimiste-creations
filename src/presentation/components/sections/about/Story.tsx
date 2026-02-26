'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IdCard, Ear, HeartHandshake, Leaf, ListChecks, MessageSquareHeart } from 'lucide-react';
import { aboutStoryCopy } from '@/infrastructure/content/about-copy';

export default function StorySection() {
    const points = [
        { icon: Ear, ...aboutStoryCopy.points[0] },
        { icon: HeartHandshake, ...aboutStoryCopy.points[1] },
        { icon: Leaf, ...aboutStoryCopy.points[2] },
    ];

    return (
        <section aria-labelledby="story-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-25 xl:px-37.5 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-background via-ormat/20 to-background" />
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="" fill priority className="h-auto object-cover" />
            </div>

            <div className="relative max-w-7xl mx-auto">
                <div className="group relative overflow-hidden rounded-[22px] border border-sauge/30 bg-background/80 p-6 md:p-8 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                        aria-hidden
                    />

                    <div className="relative z-1 grid md:grid-cols-[0.6fr_1.1fr] gap-6 md:gap-10 items-center">
                        <div className="relative h-56 sm:h-64 md:h-90 lg:h-105 rounded-[18px] overflow-hidden border border-sauge/30 shadow">
                            <Image
                                src="/home/profil.jpeg"
                                alt={aboutStoryCopy.portraitAlt}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 42vw, 40vw"
                                className="object-cover object-[50%_12%] md:object-center"
                            />
                        </div>

                        <div className="text-center md:text-left">
                            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                                <IdCard className="w-3.5 h-3.5" aria-hidden />
                                {aboutStoryCopy.badge}
                            </span>

                            <h2 id="story-title" className="mt-4 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                                {aboutStoryCopy.title}
                            </h2>

                            <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed">{aboutStoryCopy.intro}</p>

                            <ul className="mt-5 grid sm:grid-cols-3 gap-3">
                                {points.map(({ icon: Icon, label, desc }) => (
                                    <li
                                        key={label}
                                        className="group/val rounded-2xl border border-sauge/30 bg-background p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                                <Icon className="w-4 h-4" aria-hidden />
                                            </span>
                                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{label}</h3>
                                        </div>

                                        <div className="mt-3 relative h-0.5 overflow-hidden">
                                            <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                            <div
                                                className="absolute inset-y-0 left-0 w-0 bg-linear-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover/val:w-full"
                                                aria-hidden
                                            />
                                        </div>

                                        <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{desc}</p>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                                >
                                    <MessageSquareHeart className="w-4 h-4" aria-hidden />
                                    {aboutStoryCopy.actions.contact}
                                </Link>

                                <Link
                                    href="/methode"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-sauge/40 bg-background hover:bg-sauge/10 text-sm font-semibold tracking-widest uppercase transition hover:scale-105"
                                >
                                    <ListChecks className="w-4 h-4" aria-hidden />
                                    {aboutStoryCopy.actions.discoverApproach}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
