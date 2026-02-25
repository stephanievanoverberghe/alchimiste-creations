'use client';

import { buildBriefExpressMessage } from '@/application/contact/services/buildBriefExpressMessage';
import { validateContactIdentity, validateContactSubmission } from '@/application/contact/services/contactValidation';
import { contactValidationCopy } from '@/infrastructure/content/contact-copy';
import { briefExpressCopy } from '@/infrastructure/content/devis-copy';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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

type PushDetail = Record<string, unknown>;
declare global {
    interface Window {
        dataLayer?: Array<Record<string, unknown>>;
    }
}

const STORAGE_KEY = 'brief-express-v1';

const pushDl = (event: string, detail?: PushDetail) => window?.dataLayer?.push(detail ? { event, ...detail } : { event });

function useDebouncedEffect(fn: () => void, deps: React.DependencyList, delay = 350) {
    useEffect(() => {
        const id = setTimeout(fn, delay);
        return () => clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

function makeInitialData(): BriefData {
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

export const fileAcceptOK = (file: File) => /\.(pdf|docx?|zip)$/i.test(file.name);
export const fileSizeOK = (file: File, maxMB = 10) => file.size <= maxMB * 1024 * 1024;

export function trackBriefExpress(event: string, detail?: PushDetail) {
    pushDl(event, detail);
}

export function useBriefExpressForm() {
    const [data, setData] = useState<BriefData>(makeInitialData);
    const [step, setStep] = useState<StepKey>('projet');
    const [restored, setRestored] = useState<boolean>(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const skipPersistRef = useRef(false);

    const [successOpen, setSuccessOpen] = useState(false);
    const closeBtnRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        pushDl('devis_form_start');
    }, []);

    const activeNameRef = useRef<string | null>(null);
    const rememberFocus = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        activeNameRef.current = e.currentTarget.name || null;
    }, []);

    useEffect(() => {
        const name = activeNameRef.current;
        if (!name) return;
        const el = document.querySelector<HTMLElement>(`[name="${name}"]`);
        if (el && document.activeElement !== el) el.focus();
    });

    useEffect(() => {
        if (!successOpen) return;
        const prevOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';
        closeBtnRef.current?.focus();
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSuccessOpen(false);
        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('keydown', onKey);
            document.documentElement.style.overflow = prevOverflow;
        };
    }, [successOpen]);

    useEffect(() => {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw) as BriefData;
                setData({ ...parsed, attachments: [] });
                setRestored(true);
            }
        } catch {}
    }, []);

    useDebouncedEffect(() => {
        if (skipPersistRef.current) {
            skipPersistRef.current = false;
            return;
        }
        try {
            const snapshot: Omit<BriefData, 'attachments'> & { attachments?: never[] } = { ...data, attachments: [] as never[] };
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
        } catch {}
    }, [data]);

    const steps = useMemo(
        () =>
            [
                { key: 'projet', label: 'Projet' },
                { key: 'objectifs', label: 'Objectifs & public' },
                { key: 'contenus', label: 'Contenus & fonctionnalités' },
                { key: 'cadrage', label: 'Budget & délai' },
                { key: 'contexte', label: 'Contexte' },
                { key: 'contact', label: 'Coordonnées & RGPD' },
            ] as Array<{ key: StepKey; label: string }>,
        [],
    );

    const stepIndex = steps.findIndex((s) => s.key === step);
    const progress = Math.round(((stepIndex + 1) / steps.length) * 100);

    const stepStatus = useCallback(
        (index: number) => {
            if (index < stepIndex) return 'done';
            if (index === stepIndex) return 'current';
            return 'upcoming';
        },
        [stepIndex],
    );

    const goNext = useCallback(() => {
        setErrors({});
        if (stepIndex < steps.length - 1) {
            const nextStep = steps[stepIndex + 1].key;
            setStep(nextStep);
            pushDl('devis_form_step_next', { step: nextStep });
        }
    }, [stepIndex, steps]);

    const goPrev = useCallback(() => {
        setErrors({});
        if (stepIndex > 0) {
            const prevStep = steps[stepIndex - 1].key;
            setStep(prevStep);
            pushDl('devis_form_step_prev', { step: prevStep });
        }
    }, [stepIndex, steps]);

    const validateStep = useCallback(
        (k: StepKey): boolean => {
            const e: Record<string, string> = {};
            if (k === 'contact') {
                const validation = validateContactIdentity(
                    {
                        name: data.contact.prenom,
                        email: data.contact.email,
                        consent: data.contact.consent,
                    },
                    { requireConsent: true },
                );

                if (validation.error === contactValidationCopy.invalidName) e['contact.prenom'] = briefExpressCopy.errors.firstNameRequired;
                if (validation.error === contactValidationCopy.invalidEmail) e['contact.email'] = briefExpressCopy.errors.invalidEmail;
                if (validation.error === contactValidationCopy.consentRequired) e['contact.consent'] = contactValidationCopy.consentRequired;
            }

            setErrors(e);
            return Object.keys(e).length === 0;
        },
        [data.contact],
    );

    const resetAfterSubmit = useCallback(() => {
        try {
            window.localStorage.removeItem(STORAGE_KEY);
        } catch {}
        setRestored(false);
        skipPersistRef.current = true;
        setData(makeInitialData());
        setStep('projet');
        setErrors({});
        if (fileInputRef.current) fileInputRef.current.value = '';
    }, []);

    const onSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            if (!validateStep('contact')) {
                pushDl('devis_error', { where: 'validation' });
                return;
            }
            if (data.website && data.website.trim().length > 0) {
                pushDl('devis_error', { where: 'honeypot' });
                return;
            }

            setSending(true);
            setStatus('idle');
            setErrorMsg('');

            try {
                const payload = {
                    name: data.contact.prenom || 'Visiteur',
                    email: data.contact.email,
                    message: buildBriefExpressMessage(data).replace(/\n/g, '\r\n'),
                    consent: data.contact.consent,
                    confirm_email: '',
                };
                const validation = validateContactSubmission(payload, { requireConsent: true });
                if (!validation.normalized) {
                    setStatus('error');
                    setErrorMsg(validation.error || 'Impossible d’envoyer le brief pour l’instant.');
                    setSending(false);
                    return;
                }

                const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                const json = (await res.json()) as { success?: boolean; error?: string };

                if (res.ok && json?.success) {
                    setStatus('ok');
                    pushDl('devis_form_submit', { ok: true });
                    resetAfterSubmit();
                    setSuccessOpen(true);
                } else {
                    setStatus('error');
                    setErrorMsg(json?.error || 'Impossible d’envoyer le brief pour l’instant.');
                    pushDl('devis_error', { where: 'api_contact', msg: json?.error });
                }
            } catch {
                setStatus('error');
                setErrorMsg('Erreur réseau. Réessaie dans un instant.');
                pushDl('devis_error', { where: 'network' });
            } finally {
                setSending(false);
            }
        },
        [data, resetAfterSubmit, validateStep],
    );

    return {
        closeBtnRef,
        data,
        errorMsg,
        errors,
        fileInputRef,
        goNext,
        goPrev,
        onSubmit,
        progress,
        rememberFocus,
        restored,
        sending,
        setData,
        setStep,
        setSuccessOpen,
        status,
        step,
        stepIndex,
        stepStatus,
        steps,
        successOpen,
        validateStep,
    };
}
