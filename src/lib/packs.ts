// utils/packs.ts
export type Tech = 'wordpress' | 'react';
type PackVersion = { prix: string; delai: string };

const VERSION_ALIASES: Record<Tech, string[]> = {
    wordpress: ['wordpress'],
    react: ['react', 'sur-mesure — codé à la main (react)'],
};

export function getVersion(versions: Record<string, PackVersion | undefined>, tech: Tech) {
    for (const key of VERSION_ALIASES[tech]) {
        const v = versions[key];
        if (v) return v;
    }
    return undefined;
}
