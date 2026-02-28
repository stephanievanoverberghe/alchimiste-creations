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
                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                    <div className="space-y-6">
                        <Badge className="max-w-max">{content.badge}</Badge>

                        <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">{content.title}</h1>

                        <p className="text-base text-text-muted sm:text-lg">{content.lead}</p>

                        <div className="flex flex-wrap gap-2">
                            {content.assurances.slice(0, 3).map((a) => (
                                <span key={a} className="rounded-full border border-border/70 bg-surface/60 px-3 py-1 text-xs font-semibold text-text-muted">
                                    {a}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Button href={siteContent.ctaPrimary.href} className="w-full sm:w-auto">
                                {siteContent.ctaPrimary.label}
                            </Button>

                            <Button href={siteContent.ctaSecondary.href} variant="secondary" className="w-full sm:w-auto">
                                {siteContent.ctaSecondary.label}
                            </Button>
                        </div>

                        <p className="flex items-center gap-2 text-xs text-text-muted">
                            <Zap className="h-4 w-4 text-accent shrink-0" />
                            <span>{content.ctaHint}</span>
                        </p>
                    </div>

                    <div className="flex justify-center lg:justify-end">
                        <div className="w-full max-w-sm sm:max-w-md">
                            <AtomBackground />
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
