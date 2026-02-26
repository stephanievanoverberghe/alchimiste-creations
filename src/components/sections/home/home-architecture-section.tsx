import Image from 'next/image';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/content/home';

import { Sparkles, ShieldCheck, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = { content: HomeContent['architecture'] };

const ICONS = {
    sparkles: Sparkles,
    shield: ShieldCheck,
    target: Target,
} as const;

const STEP_BADGE: Record<string, string> = {
    Attract: '01',
    Convince: '02',
    Convert: '03',
};

export function HomeArchitectureSection({ content }: Props) {
    return (
        <Section>
            <Container>
                <SectionHeading eyebrow={content.eyebrow} title={content.title} />

                {/* Pipeline visuel */}
                <div className="mb-6 hidden items-center gap-3 md:flex" aria-hidden="true">
                    {content.pillars.map((p, idx) => (
                        <div key={p.title} className="flex items-center gap-3">
                            <span className="rounded-full border border-border/70 bg-background/40 px-3 py-1 text-xs font-semibold text-text-muted">
                                {STEP_BADGE[p.title]} · {p.title}
                            </span>
                            {idx < content.pillars.length - 1 ? <span className="h-px w-10 bg-border/70" /> : null}
                        </div>
                    ))}
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                    {content.pillars.map((pillar) => {
                        const Icon = ICONS[pillar.icon];

                        return (
                            <Card key={pillar.title} className="relative overflow-hidden">
                                {/* glow décor */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
                                    style={{
                                        background:
                                            pillar.title === 'Attract' ? 'rgba(122,84,255,0.14)' : pillar.title === 'Convince' ? 'rgba(19,209,255,0.12)' : 'rgba(122,84,255,0.10)',
                                    }}
                                />

                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-3">
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-background/40">
                                            <Icon className="h-5 w-5 text-accent" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold tracking-wide text-text-muted">
                                                {STEP_BADGE[pillar.title]} · <span className="text-accent">{pillar.title}</span>
                                            </p>
                                            <h3 className="mt-1 text-lg font-semibold leading-snug">{pillar.headline}</h3>
                                        </div>
                                    </div>
                                </div>

                                <p className="mt-3 text-sm text-text-muted">{pillar.description}</p>

                                {pillar.image ? (
                                    <div className="mt-5 overflow-hidden rounded-2xl border border-border/70 bg-background/40 p-3">
                                        <div className="flex items-center gap-3">
                                            <Image src={pillar.image.src} alt={pillar.image.alt} width={46} height={46} />
                                            <p className="text-xs text-text-muted">
                                                <span className="font-medium text-text">Signal :</span>{' '}
                                                {pillar.title === 'Attract' ? 'Clarté immédiate' : pillar.title === 'Convince' ? 'Confiance' : 'Passage à l’action'}
                                            </p>
                                        </div>
                                    </div>
                                ) : null}

                                <ul className="mt-5 space-y-2 text-sm">
                                    {pillar.bullets.map((b) => (
                                        <li key={b} className="flex gap-2 text-text-muted">
                                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* mini footer */}
                                <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-xs text-text-muted">
                                    <span>Impact</span>
                                    <span className={cn('font-medium', pillar.title === 'Convert' ? 'text-text' : 'text-text-muted')}>
                                        {pillar.title === 'Attract' ? '↑ Attention' : pillar.title === 'Convince' ? '↑ Confiance' : '↑ Leads'}
                                    </span>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </Container>
        </Section>
    );
}
