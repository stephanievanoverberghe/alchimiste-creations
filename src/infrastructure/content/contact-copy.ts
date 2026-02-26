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
