export const contactValidationCopy = {
    invalidName: 'Nom invalide',
    invalidEmail: 'Email invalide',
    invalidMessage: 'Merci d’ajouter au moins 10 caractères.',
    consentRequired: 'Nécessaire pour traiter ta demande.',
    shortMessageUi: 'Ton message est un peu court (min. 10 caractères).',
    invalidForm: 'Formulaire invalide.',
    captchaRequired: 'Merci de valider le challenge anti-spam.',
    submitFailed: 'Impossible d’envoyer le message.',
    networkError: 'Erreur réseau. Réessaie dans un instant.',
    unexpectedError: 'Oups, ça a échoué.',
    fallbackInvalidPayload: 'Données invalides',
    missingServerConfig: 'Configuration serveur manquante (WEB3FORMS_KEY)',
    providerFailed: 'Échec de l’envoi via Web3Forms',
    serverError: 'Erreur serveur',
    api: {
        subject: 'Contact — Formulaire express',
        getHint: 'POST only',
    },
    captchaGate: {
        enableThirdPartyPrefix: 'Pour envoyer le formulaire, autorise',
        thirdPartyStrongLabel: 'Contenus tiers',
        enableThirdPartySuffix: 'dans',
        cookiePreferencesLabel: 'Préférences cookies',
        antiSpamAriaLabel: 'Vérification anti-spam',
    },
} as const;

export const contactAlternativesCopy = {
    mailtoSubject: 'Contact — Appel découverte',
    whatsappGreeting: 'Bonjour,',
    whatsappNamePrefix: "je m'appelle",
    whatsappEmailPrefix: 'Mon email:',
    whatsappClosing: 'Je voudrais échanger sur mon projet et réserver un appel découverte.',
} as const;

export const contactInfosCopy = {
    badge: 'Infos pratiques',
    title: 'Ce qui est utile à savoir',
    description: 'Logistique claire pour se caler rapidement — sans frictions.',
    items: [
        {
            icon: 'globe',
            title: 'Fuseau horaire',
            desc: 'Europe/Paris (CET/CEST)',
            chip: 'UTC+1 / UTC+2',
        },
        {
            icon: 'calendar',
            title: 'Disponibilité',
            desc: '1 projet par mois pour garder de la profondeur.',
            chip: 'Qualité > volume',
        },
        {
            icon: 'languages',
            title: 'Langues',
            desc: 'Français (native) · English (pro).',
            chip: 'FR • EN',
        },
        {
            icon: 'mapPin',
            title: 'Zone',
            desc: 'À distance — France & Europe.',
            chip: 'Visio par défaut',
        },
        {
            icon: 'video',
            title: 'Format d’échange',
            desc: 'Zoom ou simple appel audio. Email OK.',
            chip: 'Souple',
        },
        {
            icon: 'clock',
            title: 'Réactivité',
            desc: 'Réponse sous 24–48h ouvrées.',
            chip: 'Rapide',
        },
    ],
} as const;

export const contactCallToActionCopy = {
    waveImageAlt: 'Vague décorative',
    badge: 'Dernière étape',
    title: 'Prêt ? On cale un créneau.',
    description: '30 minutes pour cadrer ton besoin et la suite. Tu préfères écrire ? Envoie-moi un email.',
    chips: [
        { icon: 'clock', label: '30 min' },
        { icon: 'shield', label: 'Sans pression' },
    ],
    scheduleButton: {
        label: 'Réserver un appel',
        ariaLabel: 'Réserver un appel découverte',
    },
    emailButton: {
        label: 'Écrire un email',
        ariaLabel: 'Écrire un email',
        subject: 'Contact — Appel découverte',
    },
    note: 'Réponse sous 24–48h ouvrées — sans jargon, sans pression.',
} as const;
