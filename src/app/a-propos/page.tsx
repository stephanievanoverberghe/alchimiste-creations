import type { Metadata } from 'next';
import { AboutPage } from '@/presentation/pages/AboutPage';

export const metadata: Metadata = {
    title: 'À propos',
    description: 'Front-end + Product Design pour transformer une identité sensible en expérience web claire.',
};

export default function Page() {
    return <AboutPage />;
}
