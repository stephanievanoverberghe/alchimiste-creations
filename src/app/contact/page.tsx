import type { Metadata } from 'next';
import CalendlySection from '@/components/sections/contact/Calendly';
import AlternativesSection from '@/components/sections/contact/Alternatives';

export const metadata: Metadata = {
    title: 'Contact — Réserver un appel découverte (30 min)',
    description: 'Prends un créneau de 30 minutes pour parler de ton projet (sans pression). Réponse rapide.',
    alternates: { canonical: '/contact' },
    openGraph: { title: 'Contact', description: 'Réserve un appel découverte.' },
};

export const dynamic = 'force-dynamic';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const pickStr = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ContactPage({ searchParams }: { searchParams?: SearchParams }) {
    const params = (await searchParams) ?? {};
    const prefillName = pickStr(params.name)?.trim() || undefined;
    const prefillEmail = pickStr(params.email)?.trim() || undefined;

    return (
        <>
            <CalendlySection />
            <AlternativesSection id="contact-alternatives" name={prefillName} email={prefillEmail} />
        </>
    );
}
