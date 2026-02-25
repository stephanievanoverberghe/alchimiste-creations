import type { MethodDependenciesContent, MethodDependencyCard, MethodDependencyIcon, MethodDependencyListItem, MethodDependencyTag } from '@/domain/method';

export type MethodDependencyListItemDto = {
    icon: MethodDependencyIcon;
    label: string;
};

export type MethodDependencyTagDto = {
    icon: MethodDependencyIcon;
    label: string;
};

export type MethodDependencyCardDto = {
    id: MethodDependencyCard['id'];
    title: string;
    icon: MethodDependencyIcon;
    items: MethodDependencyListItemDto[];
    tags?: MethodDependencyTagDto[];
    exampleTitle: string;
    exampleDescription: string;
};

export type MethodDependenciesContentDto = {
    badge: string;
    title: string;
    description: string;
    cards: MethodDependencyCardDto[];
    footnote: string;
};

function mapListItem(dto: MethodDependencyListItemDto): MethodDependencyListItem {
    return {
        icon: dto.icon,
        label: dto.label,
    };
}

function mapTag(dto: MethodDependencyTagDto): MethodDependencyTag {
    return {
        icon: dto.icon,
        label: dto.label,
    };
}

function mapCard(dto: MethodDependencyCardDto): MethodDependencyCard {
    return {
        id: dto.id,
        title: dto.title,
        icon: dto.icon,
        items: dto.items.map(mapListItem),
        tags: dto.tags?.map(mapTag),
        exampleTitle: dto.exampleTitle,
        exampleDescription: dto.exampleDescription,
    };
}

export function mapMethodDependenciesDtoToDomain(dto: MethodDependenciesContentDto): MethodDependenciesContent {
    return {
        badge: dto.badge,
        title: dto.title,
        description: dto.description,
        cards: dto.cards.map(mapCard),
        footnote: dto.footnote,
    };
}
