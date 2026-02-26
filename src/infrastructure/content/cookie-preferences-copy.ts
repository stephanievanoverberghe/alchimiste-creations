export const cookiePreferencesCopy = {
    badge: 'Préférences cookies',
    title: 'Gérer mon consentement',
    intro: 'Ici, tu peux choisir ce que tu autorises. Les cookies strictement nécessaires sont toujours actifs. Tes choix sont conservés 6 mois et tu peux les modifier à tout moment.',
    categories: {
        necessary: {
            title: 'Strictement nécessaires',
            chip: 'Toujours actif',
            description: 'Indispensables au fonctionnement du site (sécurité, anti-spam, équilibre de charge, sauvegarde du choix de consentement).',
        },
        preferences: {
            title: 'Préférences',
            description: 'Personnalisation légère (langue, thème, options de confort) pour améliorer ton expérience.',
            ariaLabel: 'Activer les cookies de préférences',
        },
        analytics: {
            title: 'Mesure d’audience',
            description: 'Mesure anonyme des performances et usages (pages vues, interactions, parcours).',
            ariaLabel: 'Activer la mesure d’audience',
        },
        functional: {
            title: 'Contenus tiers',
            description: 'Afficher des services intégrés comme Calendly, lecteurs vidéo, cartes… (peuvent déposer des cookies).',
            ariaLabel: 'Activer les contenus tiers',
        },
        marketing: {
            title: 'Marketing',
            description: 'Publicité/personnalisation (désactivé par défaut — non utilisé actuellement).',
            ariaLabel: 'Activer les cookies marketing',
        },
    },
    actions: {
        rejectAll: 'Tout refuser',
        acceptAll: 'Tout accepter',
        save: 'Enregistrer',
        saved: 'Préférences enregistrées',
    },
    legal: {
        prefix: 'Consentement valable 6 mois. Tu peux le modifier ou le retirer ici à tout moment. Consulte la',
        linkLabel: 'politique de confidentialité',
    },
    debugSummary: 'Voir l’état actuel (dev)',
} as const;
