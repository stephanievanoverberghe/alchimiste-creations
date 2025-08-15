// src/components/legal/ConsentBanner.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Consent = {
    analytics: boolean;
    marketing: boolean;
    preferences: boolean;
    functional: boolean;
    timestamp: number;
    version: number;
};

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

const CONSENT_COOKIE = 'consent_v2';
const CONSENT_TTL_DAYS = 180; // CNIL : 6 mois
const CONSENT_VERSION = 1; // ↑ incrémente si nouvelles finalités

function now() {
    return Date.now();
}
function days(n: number) {
    return n * 24 * 60 * 60 * 1000;
}

function readConsent(): Consent | null {
    if (typeof document === 'undefined') return null;
    const m = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`));
    if (!m) return null;
    try {
        return JSON.parse(decodeURIComponent(m[1])) as Consent;
    } catch {
        return null;
    }
}

function writeConsent(c: Consent) {
    if (typeof document === 'undefined') return;
    const expires = new Date(now() + days(CONSENT_TTL_DAYS)).toUTCString();
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(c))}; Path=/; SameSite=Lax; Expires=${expires}${secure}`;
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

function isExpired(c: Consent) {
    return now() - c.timestamp > days(CONSENT_TTL_DAYS) || (c.version ?? 0) < CONSENT_VERSION;
}

export default function ConsentBanner({ className }: { className?: string }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const c = readConsent();
        if (!c || isExpired(c)) setOpen(true);
        else updateGtagConsent(c);
    }, []);

    function acceptAll() {
        const c: Consent = {
            analytics: true,
            marketing: true,
            preferences: true,
            functional: true,
            timestamp: now(),
            version: CONSENT_VERSION,
        };
        writeConsent(c);
        updateGtagConsent(c);
        setOpen(false);
    }

    function rejectAll() {
        const c: Consent = {
            analytics: false,
            marketing: false,
            preferences: false,
            functional: true, // nécessaire
            timestamp: now(),
            version: CONSENT_VERSION,
        };
        writeConsent(c);
        updateGtagConsent(c);
        setOpen(false);
    }

    if (!open) return null;

    return (
        <div role="dialog" aria-modal="true" aria-label="Préférences cookies" className={cn('fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6', className)}>
            <div className="mx-auto max-w-3xl rounded-2xl border border-sauge/30 bg-background shadow-lg">
                <div className="p-4 sm:p-5">
                    <p className="text-sm text-foreground/85">
                        J’utilise quelques cookies pour mesurer l’audience (anonymisée) et, si tu l’acceptes, pour améliorer l’expérience. Tu peux modifier tes choix à tout moment
                        dans{' '}
                        <Link href="/preferences-cookies" className="underline underline-offset-2">
                            Préférences cookies
                        </Link>
                        .
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={acceptAll}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl
                         bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold
                         border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                        >
                            Tout accepter
                        </button>
                        <button
                            type="button"
                            onClick={rejectAll}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl
                         border border-sauge/40 bg-sauge/10 text-sauge hover:bg-sauge/20 text-sm font-semibold"
                        >
                            Tout refuser
                        </button>
                        <Link
                            href="/preferences-cookies"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl
                         border border-sauge/40 bg-background hover:bg-sauge/10 text-sm font-semibold"
                            onClick={() => setOpen(false)}
                        >
                            Personnaliser
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
