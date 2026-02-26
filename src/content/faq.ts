import { faqListSchema } from './schemas';

export const faqs = faqListSchema.parse([
    {
        question: 'Avec qui vais-je travailler ?',
        answer: 'Directement avec moi. Pas de sous-traitance opaque : vous avez une interlocutrice unique du cadrage à la mise en ligne.',
    },
    {
        question: 'Combien de temps avant une première version ?',
        answer: 'Un premier livrable solide arrive en général entre J+5 et J+10 selon le périmètre.',
    },
    {
        question: 'Puis-je garder mes contenus actuels ?',
        answer: 'Oui, je peux les retravailler pour la conversion sans repartir de zéro si votre base est saine.',
    },
    {
        question: 'Le site est-il maintenable à long terme ?',
        answer: 'Oui. Le code est structuré avec un design system, des composants réutilisables et une séparation claire contenu/UI.',
    },
    {
        question: 'Proposes-tu un suivi après livraison ?',
        answer: 'Oui, une phase post-lancement optionnelle permet de corriger, itérer et optimiser selon les KPI observés.',
    },
]);
