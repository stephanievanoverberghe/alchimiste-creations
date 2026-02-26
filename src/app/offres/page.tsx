import type { Metadata } from 'next';
import { OffersPage } from '@/presentation/pages/OffersPage';

export const metadata: Metadata = {
    title: 'Offres',
    description: 'Packs Essentiel, Croissance et Signature pour créer un site clair, vivant et aligné.',
};

export default function Page() {
    return <OffersPage />;
}
