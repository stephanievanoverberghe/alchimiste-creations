import type { Metadata } from 'next';
import { MethodPage } from '@/presentation/pages/MethodPage';

export const metadata: Metadata = {
    title: 'Méthode',
    description: 'Une méthode claire en 4 étapes pour construire un site premium, performant et accessible.',
};

export default function Page() {
    return <MethodPage />;
}
