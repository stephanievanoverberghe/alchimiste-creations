import { siteContent } from '@/content/site';

export type HomeHeroVariant = 'a' | 'b';

export type HomeHeroStatPreview = {
    label: string;
    value: string;
};

export type HomeHeroConfig = {
    badge: string;
    title: string;
    lead: string;
    highlights: string[];
    assurances: string[];
    chips: string[];
    primaryCta: {
        href: string;
        label: string;
    };
    secondaryCta: {
        href: string;
        label: string;
    };
    statsPreview: HomeHeroStatPreview[];
    scrollHint: string;
};

const heroConfig: HomeHeroConfig = {
    badge: 'Refonte web premium orientée conversion',
    title: 'Un site premium qui rassure vite et génère plus de demandes.',
    lead: 'En 5 secondes, vos visiteurs comprennent votre valeur et savent comment vous contacter.',
    highlights: ['Message clair dès le premier écran', 'CTA visible, simple à activer', 'Preuves de confiance immédiates'],
    assurances: ['Audit 20 min', 'Réponse sous 24h', 'Sans engagement'],
    chips: ['Clarté', 'Confiance', 'CTA'],
    primaryCta: siteContent.ctaPrimary,
    secondaryCta: siteContent.ctaSecondary,
    statsPreview: [
        { value: '20 min', label: 'Audit offert' },
        { value: '24h', label: 'Retour initial' },
        { value: '0 pression', label: 'Décision libre' },
    ],
    scrollHint: 'Découvrir la méthode',
};

export function useHomeHero(variant: HomeHeroVariant): HomeHeroConfig & { variant: HomeHeroVariant } {
    return {
        ...heroConfig,
        variant,
    };
}
