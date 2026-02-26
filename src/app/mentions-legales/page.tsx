import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';

export const metadata: Metadata = {
    title: 'Mentions légales',
    description: 'Informations légales relatives au site Alchimiste Créations.',
};

export default function MentionsLegalesPage() {
    return (
        <Section>
            <Container className="max-w-3xl space-y-4 text-sm text-text-muted">
                <h1 className="text-3xl font-semibold text-text">Mentions légales</h1>
                <p>Éditeur : Alchimiste Créations.</p>
                <p>Contact : hello@alchimiste-creations.fr</p>
                <p>Hébergeur : à définir selon environnement de production.</p>
            </Container>
        </Section>
    );
}
