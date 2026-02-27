import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AtomBackground } from '@/components/visual/atom-background';
import { siteContent } from '@/content/site';
import { ArrowUpRight, Sparkles, Zap } from 'lucide-react';
import type { HomeHero, HomeProofStat } from '@/content/home';

type HomeHeroSectionProps = {
    content: HomeHero;
    stats: HomeProofStat[];
};

export function HomeHeroSection({ content, stats }: HomeHeroSectionProps) {
    return (
        <Section>
            <Container>
                <div className="reveal-up grid gap-6 md:gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                    <div className="space-y-5 md:space-y-6">
                        <Badge>{content.badge}</Badge>
                        <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl xl:text-6xl">{content.title}</h1>
                        <p className="max-w-2xl text-pretty text-base text-text-muted sm:text-lg">{content.lead}</p>
                        <div className="relative max-w-2xl overflow-hidden rounded-2xl border border-border/70 bg-card/70 p-3.5 backdrop-blur sm:p-4">
                            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/20 blur-3xl motion-safe:animate-pulse" />
                            <p className="text-sm font-semibold text-accent">{content.highlightsTitle}</p>
                            <ul className="mt-3 space-y-2 text-sm text-text-muted" aria-label="Points clés perçus par vos prospects">
                                {content.highlights.map((highlight) => (
                                    <li key={highlight}>✓ {highlight}</li>
                                ))}
                            </ul>
                        </div>
                        <ul className="flex flex-wrap gap-2 text-xs text-text-muted" aria-label="Garanties de prise de contact">
                            {content.assurances.map((assurance) => (
                                <li key={assurance} className="rounded-full border border-border px-3 py-1">
                                    {assurance}
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap gap-2" aria-label="Besoins clients couverts">
                            {['Plus de demandes qualifiées', 'Message compris en quelques secondes', 'Site moderne qui inspire confiance'].map((need, index) => (
                                <span
                                    key={need}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/40 px-3 py-1.5 text-xs font-semibold text-text-muted transition hover:-translate-y-0.5 hover:border-accent/45 hover:text-text"
                                    style={{ animationDelay: `${index * 120}ms` }}
                                >
                                    <Sparkles className="h-3.5 w-3.5 text-accent" />
                                    {need}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <Button href={siteContent.ctaPrimary.href}>{siteContent.ctaPrimary.label}</Button>
                            <Button href={siteContent.ctaSecondary.href} variant="secondary">
                                {siteContent.ctaSecondary.label}
                            </Button>
                        </div>
                        <p className="inline-flex items-center gap-2 text-xs text-text-muted">
                            <Zap className="h-3.5 w-3.5 text-accent" />
                            {content.ctaHint}
                        </p>
                    </div>
                    <div className="space-y-4 md:space-y-5">
                        <AtomBackground />
                        <Card className="relative overflow-hidden">
                            <div aria-hidden className="pointer-events-none absolute -left-20 top-10 h-44 w-44 rounded-full bg-accent/15 blur-3xl" />
                            <p className="mb-5 text-sm font-medium text-text-muted">Ce que vous sécurisez tout de suite</p>
                            <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1" aria-label="Indicateurs clés">
                                {stats.map((stat, index) => (
                                    <li
                                        key={stat.label}
                                        className="space-y-1 rounded-xl border border-border/70 bg-background/70 p-3 transition duration-300 hover:-translate-y-1 hover:border-accent/45"
                                        style={{ animationDelay: `${index * 120}ms` }}
                                    >
                                        <p className="text-xl font-semibold text-primary">{stat.value}</p>
                                        <p className="text-sm text-text-muted">{stat.label}</p>
                                        <p className="inline-flex items-center gap-1 text-xs text-accent">
                                            Voir le résultat <ArrowUpRight className="h-3 w-3" />
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
