// src/components/sections/devis/BriefExpress.tsx
'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ClipboardList, ChevronRight, ArrowLeft, Send, Calendar, Globe, Upload, RefreshCw, X, CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// --------- Tracking (privacy-first)
declare global {
    interface Window {
        dataLayer?: Array<Record<string, unknown>>;
    }
}
const pushDl = (event: string, detail?: Record<string, unknown>) => window?.dataLayer?.push(detail ? { event, ...detail } : { event });

// --------- Types
type GoalKey = 'leads' | 'credibilite' | 'vente' | 'recrutement' | 'autre';
type ContactPref = 'email' | 'appel';
type ContentsReady = 'oui' | 'non' | 'partiel';
type PriorityKey = 'budget' | 'delai' | 'qualite';

type BriefData = {
    // Étape 1 — Projet
    projet: {
        type: 'vitrine' | 'portfolio' | 'ecommerce' | 'autre';
        refonte: boolean;
        urlActuelle: string;
    };

    // Étape 2 — Objectifs & public
    objectifs: {
        goals: Record<GoalKey, boolean>;
        goalsAutre?: string;
        ciblePrincipale?: string;
    };

    // Étape 3 — Contenus & fonctionnalités
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

    // Étape 4 — Budget & délai
    cadrage: {
        budget: '<1000' | '1000-2000' | '2000-4000' | '4000-6000' | '6000+';
        deadline?: string;
        priorite: PriorityKey;
    };

    // Étape 5 — Contexte
    contexte: {
        secteur?: string;
        diff?: string;
        refs?: string;
    };

    // Étape 6 — Coordonnées & RGPD (+ upload)
    contact: {
        prenom: string;
        email: string;
        entreprise?: string;
        paysFuseau?: string;
        preference: ContactPref;
        consent: boolean;
    };

    // Upload (UI uniquement)
    attachments: File[];

    // Anti-spam
    website?: string; // honeypot
};

type StepKey = 'projet' | 'objectifs' | 'contenus' | 'cadrage' | 'contexte' | 'contact';

// --------- Helpers
const STORAGE_KEY = 'brief-express-v1';

const motifStyle: CSSProperties = {
    backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
    backgroundSize: '16px 16px',
    color: 'var(--color-ormat)',
};

