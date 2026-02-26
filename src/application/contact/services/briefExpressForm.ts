import { z } from 'zod';
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

const normalizeText = (value: string) => value.replace(/\s+/g, ' ').trim();

const normalizedText = (maxLength: number) => z.preprocess((value) => (typeof value === 'string' ? normalizeText(value) : ''), z.string().max(maxLength));

const optionalUrlSchema = z.preprocess(
    (value) => (typeof value === 'string' ? normalizeText(value) : ''),
    z
        .union([z.literal(''), z.url()])
        .transform((value) => value ?? '')
        .default(''),
);

const optionalMonthSchema = z.preprocess(
    (value) => (typeof value === 'string' ? normalizeText(value) : ''),
    z.union([z.literal(''), z.string().regex(/^\d{4}-\d{2}$/)]).transform((value) => value ?? ''),
);

const briefFormSchema = z.object({
    projet: z.object({
        type: z.enum(['vitrine', 'portfolio', 'ecommerce', 'autre']),
        refonte: z.boolean(),
        urlActuelle: optionalUrlSchema,
    }),
    objectifs: z.object({
        goals: z.object({
            leads: z.boolean(),
            credibilite: z.boolean(),
            vente: z.boolean(),
            recrutement: z.boolean(),
            autre: z.boolean(),
        }),
        goalsAutre: normalizedText(180).optional(),
        ciblePrincipale: normalizedText(160).optional(),
    }),
    contenus: z.object({
        contentsReady: z.enum(['oui', 'non', 'partiel']),
        blog: z.boolean(),
        formulaireAvance: z.boolean(),
        rdv: z.boolean(),
        paiement: z.boolean(),
        multilingue: z.boolean(),
        seoTechnique: z.boolean(),
        accessibilite: z.boolean(),
        performances: z.boolean(),
        integrations: normalizedText(240).optional(),
    }),
    cadrage: z.object({
        budget: z.enum(['<1000', '1000-2000', '2000-4000', '4000-6000', '6000+']),
        deadline: optionalMonthSchema.optional(),
        priorite: z.enum(['budget', 'delai', 'qualite']),
    }),
    contexte: z.object({
        secteur: normalizedText(120).optional(),
        diff: normalizedText(500).optional(),
        refs: normalizedText(500).optional(),
    }),
    contact: z.object({
        prenom: normalizedText(80),
        email: normalizedText(120),
        entreprise: normalizedText(120).optional(),
        paysFuseau: normalizedText(120).optional(),
        preference: z.enum(['email', 'appel']),
        consent: z.boolean(),
    }),
    attachments: z.array(z.custom<File>()).default([]),
    website: normalizedText(200).optional(),
});

const stepRules: Partial<Record<StepKey, z.ZodTypeAny>> = {
    projet: z.object({ projet: briefFormSchema.shape.projet }),
    contact: z.object({ contact: briefFormSchema.shape.contact }),
};

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

export function sanitizeBriefData(data: unknown): BriefData {
    const parsed = briefFormSchema.safeParse(data);
    if (!parsed.success) return makeInitialBriefData();
    return parsed.data;
}

export function validateBriefExpressStep(step: StepKey, data: BriefData): Record<string, string> {
    const errors: Record<string, string> = {};

    const scopedStepSchema = stepRules[step];
    if (scopedStepSchema) {
        const scopedResult = scopedStepSchema.safeParse(data);
        if (!scopedResult.success && step === 'projet') {
            const hasUrlIssue = scopedResult.error.issues.some((issue) => issue.path.join('.') === 'projet.urlActuelle');
            if (hasUrlIssue) {
                errors['projet.urlActuelle'] = briefExpressCopy.errors.invalidProjectUrl;
            }
        }
    }

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
