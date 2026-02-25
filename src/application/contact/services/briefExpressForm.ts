import { validateContactIdentity } from '@/application/contact/services/contactValidation';
import { contactValidationCopy } from '@/infrastructure/content/contact-copy';
import { briefExpressCopy } from '@/infrastructure/content/devis-copy';

export type GoalKey = 'leads' | 'credibilite' | 'vente' | 'recrutement' | 'autre';
export type ContactPref = 'email' | 'appel';
export type ContentsReady = 'oui' | 'non' | 'partiel';
export type PriorityKey = 'budget' | 'delai' | 'qualite';

export type BriefData = {
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
        consent: boolean;
    };
    attachments: File[];
    website?: string;
};

export type StepKey = 'projet' | 'objectifs' | 'contenus' | 'cadrage' | 'contexte' | 'contact';

export const briefExpressSteps: ReadonlyArray<{ key: StepKey; label: string }> = briefExpressCopy.steps;

export function makeInitialBriefData(): BriefData {
    return {
        projet: { type: 'vitrine', refonte: false, urlActuelle: '' },
        objectifs: {
            goals: { leads: false, credibilite: false, vente: false, recrutement: false, autre: false },
            goalsAutre: '',
            ciblePrincipale: '',
        },
        contenus: {
            contentsReady: 'partiel',
            blog: false,
            formulaireAvance: false,
            rdv: false,
            paiement: false,
            multilingue: false,
            seoTechnique: false,
            accessibilite: false,
            performances: false,
            integrations: '',
        },
        cadrage: { budget: '2000-4000', deadline: '', priorite: 'qualite' },
        contexte: { secteur: '', diff: '', refs: '' },
        contact: { prenom: '', email: '', entreprise: '', paysFuseau: '', preference: 'email', consent: false },
        attachments: [],
        website: '',
    };
}

export function validateBriefExpressStep(step: StepKey, data: BriefData): Record<string, string> {
    const errors: Record<string, string> = {};
    if (step !== 'contact') return errors;

    const validation = validateContactIdentity(
        {
            name: data.contact.prenom,
            email: data.contact.email,
            consent: data.contact.consent,
        },
        { requireConsent: true },
    );

    if (validation.error === contactValidationCopy.invalidName) errors['contact.prenom'] = briefExpressCopy.errors.firstNameRequired;
    if (validation.error === contactValidationCopy.invalidEmail) errors['contact.email'] = briefExpressCopy.errors.invalidEmail;
    if (validation.error === contactValidationCopy.consentRequired) errors['contact.consent'] = contactValidationCopy.consentRequired;

    return errors;
}
