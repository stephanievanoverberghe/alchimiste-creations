import Image from 'next/image';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { cn } from '@/lib/utils';
import type { HomeContent } from '@/content/home';

import { CheckCircle2, Gauge, LayoutGrid, Search, ShieldCheck, Sparkles, Target } from 'lucide-react';

type Props = {
    content: HomeContent['qualification'];
};

const ICONS = {
    target: Target,
    sparkles: Sparkles,
    gauge: Gauge,
    layout: LayoutGrid,
    search: Search,
    shield: ShieldCheck,
} as const;

export function HomeQualificationSection({ content }: Props) {
    return (
        <Section id="qualification" className="qualification-section">
            <Container>
                <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />

                <div className="qualification-journey mb-6 grid gap-3 sm:grid-cols-3">
                    {content.journey.map((step, idx) => (
                        <div key={step} className="qualification-journey__step" style={{ animationDelay: `${120 + idx * 80}ms` }}>
                            <span className="qualification-journey__index">0{idx + 1}</span>
                            <p>{step}</p>
                        </div>
                    ))}
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                    {content.items.map((item, idx) => {
                        const Icon = ICONS[item.icon];

                        return (
                            <Card
                                key={item.title}
                                className={cn('qualification-card relative overflow-hidden', idx === 0 ? 'lg:col-span-1' : '')}
                                style={{ animationDelay: `${220 + idx * 110}ms` }}
                            >
                                <div
                                    aria-hidden="true"
                                    className="qualification-card__glow pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
                                    style={{ background: 'rgba(122, 84, 255, 0.18)' }}
                                />

                                <div className="flex items-start gap-3">
                                    <span className="qualification-card__icon inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-background/40">
                                        <Icon className="h-5 w-5 text-accent" />
                                    </span>

                                    <div className="min-w-0">
                                        <h3 className="text-base font-semibold leading-snug">{item.title}</h3>
                                        <p className="mt-2 text-sm text-text-muted">{item.description}</p>
                                    </div>
                                </div>

                                {item.image ? (
                                    <div className="qualification-card__signal mt-5 overflow-hidden rounded-2xl border border-border/70 bg-background/40 p-3">
                                        <div className="flex items-center gap-3">
                                            <Image src={item.image.src} alt={item.image.alt} width={44} height={44} />
                                            <p className="text-xs text-text-muted">
                                                <span className="font-medium text-text">Ce que vos visiteurs ressentent :</span> {item.emphasis ?? 'Clarté, confiance, action.'}
                                            </p>
                                        </div>
                                    </div>
                                ) : item.emphasis ? (
                                    <p className="mt-4 text-xs text-text-muted">
                                        <span className="font-medium text-accent">Signal clé :</span> {item.emphasis}
                                    </p>
                                ) : null}

                                <ul className="mt-5 space-y-2 text-sm">
                                    {item.bullets.map((bullet) => (
                                        <li key={bullet} className="flex gap-2 text-text-muted">
                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        );
                    })}
                </div>
            </Container>
        </Section>
    );
}
