import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';

export const metadata: Metadata = {
    title: 'Politique de confidentialité',
    description: 'Politique de confidentialité du site Alchimiste Créations.',
};

export default function PolitiqueConfidentialitePage() {
    return (
        <Section>
            <Container className="max-w-3xl space-y-4 text-sm text-text-muted">
                <h1 className="text-3xl font-semibold text-text">Politique de confidentialité</h1>
                <p>Les informations envoyées via le formulaire sont utilisées uniquement pour répondre à votre demande.</p>
                <p>Aucune revente de données. Vous pouvez demander suppression ou modification à tout moment.</p>
            </Container>
        </Section>
    );
}
