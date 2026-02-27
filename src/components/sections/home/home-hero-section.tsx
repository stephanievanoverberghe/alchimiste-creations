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
        <Section id="hero" className="relative overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 opacity-[0.7]">
                    <AtomBackground />
                </div>
                <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
                <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-accent/18 blur-3xl" />
                <div className="absolute bottom-32 left-1/3 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
                <div
                    className="absolute inset-0 opacity-[0.25]"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)',
                        backgroundSize: '22px 22px',
                    }}
                />
                <div className="absolute inset-0 bg-linear-to-b from-background/10 via-background/55 to-background" />
            </div>

            <Container className="relative">
                <div className="reveal-up grid gap-8 py-10  lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <Badge className="border-border/60 bg-background/60 backdrop-blur">{content.badge}</Badge>
                            <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl xl:text-6xl">{content.title}</h1>
                            <p className="max-w-2xl text-pretty text-base text-text-muted sm:text-lg">{content.lead}</p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Button href={siteContent.ctaPrimary.href} className="h-11 px-5 text-sm sm:text-base shadow-sm">
                                {siteContent.ctaPrimary.label}
                            </Button>

                            <Button href={siteContent.ctaSecondary.href} variant="secondary" className="h-11 px-5 text-sm sm:text-base">
                                {siteContent.ctaSecondary.label}
                            </Button>

                            <span className="mt-1 inline-flex items-center gap-2 text-xs text-text-muted sm:mt-0">
                                <Zap className="h-3.5 w-3.5 text-accent" />
                                {content.ctaHint}
                            </span>
                        </div>

                        <div className="relative max-w-2xl overflow-hidden rounded-2xl border border-border/60 bg-background/55 p-4 backdrop-blur md:p-5">
                            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/20 blur-3xl motion-safe:animate-pulse" />
                            <div aria-hidden className="pointer-events-none absolute -left-16 bottom-12 h-40 w-40 rounded-full bg-accent/12 blur-3xl" />

                            <p className="text-sm font-semibold text-accent">{content.highlightsTitle}</p>

                            <ul className="mt-3 space-y-2 text-sm text-text-muted" aria-label="Points clés perçus par vos prospects">
                                {content.highlights.map((highlight) => (
                                    <li key={highlight} className="flex gap-2">
                                        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-border/60 bg-background/60 text-xs text-accent">
                                            ✓
                                        </span>
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <ul className="flex flex-wrap gap-2 text-xs text-text-muted" aria-label="Garanties de prise de contact">
                                {content.assurances.map((assurance) => (
                                    <li key={assurance} className="rounded-full border border-border/60 bg-background/50 px-3 py-1 backdrop-blur">
                                        {assurance}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-2" aria-label="Besoins clients couverts">
                                {['Plus de demandes qualifiées', 'Message compris en quelques secondes', 'Site moderne qui inspire confiance'].map((need, index) => (
                                    <span
                                        key={need}
                                        className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/45 px-3 py-1.5 text-xs font-semibold text-text-muted transition hover:-translate-y-0.5 hover:border-accent/45 hover:text-text"
                                        style={{ animationDelay: `${index * 120}ms` }}
                                    >
                                        <Sparkles className="h-3.5 w-3.5 text-accent" />
                                        {need}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 lg:pt-2">
                        <Card className="relative overflow-hidden border-border/60 bg-background/55 backdrop-blur">
                            <div aria-hidden className="pointer-events-none absolute -left-20 top-10 h-52 w-52 rounded-full bg-accent/14 blur-3xl" />
                            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/18 blur-3xl" />

                            <div className="p-5">
                                <p className="mb-4 text-sm font-medium text-text-muted">Ce que vous sécurisez tout de suite</p>

                                <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1" aria-label="Indicateurs clés">
                                    {stats.map((stat, index) => (
                                        <li
                                            key={stat.label}
                                            className="group space-y-1 rounded-xl border border-border/60 bg-background/55 p-3 transition duration-300 hover:-translate-y-1 hover:border-accent/45"
                                            style={{ animationDelay: `${index * 120}ms` }}
                                        >
                                            <p className="text-2xl font-semibold text-primary">{stat.value}</p>
                                            <p className="text-sm text-text-muted">{stat.label}</p>
                                            <p className="inline-flex items-center gap-1 text-xs text-accent opacity-90 group-hover:opacity-100">
                                                Voir le résultat <ArrowUpRight className="h-3 w-3" />
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Card>

                        <div className="rounded-2xl border border-border/60 bg-background/45 p-4 text-sm text-text-muted backdrop-blur">
                            <p className="font-medium text-text">Objectif :</p>
                            <p className="mt-1">un site qui se comprend vite, rassure, et déclenche des messages (pas juste “joli”).</p>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
