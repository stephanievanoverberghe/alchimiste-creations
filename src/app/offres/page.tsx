import type { Metadata } from 'next';
import { OffersChooserSection, OffersDetailsSection, OffersFaqSection, OffersFinalCtaSection, OffersGridSection, OffersHeroSection, OffersProcessSection } from '@/features/offers';
import { offers } from '@/content/offers';
import { breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
    title: 'Offres',
    description: 'Des offres claires pour créer ou optimiser votre site avec un objectif business concret : plus de crédibilité, plus de demandes qualifiées.',
};

export default function OffresPage() {
    return (
        <>
            <OffersHeroSection />
            <OffersChooserSection />
            <OffersGridSection offers={offers} />
            <OffersDetailsSection offers={offers} />
            <OffersProcessSection />
            <OffersFaqSection />
            <OffersFinalCtaSection />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        breadcrumbJsonLd([
                            { name: 'Accueil', path: '/' },
                            { name: 'Offres', path: '/offres' },
                        ]),
                    ),
                }}
            />
        </>
    );
}
