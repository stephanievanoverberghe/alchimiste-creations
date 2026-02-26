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
        'Votre valeur est comprise en moins de 5 secondes par votre client idéal.',
        'Le parcours mène naturellement vers une prise de rendez-vous.',
        'Chaque section répond aux objections avant qu’elles bloquent la vente.',
    ];

    const heroAssurances = ['Audit offert (20 min)', 'Réponse sous 24h', 'Sans engagement'];

    const uxJourneySteps = [
        {
            step: '01 · Clarifier',
            title: 'Votre promesse devient évidente en 5 secondes',
            text: 'Headline orientée résultat, design lisible, hiérarchie claire: votre visiteur comprend instantanément pourquoi vous plutôt qu’un autre.',
        },
        {
            step: '02 · Rassurer',
            title: 'Vous créez la confiance avant même le premier échange',
            text: 'Preuves sociales, résultats concrets, réponses aux objections: on réduit les doutes pour augmenter l’intention de contact.',
        },
        {
            step: '03 · Convertir',
            title: 'Chaque section pousse vers une action simple',
            text: 'CTA contextualisés, micro-engagements et parcours sans friction pour transformer une visite qualifiée en demande entrante.',
        },
    ];

    return (
        <>
            <Section>
                <Container>
                    <div className="reveal-up grid gap-6 md:gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                        <div className="space-y-5 md:space-y-6">
                            <Badge>Sites web orientés conversion pour indépendants, studios et PME</Badge>
                            <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl xl:text-6xl">
                                Votre site ne doit pas juste être beau : il doit générer des demandes qualifiées.
                            </h1>
                            <p className="max-w-2xl text-pretty text-base text-text-muted sm:text-lg">
                                Je conçois des expériences web performantes pour transformer votre trafic en conversations commerciales : positionnement clair, preuves crédibles et
                                parcours pensé pour faire passer à l’action.
                            </p>
                            <div className="max-w-2xl rounded-2xl border border-border/70 bg-card/70 p-3.5 backdrop-blur sm:p-4">
                                <p className="text-sm font-semibold text-accent">Ce que votre prospect perçoit en arrivant sur votre site :</p>
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
                            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                <Button href={siteContent.ctaPrimary.href}>{siteContent.ctaPrimary.label}</Button>
                                <Button href={siteContent.ctaSecondary.href} variant="secondary">
                                    {siteContent.ctaSecondary.label}
                                </Button>
                            </div>
                            <p className="text-xs text-text-muted">Objectif de l&apos;audit : identifier 3 leviers immédiats pour augmenter vos conversions.</p>
                        </div>
                        <div className="space-y-4 md:space-y-5">
                            <AtomBackground />
                            <Card>
                                <p className="mb-5 text-sm font-medium text-text-muted">Ce que vous sécurisez tout de suite</p>
                                <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
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
                    <SectionHeading
                        eyebrow="Parcours UX"
                        title="La suite logique du Hero : un parcours qui transforme un visiteur en client."
                        description="Après le Hero, votre futur client suit une progression claire: il comprend votre valeur, il est rassuré, puis il passe à l’action."
                    />
                    <div className="grid gap-5 md:grid-cols-3">
                        {uxJourneySteps.map((step) => (
                            <Card key={step.step}>
                                <p className="text-sm font-medium text-accent">{step.step}</p>
                                <p className="mt-2 text-lg font-semibold text-balance">{step.title}</p>
                                <p className="mt-3 text-sm text-text-muted">{step.text}</p>
                            </Card>
                        ))}
                    </div>
                    <Card className="mt-6 border-primary/50 bg-primary/6">
                        <p className="text-sm font-medium text-accent">Objectif business</p>
                        <p className="mt-2 text-base font-semibold sm:text-lg">Un seul cap: guider votre prospect du « c’est intéressant » au « je veux travailler avec vous ».</p>
                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Button href={siteContent.ctaPrimary.href}>{siteContent.ctaPrimary.label}</Button>
                            <p className="text-sm text-text-muted">On transforme votre trafic actuel en opportunités concrètes.</p>
                        </div>
                    </Card>
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
