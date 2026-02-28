import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { siteContent } from '@/content/site';

export function CtaStrip() {
    return (
        <Section id="cta">
            <Container>
                <div className="cta-strip reveal-up relative overflow-hidden rounded-2xl p-8 md:p-10">
                    <div aria-hidden="true" className="cta-strip__mesh" />
                    <div aria-hidden="true" className="cta-strip__orb cta-strip__orb--primary" />
                    <div aria-hidden="true" className="cta-strip__orb cta-strip__orb--accent" />
                    <div aria-hidden="true" className="cta-strip__orb cta-strip__orb--trail" />

                    <div className="relative flex flex-wrap items-center gap-2 text-xs font-semibold text-text-muted">
                        {['Réponse en 24h', 'Conseils concrets', 'Sans jargon'].map((item) => (
                            <span key={item} className="cta-strip__pill rounded-full px-3 py-1">
                                {item}
                            </span>
                        ))}
                    </div>

                    <div className="relative mt-5 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                        <div>
                            <p className="typography-h3">Votre site doit vous apporter des clients, pas juste être joli.</p>
                            <p className="mt-2 max-w-2xl text-sm text-text-muted">
                                On clarifie votre message, on rend le parcours plus fluide, et on vous aide à obtenir plus de demandes sérieuses.
                            </p>
                        </div>
                        <Button className="cta-strip__button" href={siteContent.ctaPrimary.href}>
                            {siteContent.ctaPrimary.label}
                        </Button>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
