// components/sections/projects/TestimonialsRibbon.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Quote } from 'lucide-react';
import projectsData from '@/infrastructure/content/projects.json';

type RawProject = {
    id?: number | string;
    slug?: string;
    titre?: string;
    title?: string;
    client?: string;
    logo?: string;
    lien?: string;
    urls?: { caseStudy?: string };
    testimonials?: { quote?: string; author?: string }[];
    citationClient?: string;
};

type Props = {
    max?: number;
    speedSec?: number;
};

export default function TestimonialsRibbon({ max = 6, speedSec = 28 }: Props) {
    const RAW = Array.isArray(projectsData) ? (projectsData as RawProject[]) : [];

    // Sélection : 1ère citation par projet
    const pool = RAW.flatMap((p) => {
        const quote = p.testimonials?.[0]?.quote?.trim() || p.citationClient?.trim();
        if (!quote) return [];
        const author = p.testimonials?.[0]?.author?.trim() || p.client?.trim();
        const title = p.titre || p.title || p.slug || 'Projet';
        const link = p.lien || p.urls?.caseStudy || (p.slug ? `/projets/${p.slug}` : '#');
        return [
            {
                key: String(p.slug ?? p.id ?? title),
                quote,
                author,
                title,
                logo: p.logo,
                link,
            },
        ];
    });

    const items = pool.slice(0, Math.max(1, Math.min(max, 12)));
    if (items.length === 0) return null;

    const loop = [...items, ...items];

    return (
        <section aria-labelledby="testimonials-ribbon-title" className="relative py-12 md:py-16 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="Vague décorative" className="h-auto" fill priority />
            </div>
            {/* Titre */}
            <h2 id="testimonials-ribbon-title" className="sr-only">
                Témoignages de clients
            </h2>

            {/* Bandeau défilant */}
            <div className="group relative overflow-hidden rounded-[22px] border border-sauge/30 bg-background/70 p-5 md:p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                {/* motif discret */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                        color: 'var(--color-ormat)',
                    }}
                    aria-hidden
                />

                <ul className="marquee flex gap-4 md:gap-6 p-4 md:p-5 min-w-max hover:[animation-play-state:paused]" style={{ animationDuration: `${speedSec}s` }}>
                    {loop.map((t, i) => (
                        <li key={`${t.key}-${i}`} className="shrink-0 w-[280px] sm:w-[340px] md:w-[420px]">
                            <article className="h-full rounded-2xl border border-sauge/30 bg-background p-4 md:p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                <div className="flex items-start gap-3">
                                    {/* Logo projet (optionnel) */}
                                    {t.logo ? (
                                        <span className="inline-flex items-center justify-center w-10 h-10 min-w-10 min-h-10 rounded-full overflow-hidden border border-sauge/30 bg-background/80 shrink-0 aspect-square">
                                            <Image src={t.logo} alt="" width={40} height={40} className="w-full h-full object-contain p-1.5" />
                                        </span>
                                    ) : (
                                        <span className="grid place-content-center size-10 rounded-full border border-sauge/30 bg-background/80 text-sauge">
                                            <Quote className="w-4 h-4" aria-hidden />
                                        </span>
                                    )}

                                    {/* Quote + meta */}
                                    <div className="min-w-0">
                                        <blockquote className="text-sm md:text-[15px] leading-relaxed text-foreground/90">
                                            <span className="sr-only">Citation&nbsp;:</span>
                                            «&nbsp;{t.quote}&nbsp;»
                                        </blockquote>

                                        <div className="mt-3 flex items-center gap-2 text-xs">
                                            <Link
                                                href={t.link}
                                                className="rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 hover:bg-ormat/15 transition"
                                                aria-label={`Voir le projet ${t.title}`}
                                            >
                                                {t.title}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>

                {/* Styles d'animation*/}
                <style>{`
          .marquee {
            animation-name: marquee;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            will-change: transform;
          }
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @media (prefers-reduced-motion: reduce) {
            .marquee { animation: none; }
          }
        `}</style>
            </div>
        </section>
    );
}
