'use client';

import { useEffect, useMemo, useState } from 'react';
import CalendlyIframe from '@/presentation/components/integrations/CalendlyIframe';
import Link from 'next/link';

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
const TTL_DAYS = 180;
const CONSENT_VERSION = 1;

/* --------------------- Utils cookies --------------------- */
function readCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const parts = document.cookie.split(';');
    for (const p of parts) {
        const [k, ...rest] = p.split('=');
        if (k && k.trim() === name) return decodeURIComponent(rest.join('=').trim());
    }
    return null;
}

function writeCookie(name: string, value: string, maxAgeSeconds = TTL_DAYS * 24 * 60 * 60) {
    if (typeof document === 'undefined') return;
    const secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secure}`;
}

/* -------------- Consent helpers + Consent Mode ----------- */
function toConsent(p?: Partial<Consent>): Consent {
    return {
        version: CONSENT_VERSION,
        necessary: true,
        preferences: p?.preferences ?? false,
        analytics: p?.analytics ?? false,
        functional: p?.functional ?? false,
        marketing: p?.marketing ?? false,
        timestamp: new Date().toISOString(),
    };
}

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
    if (typeof w.gtag === 'function') w.gtag('consent', 'update', payload);
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push({ event: 'consent_update', consent: payload });
}

/* --------------------- Composant gate -------------------- */
type Props = {
    url: string;
    height?: number;
    name?: string;
    email?: string;
    source?: string;
    className?: string;
};

export default function CalendlyGate(props: Props) {
    const [allowed, setAllowed] = useState<boolean | null>(null); // null = on ne sait pas encore
    const [consent, setConsent] = useState<Consent>(() => toConsent());

    // lecture du cookie au montage
    useEffect(() => {
        const raw = readCookie(COOKIE_NAME);
        if (!raw) {
            setAllowed(false);
            return;
        }
        try {
            const c = JSON.parse(raw) as Consent;
            setConsent(c);
            setAllowed(!!c.functional);
            // on pousse l’état vers Consent Mode si déjà autorisé
            if (c.functional || c.preferences || c.analytics || c.marketing) updateGtagConsent(c);
        } catch {
            setAllowed(false);
        }
    }, []);

    function persist(next: Consent) {
        writeCookie(COOKIE_NAME, JSON.stringify(next));
        updateGtagConsent(next);
        setConsent(next);
    }

    function allowFunctionalAndLoad() {
        const next = toConsent({
            ...consent,
            // on ne touche PAS aux autres catégories
            preferences: consent.preferences,
            analytics: consent.analytics,
            marketing: consent.marketing,
            functional: true,
        });
        persist(next);
        setAllowed(true);
    }

    // link Calendly (même que l’embed, mais ouvert en nouvel onglet)
    const externalUrl = useMemo(() => {
        try {
            const u = new URL(props.url);
            u.searchParams.set('utm_medium', 'site');
            u.searchParams.set('utm_campaign', 'contact-booking');
            u.searchParams.set('utm_source', props.source || 'site');
            return u.toString();
        } catch {
            return props.url;
        }
    }, [props.url, props.source]);

    if (allowed === null) {
        // petit skeleton pendant la lecture du cookie
        return <div className="h-8 w-40 animate-pulse rounded-full border border-sauge/30 bg-sauge/10" aria-hidden />;
    }

    if (allowed) {
        return <CalendlyIframe {...props} />;
    }

    // Placeholder RGPD quand functional est refusé / inconnu
    return (
        <div className={props.className}>
            <div className="rounded-[16px] border border-sauge/30 bg-background/70 p-4 md:p-6 text-center">
                <p className="text-sm text-foreground/80">
                    Le calendrier Calendly est désactivé car les <strong>contenus tiers</strong> ne sont pas autorisés.
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                    <button
                        type="button"
                        onClick={allowFunctionalAndLoad}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl
                       bg-terracotta text-background text-sm font-semibold
                       border-b-2 border-r-2 border-ormat hover:bg-terracotta/90 transition cursor-pointer"
                    >
                        Autoriser &amp; charger Calendly
                    </button>
                    <Link
                        href="/preferences-cookies"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl
                       border border-sauge/40 bg-background hover:bg-sauge/10 text-sm font-semibold cursor-pointer"
                    >
                        Gérer mes préférences
                    </Link>
                    <a
                        href={externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl
                       border border-sauge/40 bg-sauge/10 text-sauge hover:bg-sauge/20 text-sm font-semibold cursor-pointer"
                    >
                        Ouvrir Calendly dans un onglet
                    </a>
                </div>
                <p className="mt-2 text-[11px] text-foreground/60">En autorisant, seuls les contenus tiers sont activés. Tu peux revenir sur ton choix à tout moment.</p>
            </div>
        </div>
    );
}
