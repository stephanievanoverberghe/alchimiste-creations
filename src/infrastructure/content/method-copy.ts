export const methodTldrCopy = {
    badge: 'En bref',
    title: 'La méthode en 60 secondes',
    description: 'Trois piliers simples, trois chiffres utiles — et un accès direct au détail du process.',
    pillars: [
        {
            title: 'Cadrage précis',
            description: "Objectifs, audience, pages, contenus : on sait où l'on va avant de produire.",
        },
        {
            title: 'Petits lots',
            description: 'On avance par blocs courts (wireframes → UI → dev) pour rester focus et souple.',
        },
        {
            title: 'Retours balisés',
            description: 'Fenêtres de feedback prévues + checklists claires pour valider sereinement.',
        },
    ],
    metricLabels: {
        delaisMoyens: 'Délais moyens',
        cyclesRetours: 'Retours prévus',
        capaciteProjets: 'Capacité projets',
    },
    footnote: '* Indications moyennes, précisées au cadrage.',
    detailsCta: 'Voir le détail du process →',
    defaultMetrics: {
        delaisMoyens: '2–6 semaines',
        cyclesRetours: '1–2 cycles/étape',
        capaciteProjets: '1 projet/mois',
    },
} as const;

export const methodPrinciplesCopy = {
    badge: 'Principes',
    title: 'Principes & philosophie de travail',
    description: 'Ce qui guide mes décisions et la qualité du résultat — avec, pour chaque principe, la façon dont ça se traduit dans ton projet.',
    exampleLabel: 'Exemple',
    principles: [
        {
            icon: 'leaf',
            title: 'Sobriété par design',
            desc: "Un site épuré, lisible, sans surcharge technique ni effets inutiles. On va à l'essentiel pour servir ton contenu et tes objectifs.",
            example: 'Concrètement : grilles simples, palettes limitées, composants réutilisables, pas de plugins gadgets.',
        },
        {
            icon: 'accessibility',
            title: 'Accessibilité AA',
            desc: 'Contrastes, focus visibles, sémantique propre et clavier : ton site reste utilisable par tout le monde.',
            example: 'Concrètement : tests clavier/lecteur d’écran, alt text systématique, hiérarchie Hn maîtrisée.',
        },
        {
            icon: 'gauge',
            title: 'Performance mesurée',
            desc: "Budgets clairs (images, polices) et suivi Web Vitals. L'expérience reste fluide du mobile à l'ultra-large.",
            example: 'Concrètement : images en WebP/AVIF, font-display swap, LCP cible < 2.5s, audit Lighthouse à chaque étape.',
        },
        {
            icon: 'userCheck',
            title: 'Ownership client',
            desc: 'Tu possèdes ton site, tes accès et tes contenus. Je te remets tout et je te forme à l’utiliser.',
            example: 'Concrètement : remise des codes, accès admin, guide de prise en main + replay vidéo.',
        },
        {
            icon: 'shieldCheck',
            title: 'Cadre & sérénité',
            desc: 'Des étapes courtes, des fenêtres de retours balisées et des critères de validation explicites.',
            example: 'Concrètement : jalons “wireframe → UI → dev”, 1–2 cycles de retours/étape, checklists de sortie.',
        },
        {
            icon: 'sparkles',
            title: 'Soin du détail utile',
            desc: 'Micro-interactions et finitions quand elles servent la compréhension ou la conversion — pas pour “faire joli”.',
            example: 'Concrètement : états de survol/focus cohérents, transitions légères, vide d’état soigné.',
        },
    ],
    footnote: '* Chaque principe peut être contractualisé en critères vérifiables (checklists & budgets).',
} as const;

export const methodCaseStudiesCopy = {
    badge: 'Études de cas',
    title: 'La preuve par l’exemple — projets proches de votre besoin',
    description: 'Deux projets courts : résultat concret, délais réels, impact mesurable.',
    ctaLabel: 'Voir tous les projets',
} as const;

export const methodRolesCopy = {
    badge: 'Rôles & responsabilités',
    title: 'Qui fait quoi — clair, cadré, serein',
    description:
        'On répartit les responsabilités pour éviter les malentendus. Trois colonnes : moi / toi / partagé, des délais de réponse doux, et des formats de livrables explicites.',
    labels: {
        me: 'Moi',
        you: 'Toi',
        shared: 'Partagé',
        slaTitle: 'Délais de réponse (SLA doux)',
        deliverablesTitle: 'Formats des livrables',
        slaFootnote: '* Hors week-ends/jours fériés. Les fenêtres de retours sont précisées à chaque jalon.',
        deliverablesFootnote: '* Un canal unique “source of truth” (ex. Notion/Email) est défini en début de projet.',
    },
    defaults: {
        mine: [
            'Architecture & design système (UI Kit)',
            'Wireframes & maquettes UI',
            'Intégration (WordPress ou React)',
            'Performance, accessibilité & SEO de base',
            'Mise en ligne (DNS/SSL) & passation',
        ],
        yours: [
            'Contenus (textes, images, logo) & droits/licences',
            'Accès (nom de domaine, hébergement, CMS)',
            'Validations aux jalons (wireframes → UI → dev)',
            'Retours dans les fenêtres prévues (1–2 cycles/étape)',
            'Conformité légale (mentions, CGU/CGV, cookies)',
        ],
        shared: [
            'Objectifs & priorités des pages',
            'Arborescence & parcours utilisateurs',
            'Tests de recette (formulaires, responsive)',
            'Choix des options & itérations',
            'Plan de suivi post-lancement',
        ],
        sla: {
            me: 'Réponse sous 24–48 h ouvrées',
            you: 'Validation sous 3 jours ouvrés',
        },
        formats: ['Google Docs', 'Figma', 'Notion/Drive', 'CMS', 'Replay vidéo', 'Accès + codes'],
    },
} as const;
