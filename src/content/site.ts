import { siteSchema } from './schemas';

export const siteContent = siteSchema.parse({
    brand: 'Alchimiste Créations',
    baseline: 'Des sites vitrines clairs, crédibles et orientés prise de contact.',
    valueProposition:
        'J’aide les freelances et petites entreprises à lancer une One Page, créer un site vitrine structuré ou refondre leur site pour générer plus de demandes qualifiées.',

    ctaPrimary: { label: 'Planifier un appel découverte', href: '/contact' },
    ctaSecondary: { label: 'Voir les offres & tarifs', href: '/offres' },

    nav: [
        { label: 'Offres', href: '/offres' },
        { label: 'Méthode', href: '/methode' },
        { label: 'Projets', href: '/projets' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Contact', href: '/contact' },
    ],

    stats: [
        { label: 'One Page', value: '7 à 14 jours ouvrés' },
        { label: 'Site vitrine', value: '3 à 6 semaines' },
        { label: 'Accompagnement', value: 'Stratégique + production sur mesure' },
    ],
});
