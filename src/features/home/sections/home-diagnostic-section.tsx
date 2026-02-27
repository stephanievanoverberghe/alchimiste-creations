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
        <Section id="diagnostic" className="pt-2">
            <Container>
                <SectionHeading eyebrow={qualification.eyebrow} title={qualification.title} description={qualification.description} />

                <div className="grid gap-4 lg:grid-cols-3">
                    {qualification.items.map((item) => (
                        <Card key={item.title} className="border-border/80 bg-background/90">
                            <h3 className="text-base font-semibold">{item.title}</h3>
                            <p className="mt-2 text-sm text-text-muted">{item.description}</p>
                            <ul className="mt-4 space-y-2 text-sm text-text-muted">
                                {item.bullets.slice(0, 2).map((bullet) => (
                                    <li key={bullet} className="flex gap-2">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    ))}
                </div>

                <Card className="mt-6 border-border/80 bg-background/90">
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent">Mini-preuve immédiate</p>
                    <div className="mt-3 grid gap-3 md:grid-cols-3">
                        {proofs.stats.map((stat) => (
                            <div key={stat.label} className="rounded-xl border border-border/70 bg-background/70 p-3">
                                <p className="text-lg font-semibold text-primary">{stat.value}</p>
                                <p className="text-sm text-text-muted">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </Card>
                <div className="mt-5 rounded-2xl border border-border/70 bg-background/70 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent">Aperçu de la suite</p>
                    <p className="mt-2 text-sm text-text-muted">
                        Vous pourrez ensuite choisir rapidement l&apos;option adaptée : <span className="font-semibold text-text">création de site vitrine</span> ou{' '}
                        <span className="font-semibold text-text">refonte de l&apos;existant</span>.
                    </p>
                </div>
                <p className="mt-5 text-sm font-semibold text-accent">{qualification.transitionToMethod}</p>
            </Container>
        </Section>
    );
}
