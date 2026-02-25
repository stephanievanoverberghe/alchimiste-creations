import packsData from '@/infrastructure/content/packs.json';

export type TechKey = 'wordpress' | 'react';
export type PackSlug = 'essentiel' | 'croissance' | 'signature';
export type OptionKey = 'blog' | 'formulaire' | 'rdv' | 'multilingue';

export type RawPack = {
    slug: string;
    titre: string;
    sousTitre?: string;
    cible?: string;
    inclus?: string[];
    prix?: string;
    technoChoix?: boolean;
    versions?: Partial<Record<TechKey, { prix?: string; delai?: string }>>;
    options?: Array<{
        label: string;
        prix: string | Partial<Record<TechKey, string>>;
    }>;
};

export type FormState = {
    pack: PackSlug;
    tech: TechKey;
    features: Record<OptionKey, boolean>;
};

export const optionDefinitions: Record<OptionKey, { label: string; test: RegExp }> = {
    blog: { label: 'Blog / Actus', test: /blog|actus/i },
    formulaire: { label: 'Formulaire avancé', test: /formulaire.+avanc/i },
    rdv: { label: 'Prise de RDV en ligne', test: /r[ée]servation|rdv|calendly/i },
    multilingue: { label: 'Multilingue', test: /multi[- ]?lingue/i },
};

const ceilTo50 = (n: number) => Math.ceil(n / 50) * 50;

function priceToNumber(s?: string): number | undefined {
    if (!s) return undefined;
    if (/sur\s*devis|—|--/i.test(s)) return undefined;
    const m = s.replace(/\s/g, '').match(/(\d+(?:[.,]\d+)?)/);
    if (!m) return undefined;
    return Math.round(parseFloat(m[1].replace(',', '.')));
}

function delayRange(versions?: Partial<Record<TechKey, { delai?: string }>>): string | undefined {
    if (!versions) return undefined;
    const vals = Object.values(versions) as Array<{ delai?: string } | undefined>;
    const nums: number[] = [];
    for (const v of vals) {
        const s = v?.delai ?? '';
        for (const m of s.matchAll(/(\d+)\s*(?:à|-|–|—)?\s*(\d+)?/g)) {
            const a = Number(m[1]);
            const b = Number(m[2] ?? m[1]);
            if (!Number.isNaN(a)) nums.push(a);
            if (!Number.isNaN(b)) nums.push(b);
        }
    }
    if (!nums.length) return undefined;
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    return min === max ? `${min} sem.` : `${min}–${max} sem.`;
}

export function getPack(slug: PackSlug): RawPack | undefined {
    const arr = Array.isArray(packsData) ? (packsData as RawPack[]) : [];
    return arr.find((p) => p.slug === slug);
}

function basePrice(pack: RawPack, tech: TechKey): number | undefined {
    const byTech = pack.versions?.[tech]?.prix ?? pack.prix;
    return priceToNumber(byTech);
}

export function findOptionObject(pack: RawPack, key: OptionKey) {
    const def = optionDefinitions[key];
    return (pack.options ?? []).find((o) => def.test.test(o.label));
}

export function optionPrice(pack: RawPack, key: OptionKey, tech: TechKey): number {
    const opt = findOptionObject(pack, key);
    if (!opt) return 0;
    const val = typeof opt.prix === 'string' ? opt.prix : (opt.prix?.[tech] ?? opt.prix?.wordpress);
    return priceToNumber(val) ?? 0;
}

export function isIncludedByDefault(pack: RawPack, key: OptionKey): boolean {
    if (pack.slug === 'signature' && key === 'formulaire') return true;
    if (key === 'blog') {
        return (pack.inclus ?? []).some((s) => /blog/i.test(s));
    }
    return false;
}

export function isOptionAvailable(pack: RawPack, key: OptionKey): boolean {
    return !!findOptionObject(pack, key);
}

export function estimate(state: FormState) {
    const pack = getPack(state.pack);
    if (!pack) return { pack: state.pack, ok: false as const };

    const base = basePrice(pack, state.tech);
    if (!base) return { pack: state.pack, ok: false as const };

    const addBlog = state.features.blog && isOptionAvailable(pack, 'blog') && !isIncludedByDefault(pack, 'blog');
    const addForm = state.features.formulaire && isOptionAvailable(pack, 'formulaire');
    const addRdv = state.features.rdv && isOptionAvailable(pack, 'rdv');
    const addMulti = state.features.multilingue && isOptionAvailable(pack, 'multilingue');

    const sumOptions =
        (addBlog ? optionPrice(pack, 'blog', state.tech) : 0) +
        (addForm ? optionPrice(pack, 'formulaire', state.tech) : 0) +
        (addRdv ? optionPrice(pack, 'rdv', state.tech) : 0) +
        (addMulti ? optionPrice(pack, 'multilingue', state.tech) : 0);

    const center = base + sumOptions;
    const min = center;
    const max = ceilTo50(center * 1.15);

    return { pack: state.pack, ok: true as const, min, max, delay: delayRange(pack.versions), sumOptions, base };
}
