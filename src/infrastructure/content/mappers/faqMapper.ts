import type { FaqItem, Tech } from '@/domain/faq';

type FaqDto = {
    id: string;
    q: string;
    a: string;
    tags?: string[];
    tech?: Tech;
    featured?: boolean;
    order?: number;
};

export function mapFaqDtoToDomain(dto: FaqDto): FaqItem {
    return {
        ...dto,
        tags: dto.tags ?? [],
        tech: dto.tech ?? 'any',
        featured: dto.featured ?? false,
        order: dto.order ?? 999,
    };
}
