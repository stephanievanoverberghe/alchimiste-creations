import { getVersion, type Tech } from '@/domain/offers/packs';

type PackVersion = { prix: string; delai: string };

export function resolvePackVersion(versions: Partial<Record<Tech, PackVersion>> | undefined, tech: Tech): PackVersion | undefined {
    return getVersion(versions, tech);
}

export type { Tech };
