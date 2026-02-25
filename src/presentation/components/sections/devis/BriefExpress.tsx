'use client';

import React, { type CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/shared/utils/cn';
import { ClipboardList, ChevronRight, ArrowLeft, Send, Calendar, Globe, Upload, RefreshCw, X, CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { briefExpressCopy } from '@/infrastructure/content/devis-copy';
import {
    fileAcceptOK,
    fileSizeOK,
    trackBriefExpress,
    useBriefExpressForm,
    type BriefData,
    type ContactPref,
    type ContentsReady,
    type GoalKey,
    type PriorityKey,
} from '@/presentation/hooks/useBriefExpressForm';

const motifStyle: CSSProperties = {
    backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
    backgroundSize: '16px 16px',
    color: 'var(--color-ormat)',
};

const GOALS = briefExpressCopy.goals satisfies ReadonlyArray<{ key: GoalKey; text: string }>;
const CONTENTS_READY = briefExpressCopy.contentsReadyOptions satisfies ReadonlyArray<ContentsReady>;
const FEATURES = briefExpressCopy.features satisfies ReadonlyArray<{ key: keyof BriefData['contenus']; text: string }>;
const BUDGETS = briefExpressCopy.budgets satisfies ReadonlyArray<{ value: BriefData['cadrage']['budget']; text: string }>;
const PRIORITIES = briefExpressCopy.priorities satisfies ReadonlyArray<PriorityKey>;

export default function BriefExpressSection({ id = 'brief-express', className }: { id?: string; className?: string }) {
    const {
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
    } = useBriefExpressForm();

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

    const StepProjet = (
        <fieldset>
            <legend className="text-sm font-semibold text-foreground">Projet</legend>
            <div className="mt-3 grid gap-3">
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
                                    data.contenus.contentsReady === v ? 'bg-sauge text-background shadow-sm' : 'text-sauge hover:bg-sauge/10',
                                )}
                            >
                                {v}
                            </button>
                        ))}
                    </div>
                </div>

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
                                    data.cadrage.priorite === v ? 'bg-sauge text-background shadow-sm' : 'text-sauge hover:bg-sauge/10',
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
                                errors['contact.prenom'] ? 'border-terracotta focus-visible:ring-terracotta/40' : 'border-sauge/40 bg-background focus-visible:ring-sauge/40',
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
                                errors['contact.email'] ? 'border-terracotta focus-visible:ring-terracotta/40' : 'border-sauge/40 bg-background focus-visible:ring-sauge/40',
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
                                    data.contact.preference === v ? 'bg-sauge text-background shadow-sm' : 'text-sauge hover:bg-sauge/10',
                                )}
                            >
                                {v === 'email' ? <Globe className="w-4 h-4" aria-hidden /> : <Calendar className="w-4 h-4" aria-hidden />}
                                {v}
                            </button>
                        ))}
                    </div>
                </div>

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
                                if (kept.length > 0) trackBriefExpress('devis_upload', { count: kept.length });
                                if (fileInputRef.current) fileInputRef.current.value = '';
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className={cn(
                                'inline-flex items-center gap-2 rounded-2xl border border-sauge/40 bg-background px-3 py-2 text-sm hover:bg-sauge/10 cursor-pointer',
                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40',
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

    return (
        <section id={id} className={cn('relative py-12 md:py-20 px-6 md:px-8 lg:px-25 xl:px-37.5', className)} aria-labelledby="brief-express-title">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-background via-ormat/20 to-background pointer-events-none" aria-hidden />
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

                <div className="flex items-center justify-between gap-4">
                    <div className="w-full h-2 rounded-full bg-foreground/10 overflow-hidden">
                        <div className="h-full bg-sauge" style={{ width: `${progress}%` }} aria-hidden />
                    </div>
                    <span className="min-w-13 text-xs text-foreground/80 text-right">{progress}%</span>
                </div>

                <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3" aria-label="Progression du formulaire">
                    {steps.map((s, i) => {
                        const status = stepStatus(i);
                        return (
                            <li key={s.key} className="rounded-xl border border-sauge/30 bg-background/90 px-3 py-2">
                                <button
                                    type="button"
                                    onClick={() => setStep(s.key)}
                                    className="flex w-full items-center gap-3 text-left cursor-pointer"
                                    aria-current={status === 'current' ? 'step' : undefined}
                                >
                                    <span
                                        className={cn(
                                            'inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold',
                                            status === 'done' && 'border-sauge bg-sauge/15 text-sauge',
                                            status === 'current' && 'border-terracotta bg-terracotta/10 text-terracotta',
                                            status === 'upcoming' && 'border-foreground/20 text-foreground/60',
                                        )}
                                    >
                                        {status === 'done' ? <CheckCircle2 className="h-4 w-4" aria-hidden /> : i + 1}
                                    </span>
                                    <span className="text-sm text-foreground/85">{s.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ol>
                <LinedCard>
                    <form onSubmit={onSubmit} className="relative z-1 grid gap-6">
                        {renderStep()}

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
                                    <span aria-hidden className="inline-block w-27.5" />
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
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
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
                                        'border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]',
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                                        'disabled:opacity-60 disabled:cursor-not-allowed',
                                    )}
                                >
                                    {sending ? 'Envoi…' : 'Envoyer mon brief'}
                                    {!sending && <Send className="h-4 w-4" aria-hidden />}
                                </button>
                            )}
                        </div>

                        {status === 'error' && <p className="text-xs text-terracotta font-medium">{errorMsg || 'Oups, ça a échoué.'}</p>}
                    </form>
                </LinedCard>

                <div className="flex items-center justify-between gap-4">
                    <p className="text-xs text-foreground/60">Tu préfères un échange rapide ? Réserve un créneau — on balise ensemble le périmètre avant chiffrage.</p>
                    <Link
                        href="#prendre-un-creneau"
                        className="inline-flex items-center gap-2 rounded-2xl border border-sauge/40 bg-background px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] hover:bg-sauge/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40"
                        onClick={() => trackBriefExpress('devis_call_click', { origin: 'brief_express' })}
                    >
                        Réserver un appel
                        <ChevronRight className="w-4 h-4" aria-hidden />
                    </Link>
                </div>
            </div>

            {successOpen && (
                <div
                    className="fixed inset-0 z-60 flex items-center justify-center"
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
                                        'border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]',
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
