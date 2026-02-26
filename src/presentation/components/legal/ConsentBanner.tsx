'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/shared/utils/cn';
import { consentBannerCopy } from '@/infrastructure/content/legal-copy';

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

function isExpired(c: Consent) {
    const created = new Date(c.timestamp).getTime();
    const ageMs = Date.now() - created;
    const ttlMs = TTL_DAYS * 24 * 60 * 60 * 1000;
    return ageMs > ttlMs || (c.version ?? 0) < CONSENT_VERSION;
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

const COOKIE_PREFIXES = ['_ga', '_gid', '_gat', '_gcl_', '_fbp', '_cl', '_hj', '_pk_id', '_pk_ses'];
const STORAGE_PREFIXES = ['_ga', 'ga_', 'amp_', 'ajs_', '_hj', 'matomo_', 'clarity_', 'fb_'];

function deleteCookieEverywhere(name: string) {
    if (typeof document === 'undefined') return;
    const past = 'Thu, 01 Jan 1970 00:00:00 GMT';
    const base = `${encodeURIComponent(name)}=; Expires=${past}; SameSite=Lax`;
    const paths = ['/', '/app', '/'];
    const host = typeof location !== 'undefined' ? location.hostname : '';
    const domains: Array<string | null> = [null];

    if (host && host.includes('.')) {
        const parts = host.split('.');
        const root = '.' + parts.slice(-2).join('.');
        domains.push(root, '.' + host);
    }

    for (const p of paths) {
        document.cookie = `${base}; Path=${p}`;
        for (const d of domains) if (d) document.cookie = `${base}; Path=${p}; Domain=${d}`;
    }
}

function purgeNonEssentialStorage() {
    try {
        const names = document.cookie.split('; ').map((c) => decodeURIComponent(c.split('=')[0]));
        for (const n of names) if (COOKIE_PREFIXES.some((pre) => n.startsWith(pre))) deleteCookieEverywhere(n);
    } catch {}

    try {
        const keys: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i)!;
            if (STORAGE_PREFIXES.some((pre) => k.toLowerCase().startsWith(pre))) keys.push(k);
        }
        keys.forEach((k) => localStorage.removeItem(k));
    } catch {}

    try {
        const keys: string[] = [];
        for (let i = 0; i < sessionStorage.length; i++) {
            const k = sessionStorage.key(i)!;
            if (STORAGE_PREFIXES.some((pre) => k.toLowerCase().startsWith(pre))) keys.push(k);
        }
        keys.forEach((k) => sessionStorage.removeItem(k));
    } catch {}
}

export default function ConsentBanner({ className }: { className?: string }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const raw = readCookie(COOKIE_NAME);
        if (!raw) {
            setOpen(true);
            return;
        }
        try {
            const c = JSON.parse(raw) as Consent;
            if (!c || isExpired(c)) setOpen(true);
            else updateGtagConsent(c);
        } catch {
            setOpen(true);
        }
    }, []);

    function persist(c: Consent) {
        writeCookie(COOKIE_NAME, JSON.stringify(c));
        updateGtagConsent(c);
        if (!c.preferences && !c.analytics && !c.functional && !c.marketing) {
            purgeNonEssentialStorage();
        }
    }

    function acceptAll() {
        const c = toConsent({ preferences: true, analytics: true, functional: true, marketing: true });
        persist(c);
        setOpen(false);
    }

    function rejectAll() {
        const c = toConsent({ preferences: false, analytics: false, functional: false, marketing: false });
        purgeNonEssentialStorage();
        persist(c);
        setOpen(false);
    }

    if (!open) return null;

    return (
        <div role="dialog" aria-modal="true" aria-label={consentBannerCopy.dialogAriaLabel} className={cn('fixed inset-x-0 bottom-0 z-60 px-4 pb-4 sm:px-6 sm:pb-6', className)}>
            <div className="mx-auto max-w-3xl rounded-2xl border border-sauge/30 bg-background shadow-lg">
                <div className="p-4 sm:p-5">
                    <p className="text-sm text-foreground/85">
                        {consentBannerCopy.description}{' '}
                        <Link href={consentBannerCopy.preferencesPath} className="underline underline-offset-2">
                            {consentBannerCopy.preferencesLabel}
                        </Link>
                        .
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={acceptAll}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                        >
                            {consentBannerCopy.acceptAllLabel}
                        </button>
                        <button
                            type="button"
                            onClick={rejectAll}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl border border-sauge/40 bg-sauge/10 text-sauge hover:bg-sauge/20 text-sm font-semibold"
                        >
                            {consentBannerCopy.rejectAllLabel}
                        </button>
                        <Link
                            href={consentBannerCopy.preferencesPath}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl border border-sauge/40 bg-background hover:bg-sauge/10 text-sm font-semibold"
                            onClick={() => setOpen(false)}
                        >
                            {consentBannerCopy.customizeLabel}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
