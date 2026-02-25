'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Cookie, ShieldCheck, BarChart3, BadgeCheck, Box } from 'lucide-react';

/* ------------------------- Types & constantes ------------------------- */

type ConsentModeFlag = 'granted' | 'denied';

type GtagConsentUpdate = {
    ad_storage: ConsentModeFlag;
    ad_user_data: ConsentModeFlag;
    ad_personalization: ConsentModeFlag;
    analytics_storage: ConsentModeFlag;
    functionality_storage: ConsentModeFlag;
    security_storage: ConsentModeFlag;
};

type GtagFn = (command: 'consent', action: 'update', params: GtagConsentUpdate) => void;

interface WindowWithConsent extends Window {
    gtag?: GtagFn;
    dataLayer?: Array<Record<string, unknown>>;
}

type Consent = {
    version: number;
    necessary: true;
    preferences: boolean;
    analytics: boolean;
    functional: boolean;
    marketing: boolean;
    timestamp: string;
};

const COOKIE_NAME = 'ac_consent';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180; // 180 jours (CNIL)
const LEGACY_COOKIES = ['consent_v2', 'cookieyes-consent', 'cky-consent', 'axeptio_all_vendors'];

/* ------------------------------ Utils cookies ------------------------------ */

function readCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const pairs = document.cookie.split(';');
    for (const pair of pairs) {
        const [k, ...rest] = pair.split('=');
        if (!k) continue;
        const key = k.trim();
        if (key === name) {
            return decodeURIComponent(rest.join('=').trim());
        }
    }
    return null;
}

function writeCookie(name: string, value: string, maxAge = COOKIE_MAX_AGE) {
    if (typeof document === 'undefined') return;
    const secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

/** Efface un cookie sur plusieurs combinaisons Path/Domain (best effort) */
function deleteCookieEverywhere(name: string) {
    if (typeof document === 'undefined') return;
    const past = 'Thu, 01 Jan 1970 00:00:00 GMT';
    const base = `${encodeURIComponent(name)}=; Expires=${past}; SameSite=Lax`;
    const paths = ['/', '/app', '/']; // ajoute d’autres chemins si nécessaire
    const host = typeof location !== 'undefined' ? location.hostname : '';
    const domains: Array<string | null> = [null];

    if (host && host.includes('.')) {
        const parts = host.split('.');
        const root = '.' + parts.slice(-2).join('.');
        domains.push(root, '.' + host);
    }

    for (const p of paths) {
        // Sans Domain
        document.cookie = `${base}; Path=${p}`;
        // Avec Domain(s)
        for (const d of domains) {
            if (d) document.cookie = `${base}; Path=${p}; Domain=${d}`;
        }
    }
}

/* ------------------------- Construction du consent ------------------------- */

function toConsent(v?: Partial<Consent>): Consent {
    return {
        version: 1,
        necessary: true,
        preferences: v?.preferences ?? false,
        analytics: v?.analytics ?? false,
        functional: v?.functional ?? false,
        marketing: v?.marketing ?? false,
        timestamp: new Date().toISOString(),
    };
}

/* ----------------- Google Consent Mode v2 (update si présent) ---------------- */

function updateGtagConsent(c: Consent) {
    if (typeof window === 'undefined') return;

    const w = window as WindowWithConsent;

    const payload: GtagConsentUpdate = {
        ad_storage: c.marketing ? 'granted' : 'denied',
        ad_user_data: c.marketing ? 'granted' : 'denied',
        ad_personalization: c.marketing ? 'granted' : 'denied',
        analytics_storage: c.analytics ? 'granted' : 'denied',
        functionality_storage: c.preferences || c.functional ? 'granted' : 'denied',
        security_storage: 'granted',
    };

    if (typeof w.gtag === 'function') {
        w.gtag('consent', 'update', payload);
    }

    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push({ event: 'consent_update', consent: payload });

    // 👇 NEW: préviens l’app que le consentement a changé (CalendlyGate va écouter)
    window.dispatchEvent(new CustomEvent('ac:consent:update', { detail: { consent: c, payload } }));
}

/* ---------------- Purge cookies/stockages non essentiels ---------------- */

const COOKIE_PREFIXES = ['_ga', '_gid', '_gat', '_gcl_', '_fbp', '_cl', '_hj', '_pk_id', '_pk_ses'];
const STORAGE_PREFIXES = ['_ga', 'ga_', 'amp_', 'ajs_', '_hj', 'matomo_', 'clarity_', 'fb_'];

function purgeNonEssentialStorage() {
    // Cookies 1st-party usuels (GA, FB, etc.)
    try {
        const names = document.cookie.split('; ').map((c) => decodeURIComponent(c.split('=')[0]));
        for (const n of names) {
            if (COOKIE_PREFIXES.some((pre) => n.startsWith(pre))) deleteCookieEverywhere(n);
        }
    } catch {}

    // localStorage
    try {
        const toRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i)!;
            if (STORAGE_PREFIXES.some((pre) => k.toLowerCase().startsWith(pre))) toRemove.push(k);
        }
        toRemove.forEach((k) => localStorage.removeItem(k));
    } catch {}

    // sessionStorage
    try {
        const toRemove: string[] = [];
        for (let i = 0; i < sessionStorage.length; i++) {
            const k = sessionStorage.key(i)!;
            if (STORAGE_PREFIXES.some((pre) => k.toLowerCase().startsWith(pre))) toRemove.push(k);
        }
        toRemove.forEach((k) => sessionStorage.removeItem(k));
    } catch {}
}

