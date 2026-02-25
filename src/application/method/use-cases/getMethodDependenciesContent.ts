import type { MethodDependenciesContent, MethodDependencyCard, MethodDependencyIcon } from '@/domain/method';
import rawMethodDependencies from '@/infrastructure/content/method-dependencies.json';
import { mapMethodDependenciesDtoToDomain, type MethodDependenciesContentDto } from '@/infrastructure/content/mappers/methodDependenciesMapper';

const ICONS: MethodDependencyIcon[] = ['fileText', 'image', 'keySquare', 'globe', 'shieldCheck', 'folderOpen', 'type', 'link2', 'listChecks'];
const CARD_IDS: MethodDependencyCard['id'][] = ['prerequisites', 'formats', 'bestPractices'];

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}

function isIcon(value: unknown): value is MethodDependencyIcon {
    return typeof value === 'string' && ICONS.includes(value as MethodDependencyIcon);
}

function assertItem(value: unknown, context: string): void {
    if (!isObject(value)) throw new Error(`Invalid ${context}: item must be an object`);
    if (!isIcon(value.icon)) throw new Error(`Invalid ${context}: item.icon is invalid`);
    if (typeof value.label !== 'string' || value.label.length === 0) throw new Error(`Invalid ${context}: item.label is required`);
}

function assertCard(value: unknown): void {
    if (!isObject(value)) throw new Error('Invalid method dependencies content: card must be an object');
    if (typeof value.id !== 'string' || !CARD_IDS.includes(value.id as MethodDependencyCard['id'])) {
        throw new Error('Invalid method dependencies content: card.id is invalid');
    }
    if (!isIcon(value.icon)) throw new Error(`Invalid method dependencies content (${value.id}): card.icon is invalid`);
    if (typeof value.title !== 'string' || value.title.length === 0) throw new Error(`Invalid method dependencies content (${value.id}): card.title is required`);
    if (!Array.isArray(value.items)) throw new Error(`Invalid method dependencies content (${value.id}): card.items must be an array`);
    value.items.forEach((item, index) => assertItem(item, `method dependencies content (${value.id}) item[${index}]`));

    if (value.tags !== undefined) {
        if (!Array.isArray(value.tags)) throw new Error(`Invalid method dependencies content (${value.id}): card.tags must be an array`);
        value.tags.forEach((tag, index) => assertItem(tag, `method dependencies content (${value.id}) tag[${index}]`));
    }

    if (typeof value.exampleTitle !== 'string' || value.exampleTitle.length === 0) {
        throw new Error(`Invalid method dependencies content (${value.id}): card.exampleTitle is required`);
    }
    if (typeof value.exampleDescription !== 'string' || value.exampleDescription.length === 0) {
        throw new Error(`Invalid method dependencies content (${value.id}): card.exampleDescription is required`);
    }
}

function assertMethodDependenciesDto(value: unknown): asserts value is MethodDependenciesContentDto {
    if (!isObject(value)) throw new Error('Invalid method dependencies content: expected an object');

    if (typeof value.badge !== 'string' || value.badge.length === 0) {
        throw new Error('Invalid method dependencies content: badge is required');
    }
    if (typeof value.title !== 'string' || value.title.length === 0) {
        throw new Error('Invalid method dependencies content: title is required');
    }
    if (typeof value.description !== 'string' || value.description.length === 0) {
        throw new Error('Invalid method dependencies content: description is required');
    }
    if (!Array.isArray(value.cards)) {
        throw new Error('Invalid method dependencies content: cards must be an array');
    }
    value.cards.forEach(assertCard);

    if (typeof value.footnote !== 'string' || value.footnote.length === 0) {
        throw new Error('Invalid method dependencies content: footnote is required');
    }
}

export function getMethodDependenciesContent(): MethodDependenciesContent {
    assertMethodDependenciesDto(rawMethodDependencies);
    return mapMethodDependenciesDtoToDomain(rawMethodDependencies);
}
