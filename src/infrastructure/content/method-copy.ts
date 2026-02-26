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