/** Purge “legacy” avec deleteCookieEverywhere */
function nukeLegacyConsentCookies() {
    LEGACY_COOKIES.forEach(deleteCookieEverywhere);
}

/* --------------------------------- Page --------------------------------- */

export default function CookiePreferencesPage() {
    const [loaded, setLoaded] = useState(false);
    const [saved, setSaved] = useState<'idle' | 'ok'>('idle');

    // États des catégories
    const [preferences, setPreferences] = useState(false);
    const [analytics, setAnalytics] = useState(false);
    const [functional, setFunctional] = useState(false);
    const [marketing, setMarketing] = useState(false);

    // Lecture initiale + migration ancien cookie + purge legacy
    useEffect(() => {
        try {
            // 1) Migration de consent_v2 -> ac_consent si présent et pas encore migré
            const legacy = readCookie('consent_v2');
            const current = readCookie(COOKIE_NAME);
            if (legacy && !current) {
                try {
                    const l = JSON.parse(legacy) as Partial<{ preferences: boolean; analytics: boolean; functional: boolean; marketing: boolean }>;
                    const migrated = toConsent({
                        preferences: !!l.preferences,
                        analytics: !!l.analytics,
                        functional: !!l.functional,
                        marketing: !!l.marketing,
                    });
                    writeCookie(COOKIE_NAME, JSON.stringify(migrated));
                } catch {
                    // ignore parse error
                }
            }

            // 2) Purge des vieux cookies de consentement (domain/path variables)
            nukeLegacyConsentCookies();

            // 3) Lecture de la source officielle
            const raw = readCookie(COOKIE_NAME);
            if (raw) {
                const parsed = JSON.parse(raw) as Consent;
                setPreferences(!!parsed.preferences);
                setAnalytics(!!parsed.analytics);
                setFunctional(!!parsed.functional);
                setMarketing(!!parsed.marketing);
            }

            // 4) Sûreté : si analytics refusé, purge des stockages non essentiels
            if (!(JSON.parse(raw ?? 'null') as Consent | null)?.analytics) {
                purgeNonEssentialStorage();
            }
        } catch {}
        setLoaded(true);
    }, []);

    // Modèle de consent courant (pour debug/affichage)
    const current = useMemo(() => toConsent({ preferences, analytics, functional, marketing }), [preferences, analytics, functional, marketing]);

    // Persistance + MAJ Consent Mode + purge si tout refusé + purge legacy
    function persist(c: Consent) {
        writeCookie(COOKIE_NAME, JSON.stringify(c));
        updateGtagConsent(c);

        if (!c.preferences && !c.analytics && !c.functional && !c.marketing) {
            purgeNonEssentialStorage();
        }

        nukeLegacyConsentCookies();

        setSaved('ok');
        setTimeout(() => setSaved('idle'), 1800);
    }

    // Actions rapides (enregistrent immédiatement)
    const allAccept = () => {
        const c = toConsent({ preferences: true, analytics: true, functional: true, marketing: true });
        setPreferences(true);
        setAnalytics(true);
        setFunctional(true);
        setMarketing(true);
        persist(c);
    };

    const allReject = () => {
        const c = toConsent({ preferences: false, analytics: false, functional: false, marketing: false });
        setPreferences(false);
        setAnalytics(false);
        setFunctional(false);
        setMarketing(false);
        purgeNonEssentialStorage(); // nettoyage immédiat
        persist(c);
    };

    // Sauvegarde pour le cas "je coche/décoche à la main"
    const save = () => persist(toConsent({ preferences, analytics, functional, marketing }));

    return (
        <section id="cookie-preferences" className="relative overflow-x-hidden py-16 md:py-28 px-6 md:px-8 lg:px-25 xl:px-37.5">
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-background via-ormat/20 to-background" aria-hidden />
            {/* Fond or mobile only */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" aria-hidden />
            {/* Vague décorative (md+) */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0" aria-hidden>
                <Image src="/deco/about-wave.png" alt="" fill priority className="object-cover h-auto" />
            </div>

            <div className="relative z-1 max-w-4xl mx-auto space-y-8">
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <Cookie className="w-3.5 h-3.5" aria-hidden />
                        Préférences cookies
                    </span>
                    <h1 className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">Gérer mon consentement</h1>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed">
                        Ici, tu peux choisir ce que tu autorises. Les cookies strictement nécessaires sont toujours actifs. Tes choix sont conservés <strong>6 mois</strong> et tu
                        peux les modifier à tout moment.
                    </p>
                </div>

                {/* Carte catégories */}
                <div className="group relative overflow-hidden rounded-[22px] border border-sauge/30 bg-background/70 p-5 md:p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    {/* motif discret */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                        aria-hidden
                    />
                    {/* barre animée */}
                    <div className="relative h-0.5 overflow-hidden">
                        <div className="absolute inset-0 bg-sauge/20" />
                        <div className="absolute inset-y-0 left-0 w-0 bg-linear-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                    </div>

                    <ul className="relative z-1 mt-4 grid grid-cols-1 gap-4">
                        {/* Nécessaires */}
                        <li className="rounded-2xl border border-sauge/30 bg-background p-4">
                            <div className="flex items-start gap-3">
                                <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                    <ShieldCheck className="w-4 h-4" aria-hidden />
                                </span>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between gap-3">
                                        <h2 className="text-sm font-semibold text-foreground/90">Strictement nécessaires</h2>
                                        <span className="inline-flex items-center text-[11px] rounded-full border border-sauge/40 bg-sauge/10 text-sauge px-2 py-0.5">
                                            Toujours actif
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-foreground/80">
                                        Indispensables au fonctionnement du site (sécurité, anti-spam, équilibre de charge, sauvegarde du choix de consentement).
                                    </p>
                                </div>
                            </div>
                        </li>

                        {/* Préférences */}
                        <li className="rounded-2xl border border-sauge/30 bg-background p-4">
                            <div className="flex items-start gap-3">
                                <span className="grid place-content-center size-9 rounded-full border border-ormat/30 bg-ormat/10 text-ormat mt-0.5">
                                    <BadgeCheck className="w-4 h-4" aria-hidden />
                                </span>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between gap-3">
                                        <h2 className="text-sm font-semibold text-foreground/90">Préférences</h2>
                                        <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                className="peer sr-only"
                                                checked={preferences}
                                                onChange={(e) => setPreferences(e.target.checked)}
                                                aria-label="Activer les cookies de préférences"
                                            />
                                            <span className="w-9 h-5 rounded-full bg-sauge/25 peer-checked:bg-sauge transition relative after:content-[''] after:absolute after:left-0.5 after:top-0.5 after:w-4 after:h-4 after:bg-background after:rounded-full after:transition peer-checked:after:translate-x-4" />
                                        </label>
                                    </div>
                                    <p className="mt-1 text-sm text-foreground/80">Sauvegarde de tes choix d’interface, langue, petites personnalisations.</p>
                                </div>
                            </div>
                        </li>

                        {/* Analytics */}
                        <li className="rounded-2xl border border-sauge/30 bg-background p-4">
                            <div className="flex items-start gap-3">
                                <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                    <BarChart3 className="w-4 h-4" aria-hidden />
                                </span>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between gap-3">
                                        <h2 className="text-sm font-semibold text-foreground/90">Mesure d’audience</h2>
                                        <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                className="peer sr-only"
                                                checked={analytics}
                                                onChange={(e) => setAnalytics(e.target.checked)}
                                                aria-label="Activer la mesure d’audience"
                                            />
                                            <span className="w-9 h-5 rounded-full bg-sauge/25 peer-checked:bg-sauge transition relative after:content-[''] after:absolute after:left-0.5 after:top-0.5 after:w-4 after:h-4 after:bg-background after:rounded-full after:transition peer-checked:after:translate-x-4" />
                                        </label>
                                    </div>
                                    <p className="mt-1 text-sm text-foreground/80">
                                        Statistiques anonymisées pour améliorer le site (Consent Mode respecté si Google Analytics est présent).
                                    </p>
                                </div>
                            </div>
                        </li>

                        {/* Fonctionnels / embeds */}
                        <li className="rounded-2xl border border-sauge/30 bg-background p-4">
                            <div className="flex items-start gap-3">
                                <span className="grid place-content-center size-9 rounded-full border border-ormat/30 bg-ormat/10 text-ormat mt-0.5">
                                    <Box className="w-4 h-4" aria-hidden />
                                </span>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between gap-3">
                                        <h2 className="text-sm font-semibold text-foreground/90">Contenus tiers (embeds)</h2>
                                        <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                className="peer sr-only"
                                                checked={functional}
                                                onChange={(e) => setFunctional(e.target.checked)}
                                                aria-label="Activer les contenus tiers"
                                            />
                                            <span className="w-9 h-5 rounded-full bg-sauge/25 peer-checked:bg-sauge transition relative after:content-[''] after:absolute after:left-0.5 after:top-0.5 after:w-4 after:h-4 after:bg-background after:rounded-full after:transition peer-checked:after:translate-x-4" />
                                        </label>
                                    </div>
                                    <p className="mt-1 text-sm text-foreground/80">
                                        Afficher des services intégrés comme <strong>Calendly</strong>, lecteurs vidéo, cartes… (peuvent déposer des cookies).
                                    </p>
                                </div>
                            </div>
                        </li>

                        {/* Marketing */}
                        <li className="rounded-2xl border border-sauge/30 bg-background p-4">
                            <div className="flex items-start gap-3">
                                <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                    <BadgeCheck className="w-4 h-4" aria-hidden />
                                </span>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between gap-3">
                                        <h2 className="text-sm font-semibold text-foreground/90">Marketing</h2>
                                        <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                className="peer sr-only"
                                                checked={marketing}
                                                onChange={(e) => setMarketing(e.target.checked)}
                                                aria-label="Activer les cookies marketing"
                                            />
                                            <span className="w-9 h-5 rounded-full bg-sauge/25 peer-checked:bg-sauge transition relative after:content-[''] after:absolute after:left-0.5 after:top-0.5 after:w-4 after:h-4 after:bg-background after:rounded-full after:transition peer-checked:after:translate-x-4" />
                                        </label>
                                    </div>
                                    <p className="mt-1 text-sm text-foreground/80">Publicité/personnalisation (désactivé par défaut — non utilisé actuellement).</p>
                                </div>
                            </div>
                        </li>
                    </ul>

                    {/* Actions */}
                    <div className="relative z-1 mt-5 flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={allReject}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold border border-sauge/30 bg-background hover:bg-sauge/10"
                        >
                            Tout refuser
                        </button>
                        <button
                            type="button"
                            onClick={allAccept}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold border-b-2 border-r-2 border-ormat bg-terracotta text-background hover:bg-terracotta/90 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                        >
                            Tout accepter
                        </button>
                        <button
                            type="button"
                            onClick={save}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold border border-sauge/30 bg-background hover:bg-sauge/10"
                        >
                            Enregistrer
                        </button>

                        {saved === 'ok' && (
                            <span className="inline-flex items-center gap-2 text-xs text-sauge ml-1">
                                <BadgeCheck className="w-4 h-4" /> Préférences enregistrées
                            </span>
                        )}
                    </div>

                    {/* Récap légal */}
                    <div className="relative z-1 mt-6 pt-4 border-t border-sauge/20 text-xs text-foreground/70">
                        Consentement valable 6 mois. Tu peux le modifier ou le retirer ici à tout moment. Consulte la{' '}
                        <Link href="/politique-confidentialite" className="underline underline-offset-2">
                            politique de confidentialité
                        </Link>
                        .
                    </div>
                </div>

                {/* Debug (dev) */}
                {loaded && (
                    <details className="text-xs text-foreground/60 hidden">
                        <summary className="cursor-pointer">Voir l’état actuel (dev)</summary>
                        <pre className="mt-2 p-2 rounded bg-foreground/5 overflow-auto">{JSON.stringify(current, null, 2)}</pre>
                    </details>
                )}
            </div>
        </section>
    );
}
