import type { FaqItem, FaqTag, PackSlug, Surface, Tech } from '@/domain/faq';

const SURFACE_TAGS: Record<Surface, string[]> = {
    offers: ['process', 'delais', 'paiement', 'tech', 'contenu', 'maintenance'],
    offer: ['tech', 'seo', 'maintenance', 'ecommerce', 'reservation', 'contenu', 'delais'],
    projects: ['process', 'tech', 'seo', 'maintenance', 'contenu'],
    faq: [],
    method: ['process', 'delais', 'contenu', 'seo', 'maintenance', 'paiement'],
};

const PACK_TAGS: Record<PackSlug, string[]> = {
    essentiel: ['process', 'delais', 'contenu', 'tech', 'maintenance'],
    croissance: ['tech', 'reservation', 'contenu', 'seo', 'delais'],
    signature: ['tech', 'ecommerce', 'seo', 'maintenance', 'contenu'],
};

const SYNONYMS_GROUPS: Record<string, string[]> = {
    paiement: [
        'payer',
        'paiements',
        'règlement',
        'reglement',
        'acompte',
        'échelonné',
        'echelonne',
        'échelonnable',
        'versement',
        'facture',
        'facturation',
        'régler',
        'regler',
        'tarif',
        'budget',
        'coût',
        'cout',
        'devis',
        'prix',
    ],
    delai: ['délais', 'delais', 'deadline', 'temps', 'planning', 'timeline', 'livraison'],
    hebergement: ['hébergement', 'hebergement', 'hébergeur', 'hebergeur', 'serveur', 'ovh', 'domaine', 'dns'],
    seo: ['référencement', 'referencement', 'google', 'moteur', 'mots cles', 'mots-cles', 'motsclés', 'meta', 'metas', 'open graph', 'sitemap'],
    wordpress: ['wp'],
    react: ['next', 'nextjs', 'next.js', 'sur-mesure', 'sur mesure'],
    maintenance: ['maj', 'mise à jour', 'mise a jour', 'updates', 'sauvegarde', 'backup', 'support'],
    rdv: ['rendez-vous', 'rendez vous', 'appel', 'calendly', 'prise de rdv', 'prise de rendez-vous'],
    contenu: ['textes', 'photos', 'images', 'rédaction', 'redaction', 'copywriting', 'contenus', 'copy'],
    multilingue: ['langues', 'traduction', 'i18n'],
    licences: ['polices', 'fonts', 'icônes', 'icones', 'assets'],
};

const strip = (s: string) =>
    s
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

const SYN_INDEX = (() => {
    const index: Record<string, string> = {};
    for (const [canon, variants] of Object.entries(SYNONYMS_GROUPS)) {
        index[strip(canon)] = strip(canon);
        for (const v of variants) {
            index[strip(v)] = strip(canon);
        }
    }
    return index;
})();

const canonWords = (value: string) =>
    strip(value)
        .replace(/[^a-z0-9]+/g, ' ')
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => SYN_INDEX[w] ?? w);

const canonString = (value: string) => canonWords(value).join(' ');

function editDistance(a: string, b: string): number {
    const m = a.length;
    const n = b.length;
    if (!m) return n;
    if (!n) return m;

    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i += 1) dp[i][0] = i;
    for (let j = 0; j <= n; j += 1) dp[0][j] = j;

    for (let i = 1; i <= m; i += 1) {
        for (let j = 1; j <= n; j += 1) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
            if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
                dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1);
            }
        }
    }
    return dp[m][n];
}

function tokenMatches(hayWords: string[], token: string): boolean {
    if (hayWords.includes(token)) return true;
    const tolerance = token.length >= 6 ? 2 : token.length >= 4 ? 1 : 0;
    if (tolerance > 0 && hayWords.some((word) => editDistance(word, token) <= tolerance)) return true;
    if (token.length >= 3 && hayWords.some((word) => word.startsWith(token))) return true;
    return false;
}

type CanonFaqItem = FaqItem & { hayWords: string[]; tagsCanon: string[] };

function scoreItem(item: CanonFaqItem, tokens: string[], activeTag: string | null, surface: Surface, packSlug?: PackSlug): number {
    if (tokens.length === 0 && !activeTag) {
        let score = (item.featured ? 100 : 0) + (100 - Math.min(item.order, 100));
        const allowed = new Set<string>([...SURFACE_TAGS[surface], ...(surface === 'offer' && packSlug ? PACK_TAGS[packSlug] : [])].map(strip));
        if (item.tagsCanon.some((tag) => allowed.has(tag))) score += 10;
        return score;
    }

    let score = 0;
    if (activeTag && item.tagsCanon.includes(strip(activeTag))) score += 30;

    for (const token of tokens) {
        if (item.hayWords.includes(token)) {
            score += 12;
            continue;
        }
        if (token.length >= 4 && item.hayWords.some((word) => editDistance(word, token) <= 1)) {
            score += 7;
            continue;
        }
        if (token.length >= 3 && item.hayWords.some((word) => word.startsWith(token))) {
            score += 4;
        }
    }

    return score;
}

export function listFaqTags(items: FaqItem[], mode: 'compact' | 'full'): FaqTag[] {
    if (mode !== 'full') return [];

    const counts = new Map<string, number>();
    for (const item of items) {
        for (const tag of item.tags) {
            counts.set(tag, (counts.get(tag) ?? 0) + 1);
        }
    }

    return Array.from(counts.entries())
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'fr'));
}

export function filterFaqItems({
    items,
    query,
    activeTag,
    mode,
    limit,
    techFilter,
    surface,
    packSlug,
}: {
    items: FaqItem[];
    query: string;
    activeTag: string | null;
    mode: 'compact' | 'full';
    limit: number;
    techFilter: Tech;
    surface: Surface;
    packSlug?: PackSlug;
}): FaqItem[] {
    const byTech = techFilter === 'any' ? items : items.filter((item) => item.tech === 'any' || item.tech === techFilter);

    const bySurface = (() => {
        if (surface === 'faq') return byTech;

        const allowed = new Set<string>([...SURFACE_TAGS[surface], ...(surface === 'offer' && packSlug ? PACK_TAGS[packSlug] : [])]);
        const filtered = byTech.filter((item) => item.tags.length === 0 || item.tags.some((tag) => allowed.has(tag)));
        return filtered.length ? filtered : byTech;
    })();

    const baseSorted = bySurface.slice().sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order || a.q.localeCompare(b.q, 'fr'));

    const canonItems: CanonFaqItem[] = baseSorted.map((item) => {
        const tagsCanon = item.tags.map((tag) => strip(tag));
        const hay = [canonString(item.q), canonString(item.a), tagsCanon.join(' ')].join(' ');
        return { ...item, tagsCanon, hayWords: hay.split(/\s+/).filter(Boolean) };
    });

    const tokens = canonWords(query);
    const preFiltered = canonItems.filter((item) => (activeTag ? item.tagsCanon.includes(strip(activeTag)) : true));
    const byToken = tokens.length > 0 ? preFiltered.filter((item) => tokens.every((token) => tokenMatches(item.hayWords, token))) : preFiltered;

    const ranked = byToken
        .map((item) => ({ item, score: scoreItem(item, tokens, activeTag, surface, packSlug) }))
        .sort((a, b) => b.score - a.score || a.item.q.localeCompare(b.item.q, 'fr'))
        .map(({ item }) => item);

    if (mode === 'full') return ranked;

    const featured = ranked.filter((item) => item.featured);
    const others = ranked.filter((item) => !item.featured);
    return [...featured, ...others].slice(0, limit);
}
