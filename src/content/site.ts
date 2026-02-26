import { siteSchema } from './schemas';

export const siteContent = siteSchema.parse({
    brand: 'Alchimiste Créations',
    baseline: 'Des sites qui claquent visuellement et performent commercialement.',
    valueProposition:
        'Je conçois des expériences web orientées acquisition pour coachs, studios et PME ambitieuses : branding digital fort, tunnel de conversion clair, et stack moderne React / Next.js / MongoDB.',
    ctaPrimary: { label: 'Planifier un audit stratégique', href: '/contact' },
    ctaSecondary: { label: 'Explorer les offres', href: '/offres' },
    nav: [
        { label: 'Offres', href: '/offres' },
        { label: 'Méthode', href: '/methode' },
        { label: 'Projets', href: '/projets' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Contact', href: '/contact' },
    ],
    stats: [
        { label: 'Délai moyen de lancement', value: '2 à 6 semaines' },
        { label: 'Score Lighthouse cible', value: '95+ mobile & desktop' },
        { label: 'Accompagnement', value: '1:1 stratégique + production' },
    ],
});
