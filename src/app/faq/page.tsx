import type { Metadata } from 'next';
import { FaqPage } from '@/presentation/pages/FaqPage';

export const metadata: Metadata = {
    title: 'FAQ',
    description: 'Réponses courtes et concrètes sur les délais, budgets, SEO, maintenance et propriété.',
};

export default function Page() {
    return <FaqPage />;
}
