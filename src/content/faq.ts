import { faqListSchema } from './schemas';

export const faqs = faqListSchema.parse([
    {
        question: 'Je ne suis pas à l’aise avec le digital, est-ce un problème ?',
        answer: 'Pas du tout. Je vous guide étape par étape avec des mots simples. Vous n’avez rien de technique à gérer : vous validez, je m’occupe du reste.',
    },
    {
        question: 'En combien de temps je peux voir une vraie amélioration ?',
        answer: 'Vous avez une première version rapidement (souvent en quelques jours) et des améliorations visibles sur la clarté et les demandes dès la mise en ligne.',
    },
    {
        question: 'Est-ce que vous pouvez reprendre mon site actuel sans tout jeter ?',
        answer: 'Oui. Si votre base est exploitable, on garde ce qui fonctionne et on améliore le reste pour éviter les dépenses inutiles.',
    },
    {
        question: 'J’ai peur d’investir sans résultat, comment être rassuré ?',
        answer: 'Chaque offre est pensée autour d’un besoin concret : plus de demandes, plus de clarté, plus de confiance. Vous savez ce qui sera livré et pourquoi c’est utile.',
    },
    {
        question: 'Après la livraison, je suis autonome ou je reste dépendant ?',
        answer: 'Vous restez autonome. Le site est clair, facile à faire évoluer, et je peux aussi vous accompagner ensuite si vous voulez continuer à optimiser.',
    },
]);
