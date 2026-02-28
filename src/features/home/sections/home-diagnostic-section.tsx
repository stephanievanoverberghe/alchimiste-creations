import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/content/home';
import { CheckCircle2 } from 'lucide-react';

type Props = {
    qualification: HomeContent['qualification'];
    proofs: HomeContent['proofs'];
};

export function HomeDiagnosticSection({ qualification, proofs }: Props) {
    return (
        <Section id="diagnostic">
            <Container>
                <SectionHeading eyebrow={qualification.eyebrow} title={qualification.title} description={qualification.description} />

                <div className="mt-6 grid gap-4 lg:grid-cols-3">
                    {qualification.items.map((item) => (
                        <Card key={item.title} className="border-border/80 bg-background/90 p-5">
                            <h3 className="text-base font-semibold">{item.title}</h3>
                            <p className="mt-2 text-sm text-text-muted">{item.description}</p>

                            <ul className="mt-4 space-y-2 text-sm text-text-muted">
                                {item.bullets.slice(0, 2).map((bullet) => (
                                    <li key={bullet} className="flex gap-2">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                                        <span className="text-pretty">{bullet}</span>
                                    </li>
                                ))}
                            </ul>

                            {item.emphasis ? <p className="mt-4 rounded-xl border border-border/70 bg-background/70 p-3 text-sm font-semibold text-text">{item.emphasis}</p> : null}
                        </Card>
                    ))}
                </div>

                <Card className="mt-6 border-border/80 bg-background/90 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent">Mini-preuve immédiate</p>

                    <div className="mt-3 -mx-2 flex gap-3 overflow-x-auto px-2 pb-2 md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0 md:grid-cols-3">
                        {proofs.stats.map((stat) => (
                            <div key={stat.label} className="min-w-55 rounded-xl border border-border/70 bg-background/70 p-3 md:min-w-0">
                                <p className="text-lg font-semibold text-primary">{stat.value}</p>
                                <p className="text-sm text-text-muted">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </Card>

                <p className="mt-4 text-sm font-semibold text-accent">{qualification.transitionToMethod}</p>
            </Container>
        </Section>
    );
}
