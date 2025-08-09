// types/packs.ts
export type PackOption = {
    label: string;
    prix: string | { wordpress?: string; react?: string };
};

export type PackVersion = {
    prix: string;
    delai: string;
};

export type Pack = {
    slug: string;
    titre: string;
    sousTitre: string;
    cible: string;
    inclus: string[];
    prix: string;
    technoChoix: boolean;
    versions: {
        wordpress?: PackVersion;
        'sur-mesure — codé à la main (react)'?: PackVersion;
        [key: string]: PackVersion | undefined;
    };
    options: PackOption[];
    allersRetours: string;
    delaiNote: string;
    exclusions?: string[];
};

import packs from '@/data/packs.json';

export async function getPacks(): Promise<Pack[]> {
    return packs as Pack[];
}
