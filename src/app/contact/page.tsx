import type { Metadata } from 'next';
import { ContactPage } from '@/presentation/pages/ContactPage';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Réserver un appel ou demander un devis pour votre futur site.',
};

export default function Page() {
    return <ContactPage />;
}
