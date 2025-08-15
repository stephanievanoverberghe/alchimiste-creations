export const COOKIE_NAME = 'ac_consent';

export function readCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
}

export function writeCookie(name: string, value: string, maxAgeSeconds: number, secure = false) {
    if (typeof document === 'undefined') return;
    const secureAttr = secure ? '; Secure' : typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secureAttr}`;
}

export function eraseCookie(name: string) {
    if (typeof document === 'undefined') return;
    const secureAttr = typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax${secureAttr}`;
}

/** Supprime les anciens cookies de consentement laissés par des implés précédentes. */
export function nukeLegacyConsentCookies() {
    const legacy = ['consent_v2', 'cookieyes-consent', 'cky-consent', 'axeptio_all_vendors']; // ajoute ici si besoin
    legacy.forEach(eraseCookie);
}

/** Supprime les cookies 1st-party posés par les outils de mesure sur TON domaine. */
export function nukeFirstPartyAnalyticsCookies() {
    if (typeof document === 'undefined') return;
    const killPrefixes = ['_ga', '_gid', '_gcl_', '_gat'];
    const names = document.cookie.split(';').map((s) => s.trim().split('=')[0]);
    names.forEach((name) => {
        if (killPrefixes.some((p) => name.startsWith(p))) eraseCookie(name);
    });
}
