import rawFaq from '@/infrastructure/content/faq.json';
import { mapFaqDtoToDomain } from '@/infrastructure/content/mappers/faqMapper';
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

function isTech(value: unknown): value is Tech {
    return value === 'any' || value === 'wordpress' || value === 'react';
}

function assertFaqDto(value: unknown): asserts value is FaqDto {
    if (!value || typeof value !== 'object') throw new Error('Invalid FAQ row: not an object');
    const row = value as Record<string, unknown>;

    if (typeof row.id !== 'string' || row.id.length === 0) throw new Error('Invalid FAQ row: "id" is required');
    if (typeof row.q !== 'string' || row.q.length === 0) throw new Error(`Invalid FAQ row "${row.id}": "q" is required`);
    if (typeof row.a !== 'string' || row.a.length === 0) throw new Error(`Invalid FAQ row "${row.id}": "a" is required`);

    if (row.tags !== undefined && (!Array.isArray(row.tags) || row.tags.some((tag) => typeof tag !== 'string'))) {
        throw new Error(`Invalid FAQ row "${row.id}": "tags" must be an array of strings`);
    }
    if (row.tech !== undefined && !isTech(row.tech)) throw new Error(`Invalid FAQ row "${row.id}": "tech" is invalid`);
    if (row.featured !== undefined && typeof row.featured !== 'boolean') throw new Error(`Invalid FAQ row "${row.id}": "featured" must be a boolean`);
    if (row.order !== undefined) {
        const order = row.order;
        if (typeof order !== 'number' || !Number.isInteger(order) || order < 0) {
            throw new Error(`Invalid FAQ row "${row.id}": "order" must be a positive integer`);
        }
    }
}

export function getFaqItems(): FaqItem[] {
    if (!Array.isArray(rawFaq)) {
        throw new Error('Invalid FAQ content: expected an array');
    }

    return rawFaq.map((row) => {
        assertFaqDto(row);
        return mapFaqDtoToDomain(row);
    });
}
