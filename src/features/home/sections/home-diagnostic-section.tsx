import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/content/home';
import { cn } from '@/lib/utils';
import { CheckCircle2, Gauge, LayoutTemplate, Search, ShieldCheck, Sparkles, Target } from 'lucide-react';

type Props = {
    qualification: HomeContent['qualification'];
    proofs: HomeContent['proofs'];
};

const QUALIFICATION_ICONS = {
    target: Target,
    sparkles: Sparkles,
    gauge: Gauge,
    layout: LayoutTemplate,
    search: Search,
    shield: ShieldCheck,
} as const;

export function HomeDiagnosticSection({ qualification, proofs }: Props) {
    return (
        <Section id="diagnostic">
            <Container>
                <SectionHeading eyebrow={qualification.eyebrow} title={qualification.title} description={qualification.description} />

                <div className="mt-6 flex flex-wrap gap-2">
                    {qualification.journey.map((step, index) => (
                        <div key={step} className="qualification-journey__step" style={{ animationDelay: `${index * 90}ms` }}>
                            <span className="qualification-journey__index">0{index + 1}</span>
                            <p>{step}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-3">
                    {qualification.items.map((item, index) => {
                        const Icon = QUALIFICATION_ICONS[item.icon];

                        return (
                            <Card
                                key={item.title}
                                className="qualification-card relative overflow-hidden border-border/75 bg-linear-to-b from-surface/92 to-background/72 p-5"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="qualification-card__glow pointer-events-none absolute -right-20 top-0 h-52 w-52 rounded-full blur-xl" />

                                <div className="relative z-10 flex h-full flex-col">
                                    <div className="flex items-start gap-3">
                                        <span className="qualification-card__icon inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/65 bg-background/45">
                                            <Icon className="h-5 w-5 text-accent" />
                                        </span>
                                        <h3 className="typography-h4">{item.title}</h3>
                                    </div>

                                    <p className="mt-3 text-sm text-text-muted">{item.description}</p>

                                    <ul className="mt-4 space-y-2 text-sm text-text-muted">
                                        {item.bullets.map((bullet) => (
                                            <li key={bullet} className="qualification-card__signal flex gap-2 rounded-lg border border-border/60 bg-background/35 px-2.5 py-2">
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                                                <span className="text-pretty">{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {item.emphasis ? (
                                        <p className="mt-4 rounded-xl border border-accent/30 bg-accent/8 p-3 text-sm font-semibold text-text">{item.emphasis}</p>
                                    ) : null}
                                </div>
                            </Card>
                        );
                    })}
                </div>

                <Card className="proof-band mt-6 overflow-hidden border-border/75 bg-linear-to-r from-surface/95 via-surface/86 to-background/82 p-5">
                    <div className="proof-band__pulse" />

                    <div className="relative z-10">
                        <p className="text-xs font-semibold uppercase tracking-wide text-accent">Mini-preuve immédiate</p>

                        <div className="mt-3 -mx-2 flex gap-3 overflow-x-auto px-2 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
                            {proofs.stats.map((stat, index) => (
                                <div
                                    key={stat.label}
                                    className={cn('proof-band__item min-w-55 rounded-xl border border-border/70 bg-background/65 p-3 md:min-w-0')}
                                    style={{ animationDelay: `${index * 120}ms` }}
                                >
                                    <p className="text-lg font-semibold text-primary">{stat.value}</p>
                                    <p className="text-sm text-text-muted">{stat.label}</p>
                                    <div className="proof-band__line mt-3 h-1 rounded-full bg-linear-to-r from-primary/70 via-accent/70 to-primary/70" />
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                <p className="mt-4 text-sm font-semibold text-accent">{qualification.transitionToMethod}</p>
                <div className="mt-4">
                    <Button href="/offres" variant="secondary" className="border-border/80">
                        Voir les offres maintenant
                    </Button>
                </div>
            </Container>
        </Section>
    );
}
