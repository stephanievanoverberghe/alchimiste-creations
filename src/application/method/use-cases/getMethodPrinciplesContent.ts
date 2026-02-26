import type { MethodPrinciplesContent, MethodPrincipleIcon } from '@/domain/method';
import { methodPrinciplesCopy } from '@/infrastructure/content/method-copy';

const ALLOWED_PRINCIPLE_ICONS: MethodPrincipleIcon[] = ['leaf', 'accessibility', 'gauge', 'userCheck', 'shieldCheck', 'sparkles'];

function assertString(value: unknown, context: string): asserts value is string {
    if (typeof value !== 'string' || value.trim().length === 0) {
        throw new Error(`Invalid method principles content: ${context} is required`);
    }
}

function assertPrincipleIcon(value: unknown, context: string): asserts value is MethodPrincipleIcon {
    if (typeof value !== 'string' || !ALLOWED_PRINCIPLE_ICONS.includes(value as MethodPrincipleIcon)) {
        throw new Error(`Invalid method principles content: ${context} has unknown icon`);
    }
}

export function getMethodPrinciplesContent(): MethodPrinciplesContent {
    const source = methodPrinciplesCopy;

    assertString(source.badge, 'badge');
    assertString(source.title, 'title');
    assertString(source.description, 'description');
    assertString(source.exampleLabel, 'exampleLabel');
    assertString(source.footnote, 'footnote');

    if (!Array.isArray(source.principles)) {
        throw new Error('Invalid method principles content: principles must be an array');
    }

    const principles = source.principles.map((principle, index) => {
        assertPrincipleIcon(principle.icon, `principles[${index}].icon`);
        assertString(principle.title, `principles[${index}].title`);
        assertString(principle.desc, `principles[${index}].desc`);
        assertString(principle.example, `principles[${index}].example`);

        return {
            icon: principle.icon,
            title: principle.title,
            desc: principle.desc,
            example: principle.example,
        };
    });

    return {
        badge: source.badge,
        title: source.title,
        description: source.description,
        exampleLabel: source.exampleLabel,
        principles,
        footnote: source.footnote,
    };
}
