'use client';

import { buildBriefExpressMessage } from '@/application/contact/services/buildBriefExpressMessage';
import {
    briefExpressSteps,
    makeInitialBriefData,
    sanitizeBriefData,
    validateBriefExpressStep,
    type BriefData,
    type ContactPref,
    type ContentsReady,
    type GoalKey,
    type PriorityKey,
    type StepKey,
} from '@/application/contact/services/briefExpressForm';
import { validateContactSubmission } from '@/application/contact/services/contactValidation';
import { briefExpressCopy } from '@/infrastructure/content/devis-copy';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type { BriefData, ContactPref, ContentsReady, GoalKey, PriorityKey, StepKey };

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

export const fileAcceptOK = (file: File) => /\.(pdf|docx?|zip)$/i.test(file.name);
export const fileSizeOK = (file: File, maxMB = 10) => file.size <= maxMB * 1024 * 1024;
export const pickValidBriefFiles = (files: File[]) => files.filter((file) => fileAcceptOK(file) && fileSizeOK(file));

export function trackBriefExpress(event: string, detail?: PushDetail) {
    pushDl(event, detail);
}

export function useBriefExpressForm() {
    const [data, setData] = useState<BriefData>(makeInitialBriefData);
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
                const parsed = JSON.parse(raw) as unknown;
                const restoredData = sanitizeBriefData(parsed);
                setData({ ...restoredData, attachments: [] });
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

    const steps = useMemo(() => briefExpressSteps, []);

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

    const validateStep = useCallback(
        (k: StepKey): boolean => {
            const stepErrors = validateBriefExpressStep(k, data);

            setErrors(stepErrors);
            return Object.keys(stepErrors).length === 0;
        },
        [data],
    );

    const goNext = useCallback(() => {
        const currentStep = steps[stepIndex]?.key;
        if (!currentStep) return;

        const isStepValid = validateStep(currentStep);
        if (!isStepValid) {
            pushDl('devis_error', { where: 'step_validation', step: currentStep });
            return;
        }

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
    }, [stepIndex, steps, validateStep]);

    const resetAfterSubmit = useCallback(() => {
        try {
            window.localStorage.removeItem(STORAGE_KEY);
        } catch {}
        setRestored(false);
        skipPersistRef.current = true;
        setData(makeInitialBriefData());
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
            const sanitizedData = sanitizeBriefData(data);

            if (sanitizedData.website && sanitizedData.website.trim().length > 0) {
                pushDl('devis_error', { where: 'honeypot' });
                return;
            }

            setSending(true);
            setStatus('idle');
            setErrorMsg('');

            try {
                const payload = {
                    name: sanitizedData.contact.prenom || briefExpressCopy.submission.visitorFallbackName,
                    email: sanitizedData.contact.email,
                    message: buildBriefExpressMessage(sanitizedData).replace(/\n/g, '\r\n'),
                    consent: sanitizedData.contact.consent,
                    confirm_email: '',
                };
                const validation = validateContactSubmission(payload, { requireConsent: true });
                if (!validation.normalized) {
                    setStatus('error');
                    setErrorMsg(validation.error || briefExpressCopy.submission.fallbackError);
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
                    setErrorMsg(json?.error || briefExpressCopy.submission.fallbackError);
                    pushDl('devis_error', { where: 'api_contact', msg: json?.error });
                }
            } catch {
                setStatus('error');
                setErrorMsg(briefExpressCopy.submission.networkError);
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
