export type Tech = 'wordpress' | 'react';

type PackVersion = {
    prix: string;
    delai: string;
};

export function getVersion(versions: Partial<Record<Tech, PackVersion>> | undefined, tech: Tech): PackVersion | undefined {
    if (!versions) return undefined;
    return versions[tech] ?? versions.wordpress;
}
