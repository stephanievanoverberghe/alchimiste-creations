import type { Metadata } from 'next';
import { ProjectsPage } from '@/presentation/pages/ProjectsPage';

export const metadata: Metadata = {
    title: 'Projets',
    description: 'Découvrez des projets concrets avec résultats, décisions UX/UI et impact business.',
};

export default function Page() {
    return <ProjectsPage />;
}
