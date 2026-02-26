import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AtomBackground } from '@/components/visual/atom-background';
import { siteContent } from '@/content/site';
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
                        <div className="max-w-2xl rounded-2xl border border-border/70 bg-card/70 p-3.5 backdrop-blur sm:p-4">
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
                        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <Button href={siteContent.ctaPrimary.href}>{siteContent.ctaPrimary.label}</Button>
                            <Button href={siteContent.ctaSecondary.href} variant="secondary">
                                {siteContent.ctaSecondary.label}
                            </Button>
                        </div>
                        <p className="text-xs text-text-muted">{content.ctaHint}</p>
                    </div>
                    <div className="space-y-4 md:space-y-5">
                        <AtomBackground />
                        <Card>
                            <p className="mb-5 text-sm font-medium text-text-muted">Ce que vous sécurisez tout de suite</p>
                            <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1" aria-label="Indicateurs clés">
                                {stats.map((stat) => (
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
    );
}
