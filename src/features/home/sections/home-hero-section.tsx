import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AtomBackground } from '@/components/visual/atom-background';
import { siteContent } from '@/content/site';
import { Clock3, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import type { HomeHero } from '@/content/home';

type HomeHeroSectionProps = {
    content: HomeHero;
};

const trustHighlights = [
    { icon: Clock3, label: 'Devis sous 24h' },
    { icon: ShieldCheck, label: 'Accompagnement 1:1' },
    { icon: Sparkles, label: 'Design premium' },
] as const;

export function HomeHeroSection({ content }: HomeHeroSectionProps) {
    return (
        <Section id="hero" className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(ellipse_at_top,theme(colors.accent/.22),transparent_70%)]" />

            <Container>
                <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10">
                    <div className="order-1 lg:order-2">
                        <div className="relative mx-auto w-full max-w-104 overflow-hidden rounded-3xl border border-border/70 bg-surface/70 p-4 shadow-2xl backdrop-blur-sm sm:max-w-md sm:p-5">
                            <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-x-10 -top-16 h-40 bg-radial from-primary/10 via-transparent to-transparent blur-2xl"
                            />
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-x-10 -bottom-20 h-44 bg-radial from-accent/10 via-transparent to-transparent blur-2xl"
                            />
                            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-background/20">
                                <AtomBackground />
                            </div>
                        </div>
                    </div>

                    <div className="order-2 space-y-5 lg:order-1 lg:space-y-7">
                        <Badge className="max-w-max border border-accent/20 bg-accent/10 text-accent">{content.badge}</Badge>

                        <div className="space-y-3 lg:space-y-4">
                            <h1 className="typography-h1 text-balance">{content.title}</h1>
                            <p className="typography-body-lg max-w-2xl text-text-muted">{content.lead}</p>
                        </div>

                        <div className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-2 sm:overflow-visible sm:px-0">
                            {trustHighlights.map(({ icon: Icon, label }) => (
                                <div
                                    key={label}
                                    className="flex shrink-0 items-center gap-2 rounded-full border border-border/70 bg-surface/70 px-3 py-2 text-xs font-semibold text-text-muted sm:shrink sm:rounded-xl"
                                >
                                    <Icon className="h-3.5 w-3.5 shrink-0 text-accent" />
                                    <span className="whitespace-nowrap sm:whitespace-normal">{label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="grid gap-3 sm:flex sm:flex-row sm:items-center">
                            <Button href={siteContent.ctaPrimary.href} className="w-full shadow-lg shadow-accent/20 sm:w-auto">
                                {siteContent.ctaPrimary.label}
                            </Button>

                            <Button href={siteContent.ctaSecondary.href} variant="secondary" className="w-full border-border/80 sm:w-auto">
                                {siteContent.ctaSecondary.label}
                            </Button>
                        </div>

                        <p className="flex items-center gap-2 text-xs text-text-muted">
                            <Zap className="h-4 w-4 shrink-0 text-accent" />
                            <span>{content.ctaHint}</span>
                        </p>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
