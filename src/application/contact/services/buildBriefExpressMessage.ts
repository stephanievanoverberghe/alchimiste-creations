import { briefExpressCopy } from '@/infrastructure/content/devis-copy';

type GoalKey = 'leads' | 'credibilite' | 'vente' | 'recrutement' | 'autre';
type ContactPref = 'email' | 'appel';
type ContentsReady = 'oui' | 'non' | 'partiel';
type PriorityKey = 'budget' | 'delai' | 'qualite';

type BriefData = {
    projet: {
        type: 'vitrine' | 'portfolio' | 'ecommerce' | 'autre';
        refonte: boolean;
        urlActuelle: string;
    };
    objectifs: {
        goals: Record<GoalKey, boolean>;
        goalsAutre?: string;
        ciblePrincipale?: string;
    };
    contenus: {
        contentsReady: ContentsReady;
        blog: boolean;
        formulaireAvance: boolean;
        rdv: boolean;
        paiement: boolean;
        multilingue: boolean;
        seoTechnique: boolean;
        accessibilite: boolean;
        performances: boolean;
        integrations?: string;
    };
    cadrage: {
        budget: '<1000' | '1000-2000' | '2000-4000' | '4000-6000' | '6000+';
        deadline?: string;
        priorite: PriorityKey;
    };
    contexte: {
        secteur?: string;
        diff?: string;
        refs?: string;
    };
    contact: {
        prenom: string;
        email: string;
        entreprise?: string;
        paysFuseau?: string;
        preference: ContactPref;
    };
};

const boolLabel = (value: boolean, labels: { trueLabel: string; falseLabel: string }) => (value ? labels.trueLabel : labels.falseLabel);

export function buildBriefExpressMessage(data: BriefData): string {
    const { labels, yes, no, on, off, emptyValue, title } = briefExpressCopy;
    const objectifs =
        Object.entries(data.objectifs.goals)
            .filter(([, isEnabled]) => isEnabled)
            .map(([key]) => key)
            .join(', ') || emptyValue;

    return [
        title,
        `• ${labels.project}: ${data.projet.type} | ${labels.redesign}: ${boolLabel(data.projet.refonte, { trueLabel: yes, falseLabel: no })} | ${labels.url}: ${data.projet.urlActuelle || emptyValue}`,
        `• ${labels.goals}: ${objectifs} ${data.objectifs.goalsAutre ? `(${labels.other}: ${data.objectifs.goalsAutre})` : ''}`,
        `  ${labels.target}: ${data.objectifs.ciblePrincipale || emptyValue}`,
        `• ${labels.contentReady}: ${data.contenus.contentsReady}`,
        `  Blog:${boolLabel(data.contenus.blog, { trueLabel: on, falseLabel: off })} | ${labels.advancedForm}:${boolLabel(data.contenus.formulaireAvance, { trueLabel: on, falseLabel: off })} | ${labels.appointment}:${boolLabel(data.contenus.rdv, { trueLabel: on, falseLabel: off })} | ${labels.payment}:${boolLabel(data.contenus.paiement, { trueLabel: on, falseLabel: off })}`,
        `  ${labels.multilingual}:${boolLabel(data.contenus.multilingue, { trueLabel: on, falseLabel: off })} | ${labels.technicalSeo}:${boolLabel(data.contenus.seoTechnique, { trueLabel: on, falseLabel: off })} | ${labels.accessibility}:${boolLabel(data.contenus.accessibilite, { trueLabel: on, falseLabel: off })} | ${labels.performance}:${boolLabel(data.contenus.performances, { trueLabel: on, falseLabel: off })}`,
        `  ${labels.integrations}: ${data.contenus.integrations || emptyValue}`,
        `• ${labels.budget}: ${data.cadrage.budget} | ${labels.deadline}: ${data.cadrage.deadline || emptyValue} | ${labels.priority}: ${data.cadrage.priorite}`,
        `• ${labels.context} — ${labels.sector}: ${data.contexte.secteur || emptyValue}`,
        `  ${labels.differentiation}: ${data.contexte.diff || emptyValue}`,
        `  ${labels.references}: ${data.contexte.refs || emptyValue}`,
        `• ${labels.contact} — ${labels.firstName}: ${data.contact.prenom}`,
        `  ${labels.email}: ${data.contact.email}`,
        `  ${labels.company}: ${data.contact.entreprise || emptyValue}`,
        `  ${labels.timezone}: ${data.contact.paysFuseau || emptyValue}`,
        `  ${labels.preference}: ${data.contact.preference}`,
    ].join('\n');
}
