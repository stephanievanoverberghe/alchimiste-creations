import { contactInfosCopy } from '@/infrastructure/content/contact-copy';

export type ContactInfoIcon = 'globe' | 'calendar' | 'languages' | 'mapPin' | 'video' | 'clock';

export type ContactInfosContent = {
    badge: string;
    title: string;
    description: string;
    items: Array<{
        icon: ContactInfoIcon;
        title: string;
        desc: string;
        chip: string;
    }>;
};

function assertString(value: unknown, context: string): asserts value is string {
    if (typeof value !== 'string' || value.trim().length === 0) {
        throw new Error(`Invalid contact infos content: ${context} is required`);
    }
}

export function getContactInfosContent(): ContactInfosContent {
    const source = contactInfosCopy;

    assertString(source.badge, 'badge');
    assertString(source.title, 'title');
    assertString(source.description, 'description');

    const items = source.items.map((item, index) => {
        assertString(item.icon, `items[${index}].icon`);
        assertString(item.title, `items[${index}].title`);
        assertString(item.desc, `items[${index}].desc`);
        assertString(item.chip, `items[${index}].chip`);

        return item;
    });

    return {
        badge: source.badge,
        title: source.title,
        description: source.description,
        items,
    };
}
