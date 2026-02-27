import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, Check } from 'lucide-react';
import { HeroDevice } from '@/components/visual/hero-device';
import { type HomeHeroVariant, useHomeHero } from './use-home-hero';

type HomeHeroSectionProps = {
    variant: HomeHeroVariant;
};

export function HomeHeroSection({ variant }: HomeHeroSectionProps) {
    const hero = useHomeHero(variant);

    return (
        <Section id="hero">
            <Container>
                <div className="reveal-up grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
                    <div className="order-1 space-y-6">
                        <Badge>{hero.badge}</Badge>
                        <h1 className="max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">{hero.title}</h1>
                        <p className="max-w-xl text-pretty text-base text-text-muted sm:text-lg">{hero.lead}</p>

                        <ul className="max-w-lg space-y-2 text-sm text-text-muted" aria-label="Points clés du service">
                            {hero.highlights.map((highlight) => (
                                <li key={highlight} className="inline-flex items-center gap-2">
                                    <Check className="h-4 w-4 text-accent" aria-hidden />
                                    <span>{highlight}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <Button href={hero.primaryCta.href} className="min-h-12 justify-center px-6 text-sm sm:text-base">
                                {hero.primaryCta.label}
                            </Button>
                            <Button href={hero.secondaryCta.href} variant="secondary" className="min-h-12 justify-center px-6">
                                {hero.secondaryCta.label}
                            </Button>
                        </div>
                        <ul className="flex flex-wrap gap-2" aria-label="Assurances de contact">
                            {hero.assurances.map((assurance) => (
                                <li key={assurance} className="rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs font-medium text-text-muted">
                                    {assurance}
                                </li>
                            ))}
                        </ul>

                        <p className="hidden items-center gap-2 text-xs text-text-muted lg:inline-flex">
                            <ChevronDown className="h-3.5 w-3.5" aria-hidden />
                            {hero.scrollHint}
                        </p>
                    </div>
                    <div className="order-2 space-y-4">
                        <HeroDevice chips={hero.chips} stats={hero.statsPreview} variant={hero.variant} />
                        {variant === 'a' ? (
                            <div className="rounded-2xl border border-border/70 bg-card/60 p-4">
                                <p className="text-sm font-semibold text-text">Preuve rapide</p>
                                <div className="mt-3 grid grid-cols-3 gap-2">
                                    {hero.statsPreview.map((stat) => (
                                        <div key={stat.label} className="rounded-xl border border-border/60 bg-background/60 p-2 text-center">
                                            <p className="text-sm font-semibold text-primary">{stat.value}</p>
                                            <p className="text-[11px] text-text-muted">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
