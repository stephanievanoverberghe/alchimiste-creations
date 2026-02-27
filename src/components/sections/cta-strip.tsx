import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { siteContent } from '@/content/site';

export function CtaStrip() {
    return (
        <Section id="cta">
            <Container>
                <div className="glass reveal-up relative overflow-hidden rounded-2xl p-8">
                    <div aria-hidden="true" className="pointer-events-none absolute -left-12 -top-16 h-44 w-44 rounded-full bg-primary/20 blur-3xl motion-safe:animate-pulse" />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-16 right-0 h-44 w-44 rounded-full bg-accent/20 blur-3xl motion-safe:animate-pulse"
                        style={{ animationDelay: '300ms' }}
                    />

                    <div className="relative flex flex-wrap items-center gap-2 text-xs font-semibold text-text-muted">
                        {['Réponse en 24h', 'Conseils concrets', 'Sans jargon'].map((item) => (
                            <span key={item} className="rounded-full border border-border/70 bg-background/45 px-3 py-1">
                                {item}
                            </span>
                        ))}
                    </div>

                    <div className="relative mt-5 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                        <div>
                            <p className="text-balance text-2xl font-semibold">Votre site doit vous apporter des clients, pas juste être joli.</p>
                            <p className="mt-2 max-w-2xl text-sm text-text-muted">
                                On clarifie votre message, on rend le parcours plus fluide, et on vous aide à obtenir plus de demandes sérieuses.
                            </p>
                        </div>
                        <Button className="motion-safe:transition motion-safe:duration-300 motion-safe:hover:scale-105" href={siteContent.ctaPrimary.href}>
                            {siteContent.ctaPrimary.label}
                        </Button>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
