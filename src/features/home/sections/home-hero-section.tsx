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
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(ellipse_at_top,theme(colors.accent/.2),transparent_70%)]" />

            <Container>
                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                    <div className="space-y-7">
                        <Badge className="max-w-max border border-accent/20 bg-accent/10 text-accent">{content.badge}</Badge>

                        <div className="space-y-4">
                            <h1 className="typography-h1 text-balance">{content.title}</h1>
                            <p className="typography-body-lg max-w-2xl text-text-muted">{content.lead}</p>
                        </div>

                        <div className="grid gap-2 sm:grid-cols-3">
                            {trustHighlights.map(({ icon: Icon, label }) => (
                                <div key={label} className="flex items-center gap-2 rounded-xl border border-border/70 bg-surface/70 px-3 py-2 text-xs font-medium text-text-muted">
                                    <Icon className="h-3.5 w-3.5 shrink-0 text-accent" />
                                    <span>{label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
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

                    <div className="flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-sm rounded-3xl border border-border/70 bg-surface/75 p-4 shadow-2xl backdrop-blur-sm sm:max-w-md">
                            <AtomBackground />
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
