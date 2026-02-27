import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AtomBackground } from '@/components/visual/atom-background';
import { siteContent } from '@/content/site';
import { Zap } from 'lucide-react';
import type { HomeHero } from '@/content/home';

type HomeHeroSectionProps = {
    content: HomeHero;
};

export function HomeHeroSection({ content }: HomeHeroSectionProps) {
    return (
        <Section id="hero">
            <Container>
                <div className="reveal-up grid gap-6 md:gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                    <div className="space-y-5 md:space-y-6">
                        <Badge>{content.badge}</Badge>
                        <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl xl:text-6xl">{content.title}</h1>
                        <p className="max-w-2xl text-pretty text-base text-text-muted sm:text-lg">{content.lead}</p>
                        <p className="text-xs font-semibold text-accent">{content.assurances[0]}</p>

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
                    </div>
                </div>
            </Container>
        </Section>
    );
}
