import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { siteContent } from '@/content/site';

export function CtaStrip() {
    return (
        <Section>
            <Container>
                <div className="glass reveal-up flex flex-col items-start justify-between gap-6 rounded-xl p-8 md:flex-row md:items-center">
                    <div>
                        <p className="text-lg font-semibold">Prête à transformer votre site en moteur de leads ?</p>
                        <p className="text-sm text-text-muted">Réponse sous 24h, cadrage clair, zéro jargon inutile.</p>
                    </div>
                    <Button href={siteContent.ctaPrimary.href}>{siteContent.ctaPrimary.label}</Button>
                </div>
            </Container>
        </Section>
    );
}
