export const headerCopy = {
    navLinks: [
        { href: '/a-propos', label: 'À propos' },
        { href: '/offres', label: 'Offres' },
        { href: '/methode', label: 'Méthode' },
        { href: '/projets', label: 'Projets' },
        { href: '/contact', label: 'Contact' },
    ],
    simplePages: ['/mentions-legales', '/politique-confidentialite', '/cgu', '/faq', '/preferences-cookies'] as ReadonlyArray<string>,
    logoAriaLabel: 'Retour à l’accueil',
    logoAlt: 'Alchimiste — logo',
    openMenuAriaLabel: 'Ouvrir le menu',
    closeMenuAriaLabel: 'Fermer le menu',
    mobileCtaLabel: 'Réserver un appel',
    desktopCtaLabel: 'Réserver un appel',
} as const;

export const footerCopy = {
    ariaLabelledBy: 'footer-title',
    title: 'Pied de page',
    sectionAriaLabel: 'Navigation du site et réseaux',
    homeAriaLabel: 'Aller à l’accueil',
    logoAlt: 'Alchimiste Créations',
    baseline: 'Créer du web vivant, un projet à la fois.',
    socialLinks: {
        facebookAriaLabel: 'Facebook — nouvelle fenêtre',
        linkedInAriaLabel: 'LinkedIn — nouvelle fenêtre',
        emailAriaLabel: 'Écrire un email',
    },
    navMain: [
        ['/', 'Accueil'],
        ['/a-propos', 'À propos'],
        ['/methode', 'Méthode'],
        ['/offres', 'Offres'],
        ['/projets', 'Projets'],
        ['/contact', 'Contact'],
    ],
    navLegal: [
        ['/faq', 'FAQ'],
        ['/mentions-legales', 'Mentions légales'],
        ['/politique-confidentialite', 'Politique de confidentialité'],
        ['/preferences-cookies', 'Cookies'],
        ['/cgu', 'CGU'],
    ],
    explorerTitle: 'Explorer',
    legalTitle: 'Ressources & légal',
    copyrightSuffix: 'Alchimiste Créations — Tous droits réservés',
} as const;