function useDebouncedEffect(fn: () => void, deps: React.DependencyList, delay = 350) {
    useEffect(() => {
        const id = setTimeout(fn, delay);
        return () => clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

const assertEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const fileAcceptOK = (file: File) => /\.(pdf|docx?|zip)$/i.test(file.name);
const fileSizeOK = (file: File, maxMB = 10) => file.size <= maxMB * 1024 * 1024;

// État initial (factory)
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

// Construit un message texte unique (utilisé par /api/contact)
function buildMessage(d: BriefData) {
    const yesno = (b: boolean) => (b ? 'oui' : 'non');
    const onoff = (b: boolean) => (b ? 'on' : 'off');
    const objectifs =
        Object.entries(d.objectifs.goals)
            .filter(([, v]) => v)
            .map(([k]) => k)
            .join(', ') || '—';

    return [
        `=== Brief express ===`,
        `• Projet: ${d.projet.type} | Refonte: ${yesno(d.projet.refonte)} | URL: ${d.projet.urlActuelle || '—'}`,
        `• Objectifs: ${objectifs} ${d.objectifs.goalsAutre ? `(autre: ${d.objectifs.goalsAutre})` : ''}`,
        `  Cible: ${d.objectifs.ciblePrincipale || '—'}`,
        `• Contenus prêts: ${d.contenus.contentsReady}`,
        `  Blog:${onoff(d.contenus.blog)} | Formulaire avancé:${onoff(d.contenus.formulaireAvance)} | RDV:${onoff(d.contenus.rdv)} | Paiement:${onoff(d.contenus.paiement)}`,
        `  Multilingue:${onoff(d.contenus.multilingue)} | SEO technique:${onoff(d.contenus.seoTechnique)} | A11y:${onoff(d.contenus.accessibilite)} | Perf:${onoff(
            d.contenus.performances
        )}`,
        `  Intégrations: ${d.contenus.integrations || '—'}`,
        `• Budget: ${d.cadrage.budget} | Deadline: ${d.cadrage.deadline || '—'} | Priorité: ${d.cadrage.priorite}`,
        `• Contexte — Secteur: ${d.contexte.secteur || '—'}`,
        `  Différenciation: ${d.contexte.diff || '—'}`,
        `  Références: ${d.contexte.refs || '—'}`,
        `• Contact — Prénom: ${d.contact.prenom}`,
        `  Email: ${d.contact.email}`,
        `  Entreprise: ${d.contact.entreprise || '—'}`,
        `  Pays/Fuseau: ${d.contact.paysFuseau || '—'}`,
        `  Préférence: ${d.contact.preference}`,
    ].join('\n');
}

// --------- Constantes de données (hors JSX, bien typées)
const GOALS: ReadonlyArray<{ key: GoalKey; text: string }> = [
    { key: 'leads', text: 'Générer des leads' },
    { key: 'credibilite', text: 'Renforcer la crédibilité' },
    { key: 'vente', text: 'Vendre en ligne' },
    { key: 'recrutement', text: 'Recruter' },
    { key: 'autre', text: 'Autre' },
];

const CONTENTS_READY: ReadonlyArray<ContentsReady> = ['oui', 'non', 'partiel'];

const FEATURES: ReadonlyArray<{ key: keyof BriefData['contenus']; text: string }> = [
    { key: 'blog', text: 'Blog' },
    { key: 'formulaireAvance', text: 'Formulaire avancé' },
    { key: 'rdv', text: 'Prise de RDV' },
    { key: 'paiement', text: 'Paiement en ligne' },
    { key: 'multilingue', text: 'Multilingue' },
    { key: 'seoTechnique', text: 'SEO technique' },
    { key: 'accessibilite', text: 'Accessibilité' },
    { key: 'performances', text: 'Performances' },
];

const BUDGETS: ReadonlyArray<{ value: BriefData['cadrage']['budget']; text: string }> = [
    { value: '<1000', text: '< 1 000 €' },
    { value: '1000-2000', text: '1 000 – 2 000 €' },
    { value: '2000-4000', text: '2 000 – 4 000 €' },
    { value: '4000-6000', text: '4 000 – 6 000 €' },
    { value: '6000+', text: '6 000 €+' },
];

const PRIORITIES: ReadonlyArray<PriorityKey> = ['budget', 'delai', 'qualite'];

// --------- Component
export default function BriefExpressSection({ id = 'brief-express', className }: { id?: string; className?: string }) {
    // ========= State
    const [data, setData] = useState<BriefData>(makeInitialData);
    const [step, setStep] = useState<StepKey>('projet');
    const [restored, setRestored] = useState<boolean>(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    // submit state
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    // éviter de réécrire le localStorage juste après reset
    const skipPersistRef = useRef(false);

    // ——— Modale de succès
    const [successOpen, setSuccessOpen] = useState(false);
    const closeBtnRef = useRef<HTMLButtonElement | null>(null);

    // ✅ Pousser un seul event au montage
    useEffect(() => {
        pushDl('devis_form_start');
    }, []);

    // ---------- Hot-fix : mémoriser & restaurer le focus si ça remonte
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

    // Accessibilité (focus, ESC) + scroll lock pendant la modale
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

    // ------ Restore from localStorage
    useEffect(() => {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw) as BriefData;
                setData({ ...parsed, attachments: [] }); // Files non sérialisables
                setRestored(true);
            }
        } catch {
            // ignore
        }
    }, []);

    // ------ Persist to localStorage (debounced) — on enlève les attachments
    useDebouncedEffect(() => {
        if (skipPersistRef.current) {
            skipPersistRef.current = false;
            return;
        }
        try {
            const snapshot: Omit<BriefData, 'attachments'> & { attachments?: never[] } = { ...data, attachments: [] as never[] };
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
        } catch {
            // ignore
        }
    }, [data]);

    // ------ Steps model
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
        []
    );

    const stepIndex = steps.findIndex((s) => s.key === step);
    const progress = Math.round(((stepIndex + 1) / steps.length) * 100);

    // ------ Nav
    const goNext = useCallback(() => {
        setErrors({});
        if (stepIndex < steps.length - 1) {
            setStep(steps[stepIndex + 1].key);
            pushDl('devis_form_step_next', { step: steps[stepIndex + 1].key });
        }
    }, [stepIndex, steps]);

    const goPrev = useCallback(() => {
        setErrors({});
        if (stepIndex > 0) {
            setStep(steps[stepIndex - 1].key);
            pushDl('devis_form_step_prev', { step: steps[stepIndex - 1].key });
        }
    }, [stepIndex, steps]);

    // ------ Validation douce (step-level)
    const validateStep = useCallback(
        (k: StepKey): boolean => {
            const e: Record<string, string> = {};
            if (k === 'contact') {
                if (!data.contact.prenom.trim()) e['contact.prenom'] = 'Indique ton prénom.';
                if (!data.contact.email.trim() || !assertEmail(data.contact.email)) e['contact.email'] = 'Email invalide.';
                if (!data.contact.consent) e['contact.consent'] = 'Nécessaire pour traiter ta demande.';
            }
            setErrors(e);
            return Object.keys(e).length === 0;
        },
        [data.contact]
    );

    // ------ Reset complet après submit OK (et purge du brouillon) — sans scroll
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

    // ------ Submit → envoi sur /api/contact
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep('contact')) {
            pushDl('devis_error', { where: 'validation' });
            return;
        }
        // Honeypot
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
                message: buildMessage(data).replace(/\n/g, '\r\n'), // CRLF pour l'email
                consent: data.contact.consent,
                confirm_email: '', // honeypot (vide)
            };

            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const json = (await res.json()) as { success?: boolean; error?: string };

            if (res.ok && json?.success) {
                setStatus('ok');
                pushDl('devis_form_submit', { ok: true });
                resetAfterSubmit(); // reset complet mais on ne bouge pas le scroll
                setSuccessOpen(true); // ouvre la modale de succès
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
    };

    // ------ UI pieces
    const Badge = ({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) => (
        <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/40 rounded-full px-4 py-1">
            <Icon className="w-3.5 h-3.5" aria-hidden />
            {children}
        </span>
    );

    const LinedCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <article className="relative overflow-hidden rounded-[22px] border border-sauge/40 bg-background p-5 md:p-6 shadow-sm">
            <div className="pointer-events-none absolute inset-0 opacity-10" style={motifStyle} aria-hidden />
            {children}
        </article>
    );

    const FieldError = ({ name }: { name: string }) =>
        errors[name] ? (
            <p className="mt-1 text-xs text-terracotta" role="alert">
                {errors[name]}
            </p>
        ) : null;

    // ------ Steps UIs
    const StepProjet = (
        <fieldset>
            <legend className="text-sm font-semibold text-foreground">Projet</legend>
            <div className="mt-3 grid gap-3">
                {/* Type */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['vitrine', 'portfolio', 'ecommerce', 'autre'] as const).map((t) => (
                        <label key={t} className="inline-flex items-center gap-2 rounded-xl border border-sauge/40 bg-background px-3 py-2 cursor-pointer hover:bg-sauge/10">
                            <input
                                type="radio"
                                name="projet.type"
                                className="size-4 accent-sauge"
                                checked={data.projet.type === t}
                                onChange={() => setData((d) => ({ ...d, projet: { ...d.projet, type: t } }))}
                            />
                            <span className="text-sm capitalize">{t}</span>
                        </label>
                    ))}
                </div>

                {/* Refonte */}
                <label className="inline-flex items-center gap-3 rounded-xl border border-sauge/40 bg-background px-3 py-2 cursor-pointer hover:bg-sauge/10 w-fit">
                    <input
                        type="checkbox"
                        className="size-4 accent-sauge"
                        name="projet.refonte"
                        checked={data.projet.refonte}
                        onChange={(e) => setData((d) => ({ ...d, projet: { ...d.projet, refonte: e.target.checked } }))}
                    />
                    <span className="text-sm">C’est une refonte</span>
                </label>

                {/* URL actuelle */}
                <label className="block">
                    <span className="text-xs text-foreground/80">URL actuelle (si existante)</span>
                    <input
                        type="url"
                        name="projet.urlActuelle"
                        inputMode="url"
                        placeholder="https://exemple.com"
                        autoComplete="url"
                        onFocus={rememberFocus}
                        className="mt-1 w-full rounded-xl border border-sauge/40 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40"
                        value={data.projet.urlActuelle}
                        onChange={(e) => setData((d) => ({ ...d, projet: { ...d.projet, urlActuelle: e.target.value } }))}
                    />
                </label>
            </div>
        </fieldset>
    );

    const StepObjectifs = (
        <fieldset>
            <legend className="text-sm font-semibold text-foreground">Objectifs & public</legend>
            <div className="mt-3 grid gap-3">
                {/* Goals */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {GOALS.filter((g) => g.key !== 'autre').map(({ key, text }) => (
                        <label key={key} className="inline-flex items-center gap-3 rounded-xl border border-sauge/40 bg-background px-3 py-2 cursor-pointer hover:bg-sauge/10">
                            <input
                                type="checkbox"
                                className="size-4 accent-sauge"
                                name={`objectifs.goals.${key}`}
                                checked={data.objectifs.goals[key]}
                                onChange={(e) => setData((d) => ({ ...d, objectifs: { ...d.objectifs, goals: { ...d.objectifs.goals, [key]: e.target.checked } } }))}
                            />
                            <span className="text-sm">{text}</span>
                        </label>
                    ))}
                </div>

                {/* Goal autre */}
                <label className="block">
                    <span className="text-xs text-foreground/80">Autre objectif (optionnel)</span>
                    <input
                        type="text"
                        name="objectifs.goalsAutre"
                        placeholder="Ex. notoriété locale, prise de parole média…"
                        onFocus={rememberFocus}
                        className="mt-1 w-full rounded-xl border border-sauge/40 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40"
                        value={data.objectifs.goalsAutre ?? ''}
                        onChange={(e) => {
                            const val = e.target.value;
                            setData((d) => ({
                                ...d,
                                objectifs: {
                                    ...d.objectifs,
                                    goalsAutre: val,
                                    goals: { ...d.objectifs.goals, autre: val.trim().length > 0 },
                                },
                            }));
                        }}
                    />
                </label>

                {/* Cible */}
                <label className="block">
                    <span className="text-xs text-foreground/80">Cible principale (1 phrase)</span>
                    <input
                        type="text"
                        name="objectifs.ciblePrincipale"
                        placeholder="Ex. dirigeants PME en B2B, étudiants…"
                        onFocus={rememberFocus}
                        className="mt-1 w-full rounded-xl border border-sauge/40 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40"
                        value={data.objectifs.ciblePrincipale ?? ''}
                        onChange={(e) => setData((d) => ({ ...d, objectifs: { ...d.objectifs, ciblePrincipale: e.target.value } }))}
                    />
                </label>
            </div>
        </fieldset>
    );

    const StepContenus = (
        <fieldset>
            <legend className="text-sm font-semibold text-foreground">Contenus & fonctionnalités</legend>
            <div className="mt-3 grid gap-3">
                {/* Contents ready */}
                <div>
                    <span className="text-xs text-foreground/80 mr-3">Contenus prêts ?</span>
                    <div className="mt-2 inline-flex rounded-2xl border border-sauge/40 bg-background p-1">
                        {CONTENTS_READY.map((v) => (
                            <button
                                key={v}
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                aria-pressed={data.contenus.contentsReady === v}
                                onClick={() => setData((d) => ({ ...d, contenus: { ...d.contenus, contentsReady: v } }))}
                                className={cn(
                                    'inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs tracking-[0.14em] uppercase font-semibold cursor-pointer',
                                    data.contenus.contentsReady === v ? 'bg-sauge text-background shadow-sm' : 'text-sauge hover:bg-sauge/10'
                                )}
                            >
                                {v}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {FEATURES.map(({ key, text }) => (
                        <label key={key} className="inline-flex items-center gap-3 rounded-xl border border-sauge/40 bg-background px-3 py-2 cursor-pointer hover:bg-sauge/10">
                            <input
                                type="checkbox"
                                className="size-4 accent-sauge"
                                name={`contenus.${key}`}
                                checked={Boolean(data.contenus[key])}
                                onChange={(e) => setData((d) => ({ ...d, contenus: { ...d.contenus, [key]: e.target.checked } }))}
                            />
                            <span className="text-sm">{text}</span>
                        </label>
                    ))}
                </div>

                {/* Integrations */}
                <label className="block">
                    <span className="text-xs text-foreground/80">Intégrations (Calendly, newsletter, CRM…)</span>
                    <input
                        type="text"
                        name="contenus.integrations"
                        placeholder="Ex. Calendly, Mailerlite, HubSpot…"
                        onFocus={rememberFocus}
                        className="mt-1 w-full rounded-xl border border-sauge/40 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40"
                        value={data.contenus.integrations ?? ''}
                        onChange={(e) => setData((d) => ({ ...d, contenus: { ...d.contenus, integrations: e.target.value } }))}
                    />
                </label>
            </div>
        </fieldset>
    );

    const StepCadrage = (
        <fieldset>
            <legend className="text-sm font-semibold text-foreground">Budget & délai</legend>
            <div className="mt-3 grid gap-3">
                {/* Budget */}
                <div>
                    <span className="text-xs text-foreground/80">Plage budgétaire</span>
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {BUDGETS.map(({ value, text }) => (
                            <label
                                key={value}
                                className="inline-flex items-center gap-3 rounded-xl border border-sauge/40 bg-background px-3 py-2 cursor-pointer hover:bg-sauge/10"
                            >
                                <input
                                    type="radio"
                                    className="size-4 accent-sauge"
                                    name="cadrage.budget"
                                    checked={data.cadrage.budget === value}
                                    onChange={() => setData((d) => ({ ...d, cadrage: { ...d.cadrage, budget: value } }))}
                                />
                                <span className="text-sm">{text}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Deadline */}
                <label className="block">
                    <span className="text-xs text-foreground/80">Deadline souhaitée (mois/trim.)</span>
                    <input
                        type="month"
                        name="cadrage.deadline"
                        onFocus={rememberFocus}
                        className="mt-1 w-full rounded-xl border border-sauge/40 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40"
                        value={data.cadrage.deadline ?? ''}
                        onChange={(e) => setData((d) => ({ ...d, cadrage: { ...d.cadrage, deadline: e.target.value } }))}
                    />
                </label>

                {/* Priorité */}
                <div>
                    <span className="text-xs text-foreground/80 mr-3">Priorité principale</span>
                    <div className="mt-2 inline-flex rounded-2xl border border-sauge/40 bg-background p-1 ">
                        {PRIORITIES.map((v) => (
                            <button
                                key={v}
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                aria-pressed={data.cadrage.priorite === v}
                                onClick={() => setData((d) => ({ ...d, cadrage: { ...d.cadrage, priorite: v } }))}
                                className={cn(
                                    'inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs tracking-[0.14em] uppercase font-semibold cursor-pointer',
                                    data.cadrage.priorite === v ? 'bg-sauge text-background shadow-sm' : 'text-sauge hover:bg-sauge/10'
                                )}
                            >
                                {v}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </fieldset>
    );

    const StepContexte = (
        <fieldset>
            <legend className="text-sm font-semibold text-foreground">Contexte</legend>
            <div className="mt-3 grid gap-3">
                <label className="block">
                    <span className="text-xs text-foreground/80">Secteur</span>
                    <input
                        type="text"
                        name="contexte.secteur"
                        onFocus={rememberFocus}
                        className="mt-1 w-full rounded-xl border border-sauge/40 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40"
                        placeholder="Ex. artisanat, conseil B2B, formation…"
                        value={data.contexte.secteur ?? ''}
                        onChange={(e) => setData((d) => ({ ...d, contexte: { ...d.contexte, secteur: e.target.value } }))}
                    />
                </label>

                <label className="block">
                    <span className="text-xs text-foreground/80">Ce qui vous différencie</span>
                    <textarea
                        rows={3}
                        name="contexte.diff"
                        onFocus={rememberFocus}
                        className="mt-1 w-full rounded-xl border border-sauge/40 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40"
                        placeholder="En 2–3 phrases."
                        value={data.contexte.diff ?? ''}
                        onChange={(e) => setData((d) => ({ ...d, contexte: { ...d.contexte, diff: e.target.value } }))}
                    />
                </label>

                <label className="block">
                    <span className="text-xs text-foreground/80">Références aimées (1–3 liens)</span>
                    <textarea
                        rows={2}
                        name="contexte.refs"
                        onFocus={rememberFocus}
                        className="mt-1 w-full rounded-xl border border-sauge/40 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40"
                        placeholder="https://site1.com, https://site2.com…"
                        value={data.contexte.refs ?? ''}
                        onChange={(e) => setData((d) => ({ ...d, contexte: { ...d.contexte, refs: e.target.value } }))}
                    />
                </label>
            </div>
        </fieldset>
    );

    const StepContact = (
        <fieldset>
            <legend className="text-sm font-semibold text-foreground">Coordonnées & RGPD</legend>
            <div className="mt-3 grid gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="block">
                        <span className="text-xs text-foreground/80">Prénom *</span>
                        <input
                            type="text"
                            name="contact.prenom"
                            autoComplete="given-name"
                            onFocus={rememberFocus}
                            className={cn(
                                'mt-1 w-full rounded-xl border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2',
                                errors['contact.prenom'] ? 'border-terracotta focus-visible:ring-terracotta/40' : 'border-sauge/40 bg-background focus-visible:ring-sauge/40'
                            )}
                            value={data.contact.prenom}
                            onChange={(e) => setData((d) => ({ ...d, contact: { ...d.contact, prenom: e.target.value } }))}
                            aria-invalid={Boolean(errors['contact.prenom'])}
                        />
                        <FieldError name="contact.prenom" />
                    </label>

                    <label className="block">
                        <span className="text-xs text-foreground/80">Email *</span>
                        <input
                            type="email"
                            name="contact.email"
                            inputMode="email"
                            autoComplete="email"
                            onFocus={rememberFocus}
                            className={cn(
                                'mt-1 w-full rounded-xl border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2',
                                errors['contact.email'] ? 'border-terracotta focus-visible:ring-terracotta/40' : 'border-sauge/40 bg-background focus-visible:ring-sauge/40'
                            )}
                            value={data.contact.email}
                            onChange={(e) => setData((d) => ({ ...d, contact: { ...d.contact, email: e.target.value } }))}
                            aria-invalid={Boolean(errors['contact.email'])}
                        />
                        <FieldError name="contact.email" />
                    </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="block">
                        <span className="text-xs text-foreground/80">Entreprise (optionnel)</span>
                        <input
                            type="text"
                            name="contact.entreprise"
                            autoComplete="organization"
                            onFocus={rememberFocus}
                            className="mt-1 w-full rounded-xl border border-sauge/40 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40"
                            value={data.contact.entreprise ?? ''}
                            onChange={(e) => setData((d) => ({ ...d, contact: { ...d.contact, entreprise: e.target.value } }))}
                        />
                    </label>

                    <label className="block">
                        <span className="text-xs text-foreground/80">Pays / fuseau horaire</span>
                        <input
                            type="text"
                            name="contact.paysFuseau"
                            placeholder="Ex. France (CET), Québec (ET)…"
                            onFocus={rememberFocus}
                            className="mt-1 w-full rounded-xl border border-sauge/40 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40"
                            value={data.contact.paysFuseau ?? ''}
                            onChange={(e) => setData((d) => ({ ...d, contact: { ...d.contact, paysFuseau: e.target.value } }))}
                        />
                    </label>
                </div>

                {/* Préférence de contact */}
                <div>
                    <span className="text-xs text-foreground/80">Préférence de contact</span>
                    <div className="mt-2 inline-flex rounded-2xl border border-sauge/40 bg-background p-1">
                        {(['email', 'appel'] as ContactPref[]).map((v) => (
                            <button
                                key={v}
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                aria-pressed={data.contact.preference === v}
                                onClick={() => setData((d) => ({ ...d, contact: { ...d.contact, preference: v } }))}
                                className={cn(
                                    'inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs tracking-[0.14em] uppercase font-semibold cursor-pointer',
                                    data.contact.preference === v ? 'bg-sauge text-background shadow-sm' : 'text-sauge hover:bg-sauge/10'
                                )}
                            >
                                {v === 'email' ? <Globe className="w-4 h-4" aria-hidden /> : <Calendar className="w-4 h-4" aria-hidden />}
                                {v}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Upload (UI) */}
                <div>
                    <span className="text-xs text-foreground/80">Pièces jointes (PDF/DOCX/ZIP, max 10 Mo)</span>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx,.zip"
                            className="hidden"
                            onChange={(e) => {
                                const files = Array.from(e.target.files ?? []);
                                const kept: File[] = [];
                                for (const f of files) if (fileAcceptOK(f) && fileSizeOK(f)) kept.push(f);
                                setData((d) => ({ ...d, attachments: [...d.attachments, ...kept] }));
                                if (kept.length > 0) pushDl('devis_upload', { count: kept.length });
                                if (fileInputRef.current) fileInputRef.current.value = '';
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className={cn(
                                'inline-flex items-center gap-2 rounded-2xl border border-sauge/40 bg-background px-3 py-2 text-sm hover:bg-sauge/10 cursor-pointer',
                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40'
                            )}
                        >
                            <Upload className="w-4 h-4" aria-hidden />
                            Ajouter des fichiers
                        </button>

                        {data.attachments.length > 0 && <div className="text-xs text-foreground/90">{data.attachments.length} fichier(s) sélectionné(s)</div>}
                    </div>
                    <p className="mt-1 text-[11px] text-foreground/60">
                        (Envoi des fichiers séparément si besoin — ici, on transmet le brief texte. Tu recevras un lien pour partager les pièces jointes.)
                    </p>
                </div>

                {/* Consent */}
                <label className="mt-2 inline-flex items-start gap-3 rounded-xl border border-sauge/50 bg-background px-3 py-2 cursor-pointer">
                    <input
                        type="checkbox"
                        name="contact.consent"
                        className="mt-0.5 size-4 accent-sauge"
                        checked={data.contact.consent}
                        onChange={(e) => setData((d) => ({ ...d, contact: { ...d.contact, consent: e.target.checked } }))}
                        aria-invalid={Boolean(errors['contact.consent'])}
                    />
                    <span className="text-sm">
                        J’accepte le traitement de mes données pour répondre à ma demande de devis.
                        <br />
                        <span className="text-xs text-foreground/80">
                            Les données sont traitées conformément à la{' '}
                            <Link href="/politique-confidentialite" className="underline underline-offset-4">
                                politique de confidentialité
                            </Link>
                            .
                        </span>
                    </span>
                </label>
                <FieldError name="contact.consent" />

                {/* Honeypot */}
                <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                    name="website"
                    value={data.website ?? ''}
                    onChange={(e) => setData((d) => ({ ...d, website: e.target.value }))}
                />
            </div>
        </fieldset>
    );

    const renderStep = () => {
        switch (step) {
            case 'projet':
                return StepProjet;
            case 'objectifs':
                return StepObjectifs;
            case 'contenus':
                return StepContenus;
            case 'cadrage':
                return StepCadrage;
            case 'contexte':
                return StepContexte;
            case 'contact':
                return StepContact;
        }
    };

    // ------ Render
    return (
        <section id={id} className={cn('relative py-12 md:py-20 px-6 md:px-8 lg:px-[100px] xl:px-[150px]', className)} aria-labelledby="brief-express-title">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background pointer-events-none" aria-hidden />
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0 pointer-events-none" aria-hidden />
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0 pointer-events-none" aria-hidden>
                <Image src="/deco/about-wave.png" alt="" role="presentation" fill priority className="object-cover" sizes="100vw" />
            </div>
            <div className="relative max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center lg:text-left">
                    <Badge icon={ClipboardList}>Brief express</Badge>
                    <h2 id="brief-express-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Le minimum utile pour un devis fiable
                    </h2>
                    <p className="mt-4 text-foreground/80">
                        4–6 minutes, sauvegarde automatique, validation douce. Pas besoin d’écrire un roman — <em>10–20 mots suffisent</em> quand c’est demandé.
                    </p>

                    {restored && (
                        <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-sauge/50 bg-foreground/10 text-foreground px-3 py-1.5 text-[11px] font-semibold">
                            <RefreshCw className="w-3.5 h-3.5" aria-hidden /> Brouillon récupéré depuis cet appareil.
                        </p>
                    )}
                </div>

                {/* Progress (sans animation) */}
                <div className="flex items-center justify-between gap-4">
                    <div className="w-full h-2 rounded-full bg-foreground/10 overflow-hidden">
                        <div className="h-full bg-sauge" style={{ width: `${progress}%` }} aria-hidden />
                    </div>
                    <span className="min-w-[52px] text-xs text-foreground/80 text-right">{progress}%</span>
                </div>

                {/* Form card */}
                <LinedCard>
                    <form onSubmit={onSubmit} className="relative z-[1] grid gap-6">
                        {/* Étapes */}
                        {renderStep()}

                        {/* Footer nav */}
                        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                {stepIndex > 0 ? (
                                    <button
                                        type="button"
                                        onClick={goPrev}
                                        className="inline-flex items-center gap-2 rounded-2xl border border-sauge/40 bg-background px-3 py-2 text-sm hover:bg-sauge/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40 cursor-pointer"
                                    >
                                        <ArrowLeft className="w-4 h-4" aria-hidden />
                                        Retour
                                    </button>
                                ) : (
                                    <span aria-hidden className="inline-block w-[110px]" />
                                )}
                            </div>

                            {step !== 'contact' ? (
                                <button
                                    type="button"
                                    onClick={goNext}
                                    className={cn(
                                        'group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl cursor-pointer',
                                        'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                                        'border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]',
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                                    )}
                                >
                                    Continuer
                                    <ChevronRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" aria-hidden />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={sending}
                                    aria-busy={sending}
                                    className={cn(
                                        'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl cursor-pointer',
                                        'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                                        'border-b-2 border-r-2 border-ormat',
                                        'disabled:opacity-60 disabled:cursor-not-allowed'
                                    )}
                                >
                                    {sending ? 'Envoi…' : 'Envoyer mon brief'}
                                    {!sending && <Send className="h-4 w-4" aria-hidden />}
                                </button>
                            )}
                        </div>

                        {/* Messages inline */}
                        {status === 'error' && <p className="text-xs text-terracotta font-medium">{errorMsg || 'Oups, ça a échoué.'}</p>}
                        {/* pas de message de succès inline, on affiche une modale */}
                    </form>
                </LinedCard>

                {/* CTA secondaire */}
                <div className="flex items-center justify-between gap-4">
                    <p className="text-xs text-foreground/60">Tu préfères un échange rapide ? Réserve un créneau — on balise ensemble le périmètre avant chiffrage.</p>
                    <Link
                        href="#prendre-un-creneau"
                        className="inline-flex items-center gap-2 rounded-2xl border border-sauge/40 bg-background px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] hover:bg-sauge/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40"
                        onClick={() => pushDl('devis_call_click', { origin: 'brief_express' })}
                    >
                        Réserver un appel
                        <ChevronRight className="w-4 h-4" aria-hidden />
                    </Link>
                </div>
            </div>

            {/* ===== Modale de confirmation ===== */}
            {successOpen && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="brief-success-title"
                    aria-describedby="brief-success-desc"
                >
                    <button aria-label="Fermer la fenêtre" className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity" onClick={() => setSuccessOpen(false)} />
                    <div className="relative mx-4 w-full max-w-md rounded-2xl border border-sauge/30 bg-background shadow-xl">
                        <div className="absolute right-2 top-2">
                            <button
                                ref={closeBtnRef}
                                onClick={() => setSuccessOpen(false)}
                                className="inline-flex items-center justify-center rounded-full p-2 text-foreground/60 hover:text-foreground hover:bg-sauge/10 cursor-pointer"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="px-6 pt-8 pb-6 text-center">
                            <div className="mx-auto grid size-12 place-content-center rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <CheckCircle2 className="h-6 w-6" aria-hidden />
                            </div>
                            <h3 id="brief-success-title" className="mt-4 font-title text-xl font-bold text-terracotta tracking-widest">
                                Brief envoyé
                            </h3>
                            <p id="brief-success-desc" className="mt-2 text-sm text-foreground/80">
                                Merci ! Je te reviens sous 24–48h ouvrées. Tu peux aussi réserver un créneau si tu préfères.
                            </p>

                            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                                <a
                                    href="#prendre-un-creneau"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const el = document.getElementById('prendre-un-creneau');
                                        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        (el as HTMLElement | null)?.focus?.({ preventScroll: true });
                                        setSuccessOpen(false);
                                    }}
                                    className={cn(
                                        'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl',
                                        'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                                        'border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                                    )}
                                >
                                    Réserver un appel
                                </a>
                                <button
                                    onClick={() => setSuccessOpen(false)}
                                    className="inline-flex items-center justify-center rounded-2xl border border-sauge/40 bg-sauge/10 px-4 py-2 text-sm font-semibold text-sauge hover:bg-sauge/20 cursor-pointer"
                                >
                                    Fermer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
