import { siteSchema } from './schemas';

export const siteContent = siteSchema.parse({
    brand: 'Alchimiste Créations',
    baseline: 'Freelance Front-End premium pour marques ambitieuses',
    valueProposition: 'Je transforme vos pages en expériences qui inspirent confiance, accélèrent la décision et génèrent des leads qualifiés.',
    ctaPrimary: { label: 'Réserver un appel découverte', href: '/contact' },
    ctaSecondary: { label: 'Voir les projets', href: '/projets' },
    nav: [
        { label: 'Offres', href: '/offres' },
        { label: 'Méthode', href: '/methode' },
        { label: 'Projets', href: '/projets' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Contact', href: '/contact' },
    ],
    stats: [
        { label: 'Délai moyen de lancement', value: '3 à 5 semaines' },
        { label: 'Score Lighthouse cible', value: '95+' },
        { label: 'Accompagnement', value: '1:1 de bout en bout' },
    ],
});
