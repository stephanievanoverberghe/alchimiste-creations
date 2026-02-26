import Script from 'next/script';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Rocket } from 'lucide-react';
import { getSiteViewModel } from '@/application/site/use-cases/getSiteViewModel';
import { CtaBand } from '@/presentation/sections/shared/CtaBrand';
import { PageHero } from '@/presentation/sections/marketing/PageHero';
import { OfferCard } from '@/presentation/ui/cards/OfferCard';
import { Section } from '@/presentation/ui/primitives/Section';

const trustHighlights = [
    { value: '48h', label: 'pour un retour clair sur votre demande' },
    { value: '100%', label: 'site responsive, pensé mobile-first' },
    { value: '4 étapes', label: 'pour passer de l’idée au lancement' },
];

const approachPillars = [
    {
        icon: Sparkles,
        title: 'Direction visuelle premium',
        text: 'Une identité éditoriale et graphique cohérente pour vous rendre immédiatement mémorable.',
    },
    {
        icon: ShieldCheck,
        title: 'Expérience rassurante',
        text: 'Parcours clair, contenus lisibles, signaux de confiance visibles pour déclencher la prise de contact.',
    },
    {
        icon: Rocket,
        title: 'Performance web',
        text: 'Un site rapide, accessible et propre techniquement pour soutenir votre image sur la durée.',
    },
];

export function HomePage() {
    const { site, packs, projects, featuredFaq } = getSiteViewModel();

    const ld = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Alchimiste Créations',
        jobTitle: 'Développeuse Front-end & Product Designer',
        areaServed: ['Lille', 'Hauts-de-France', 'Remote'],
        knowsAbout: ['Next.js', 'UX/UI', 'Accessibilité', 'Performance web'],
        url: 'https://alchimiste-creations.vercel.app',
    };

    return (
        <>
            <Script id="person-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
            <PageHero {...site.home.hero} primary={site.home.hero.cta.primary} secondary={site.home.hero.cta.secondary} />

            <Section className="-mt-8">
                <div className="rounded-3xl border border-sauge/40 bg-gradient-to-b from-white to-sauge/15 p-6 shadow-[0_12px_45px_rgba(27,10,0,0.06)] md:p-8">
                    <p className="text-sm uppercase tracking-[0.16em] text-terracotta">Ce que vous gagnez dès la refonte</p>
                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                        {trustHighlights.map((item) => (
                            <article key={item.label} className="rounded-2xl border border-sauge/40 bg-white/85 p-5">
                                <p className="text-3xl font-semibold text-terracotta">{item.value}</p>
                                <p className="mt-2 text-sm text-foreground/80">{item.label}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </Section>

            <Section>
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm uppercase tracking-[0.16em] text-terracotta">Sprint 1 — Positionnement + impact visuel</p>
                    <h2 className="mt-3 text-4xl md:text-5xl">On transforme votre site en vitrine crédible qui attire les bons projets.</h2>
                </div>
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {approachPillars.map((pillar) => {
                        const Icon = pillar.icon;
                        return (
                            <article key={pillar.title} className="rounded-3xl border border-terracotta/20 bg-white/80 p-6 shadow-[0_8px_30px_rgba(27,10,0,0.05)]">
                                <div className="inline-flex rounded-2xl border border-terracotta/25 bg-terracotta/10 p-2 text-terracotta">
                                    <Icon size={20} aria-hidden="true" />
                                </div>
                                <h3 className="mt-4 text-2xl">{pillar.title}</h3>
                                <p className="mt-2 text-foreground/80">{pillar.text}</p>
                            </article>
                        );
                    })}
                </div>
            </Section>

            <Section>
                <h2 className="text-4xl">Vous reconnaissez l’une de ces situations ?</h2>
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {site.home.problems.map((problem) => (
                        <article key={problem.title} className="rounded-3xl border border-sauge/35 bg-white/60 p-5">
                            <h3 className="text-2xl">{problem.title}</h3>
                            <p className="mt-2 text-foreground/80">{problem.text}</p>
                        </article>
                    ))}
                </div>
            </Section>

            <Section tone="dark">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-sm uppercase tracking-[0.16em] text-ormat">Preuves</p>
                        <h2 className="mt-2 text-4xl">Des résultats visibles, pas juste un beau visuel.</h2>
                    </div>
                    <Link href="/projets" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-ormat transition hover:text-white">
                        Voir les études de cas <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                </div>
                <div className="mt-8 grid gap-4 lg:grid-cols-2">
                    {projects.slice(0, 2).map((project) => (
                        <article key={project.slug} className="rounded-3xl border border-white/15 bg-white/[0.03] p-6 backdrop-blur-sm">
                            <p className="text-xs uppercase tracking-[0.12em] text-white/70">{project.sector}</p>
                            <h3 className="mt-2 text-3xl">{project.name}</h3>
                            <p className="mt-3 text-white/80">{project.outcome}</p>
                        </article>
                    ))}
                </div>
            </Section>

            <Section tone="accent">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <h2 className="text-4xl">Les offres</h2>
                    <p className="max-w-xl text-foreground/80">Trois formats pour avancer au bon rythme, avec le même niveau d’exigence UX/UI.</p>
                </div>
                <div className="mt-8 grid gap-4 lg:grid-cols-3">
                    {packs.map((pack) => (
                        <OfferCard
                            key={pack.slug}
                            name={pack.title}
                            target={pack.idealFor}
                            priceFrom={pack.priceFrom}
                            timeline={pack.timeline}
                            highlights={pack.highlights}
                            href={pack.ctaHref}
                            featured={pack.featured}
                        />
                    ))}
                </div>
            </Section>

            <Section>
                <h2 className="text-4xl">Méthode en 4 étapes</h2>
                <ol className="mt-8 grid gap-4 md:grid-cols-2">
                    {site.home.process.map((step) => (
                        <li key={step.title} className="rounded-3xl border border-terracotta/30 bg-white/65 p-5">
                            <h3 className="text-2xl">{step.title}</h3>
                            <p className="mt-2 text-foreground/80">{step.text}</p>
                        </li>
                    ))}
                </ol>
            </Section>

            <Section>
                <h2 className="text-4xl">FAQ rapide</h2>
                <div className="mt-8 space-y-3">
                    {featuredFaq.map((item) => (
                        <details key={item.id} className="rounded-2xl border border-sauge/35 bg-white/60 p-4 open:bg-sauge/10">
                            <summary className="cursor-pointer font-semibold">{item.question}</summary>
                            <p className="mt-2 text-foreground/80">{item.answer}</p>
                        </details>
                    ))}
                </div>
            </Section>

            <CtaBand title={site.home.finalCtaTitle} body={site.home.finalCtaBody} />
        </>
    );
}
