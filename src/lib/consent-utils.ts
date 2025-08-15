// utils cookies — remplace tes helpers existants

export const COOKIE_NAME = 'ac_consent';
export const LEGACY_COOKIES = ['consent_v2', 'cookieyes-consent', 'cky-consent', 'axeptio_all_vendors'];

export function readCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
}

export function writeCookie(name: string, value: string, maxAgeSeconds: number, secure = false) {
    if (typeof document === 'undefined') return;
    const secureAttr = secure || (typeof location !== 'undefined' && location.protocol === 'https:') ? '; Secure' : '';
    document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secureAttr}`;
}

export function eraseCookie(name: string) {
    if (typeof document === 'undefined') return;
    const secureAttr = typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax${secureAttr}`;
}

// ✅ efface sur plusieurs combinaisons Path/Domain (best effort)
export function deleteCookieEverywhere(name: string) {
    if (typeof document === 'undefined') return;
    const past = 'Thu, 01 Jan 1970 00:00:00 GMT';
    const base = `${encodeURIComponent(name)}=; Expires=${past}; SameSite=Lax`;
    const paths = ['/', '/app', '/']; // ajoute d’autres chemins si tu en as
    const host = typeof location !== 'undefined' ? location.hostname : '';
    const domains: Array<string | null> = [null];

    // ex: app.example.com -> .example.com et .app.example.com
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

// ❗️utilise deleteCookieEverywhere pour les “legacy”
export function nukeLegacyConsentCookies() {
    LEGACY_COOKIES.forEach(deleteCookieEverywhere);
}

// (optionnel) purge 1st-party analytics (_ga, _gid, …)
export function nukeFirstPartyAnalyticsCookies() {
    if (typeof document === 'undefined') return;
    const killPrefixes = ['_ga', '_gid', '_gcl_', '_gat'];
    const names = document.cookie.split(';').map((s) => s.trim().split('=')[0]);
    names.forEach((name) => {
        if (killPrefixes.some((p) => name.startsWith(p))) deleteCookieEverywhere(name);
    });
}
