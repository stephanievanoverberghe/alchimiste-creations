import Script from 'next/script';
import { getSiteViewModel } from '@/application/site/use-cases/getSiteViewModel';
import { CtaBand } from '@/presentation/sections/shared/CtaBrand';
import { PageHero } from '@/presentation/sections/marketing/PageHero';
import { OfferCard } from '@/presentation/ui/cards/OfferCard';
import { Section } from '@/presentation/ui/primitives/Section';

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

            <Section>
                <h2 className="text-4xl">Vous reconnaissez l’une de ces situations ?</h2>
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {site.home.problems.map((problem) => (
                        <article key={problem.title} className="rounded-2xl border border-sauge/35 bg-white/60 p-5">
                            <h3 className="text-2xl">{problem.title}</h3>
                            <p className="mt-2 text-foreground/80">{problem.text}</p>
                        </article>
                    ))}
                </div>
            </Section>

            <Section tone="accent">
                <h2 className="text-4xl">Les offres</h2>
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
                        <li key={step.title} className="rounded-2xl border border-terracotta/30 p-5">
                            <h3 className="text-2xl">{step.title}</h3>
                            <p className="mt-2 text-foreground/80">{step.text}</p>
                        </li>
                    ))}
                </ol>
            </Section>

            <Section tone="dark">
                <h2 className="text-4xl">Preuves</h2>
                <div className="mt-8 grid gap-4 lg:grid-cols-2">
                    {projects.slice(0, 2).map((project) => (
                        <article key={project.slug} className="rounded-2xl border border-white/15 p-6">
                            <p className="text-xs uppercase tracking-[0.12em] text-white/70">{project.sector}</p>
                            <h3 className="mt-2 text-3xl">{project.name}</h3>
                            <p className="mt-3 text-white/80">{project.outcome}</p>
                        </article>
                    ))}
                </div>
            </Section>

            <Section>
                <h2 className="text-4xl">FAQ rapide</h2>
                <div className="mt-8 space-y-3">
                    {featuredFaq.map((item) => (
                        <details key={item.id} className="rounded-2xl border border-sauge/35 p-4 open:bg-sauge/10">
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
