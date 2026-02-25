export const miniProcessCopy = {
    badge: 'Comment ça se passe ?',
    title: 'Un processus clair, doux et structuré',
    intro: 'Quatre étapes simples pour créer un site aligné : on écoute, on pose l’ambiance, on développe, on met en ligne — sans jargon, sans pression.',
    ctaNotePrefix: '* Je prends ',
    ctaNoteEmphasis: '1 projet par mois',
    ctaNoteSuffix: ' pour garder de la profondeur.',
    ctaLabel: 'Voir la méthode en détail',
    steps: [
        {
            icon: 'ear',
            label: 'Écoute & cadrage',
            description: 'On pose l’intention, les besoins et le périmètre. Tu n’as pas besoin d’avoir tout clair : on le fait ensemble.',
            milestone: 'Kick-off',
            validation: 'Go cadrage',
        },
        {
            icon: 'palette',
            label: 'Ambiance & design',
            description: 'Moodboard léger, bases UI/UX, structure des pages. On valide l’univers avant d’avancer.',
            milestone: 'Style + structure',
            validation: 'OK UI light',
        },
        {
            icon: 'code',
            label: 'Développement',
            description: 'Intégration WordPress ou React/Next, responsive, SEO de base et micro-animations utiles.',
            milestone: 'Pré-prod',
            validation: 'Recette prête',
        },
        {
            icon: 'rocket',
            label: 'Tests & mise en ligne',
            description: 'Contrôles finaux, corrections, mise en ligne accompagnée + petit guide de prise en main.',
            milestone: 'Go live',
            validation: 'Passation',
        },
    ],
} as const;
