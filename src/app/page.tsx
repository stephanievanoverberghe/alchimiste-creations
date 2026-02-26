import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { CtaStrip } from '@/components/sections/cta-strip';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { AtomBackground } from '@/components/visual/atom-background';
import { offers } from '@/content/offers';
import { projects } from '@/content/projects';
import { siteContent } from '@/content/site';

export default function HomePage() {
    const architecturePillars = [
        {
            title: 'Attract',
            text: 'Positionnement clair + branding digital qui capte l’attention en moins de 5 secondes.',
        },
        {
            title: 'Convince',
            text: 'Structure narrative et preuves sociales pour transformer une visite en intention d’achat.',
        },
        {
            title: 'Convert',
            text: 'CTA, parcours utilisateur et performance technique optimisés pour maximiser les demandes entrantes.',
        },
    ];

    const heroHighlights = [
        'Positionnement clair pour être compris en moins de 5 secondes.',
        'Parcours de conversion construit pour générer des demandes qualifiées.',
        'Stack ultra-rapide pensée pour rassurer Google… et vos prospects.',
    ];

    const heroAssurances = ['Audit offert (20 min)', 'Sans engagement', 'Roadmap actionnable en 48h'];

    return (
        <>
            <Section>
                <Container>
                    <div className="reveal-up grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                        <div className="space-y-6">
                            <Badge>Freelance front-end premium · orienté résultats business</Badge>
                            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">{siteContent.baseline}</h1>
                            <p className="max-w-2xl text-pretty text-lg text-text-muted">{siteContent.valueProposition}</p>
                            <div className="max-w-2xl rounded-2xl border border-border/70 bg-card/70 p-4 backdrop-blur">
                                <p className="text-sm font-semibold text-accent">Ce que vos prospects ressentent dès l’arrivée :</p>
                                <ul className="mt-3 space-y-2 text-sm text-text-muted">
                                    {heroHighlights.map((highlight) => (
                                        <li key={highlight}>✓ {highlight}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-wrap gap-2 text-xs text-text-muted">
                                {heroAssurances.map((assurance) => (
                                    <span key={assurance} className="rounded-full border border-border px-3 py-1">
                                        {assurance}
                                    </span>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Button href={siteContent.ctaPrimary.href}>{siteContent.ctaPrimary.label}</Button>
                                <Button href={siteContent.ctaSecondary.href} variant="secondary">
                                    {siteContent.ctaSecondary.label}
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <AtomBackground />
                            <Card>
                                <p className="mb-5 text-sm font-medium text-text-muted">Preuves immédiates</p>
                                <ul className="space-y-4">
                                    {siteContent.stats.map((stat) => (
                                        <li key={stat.label} className="space-y-1 rounded-xl border border-border/70 bg-background/70 p-3">
                                            <p className="text-xl font-semibold text-primary">{stat.value}</p>
                                            <p className="text-sm text-text-muted">{stat.label}</p>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </div>
                    </div>
                </Container>
            </Section>

            <Section>
                <Container>
                    <SectionHeading eyebrow="Architecture" title="Une architecture web pensée pour attirer, convaincre et convertir." />
                    <div className="grid gap-5 md:grid-cols-3">
                        {architecturePillars.map((pillar) => (
                            <Card key={pillar.title}>
                                <p className="text-sm font-medium text-accent">{pillar.title}</p>
                                <p className="mt-2 text-base font-semibold">{pillar.text}</p>
                            </Card>
                        ))}
                    </div>
                </Container>
            </Section>

            <Section>
                <Container>
                    <SectionHeading eyebrow="Offres" title="Des formats pensés pour décider vite et bien." />
                    <div className="grid gap-5 md:grid-cols-3">
                        {offers.map((offer) => (
                            <Card key={offer.slug} className={offer.featured ? 'border-primary/60' : ''}>
                                <p className="text-lg font-semibold">{offer.name}</p>
                                <p className="mt-2 text-sm text-text-muted">{offer.punchline}</p>
                                <p className="mt-4 text-xs text-accent">
                                    {offer.timeline} · {offer.priceFrom}
                                </p>
                            </Card>
                        ))}
                    </div>
                </Container>
            </Section>

            <Section>
                <Container>
                    <SectionHeading eyebrow="Projets" title="Des résultats concrets, pas juste un beau design." />
                    <div className="grid gap-5 md:grid-cols-3">
                        {projects.map((project) => (
                            <Card key={project.slug}>
                                <p className="text-sm text-accent">{project.sector}</p>
                                <p className="mt-2 text-lg font-semibold">{project.client}</p>
                                <p className="mt-3 text-sm text-text-muted">{project.challenge}</p>
                                <ul className="mt-4 space-y-2 text-sm">
                                    {project.outcomes.map((outcome) => (
                                        <li key={outcome}>• {outcome}</li>
                                    ))}
                                </ul>
                            </Card>
                        ))}
                    </div>
                </Container>
            </Section>

            <CtaStrip />
        </>
    );
}
