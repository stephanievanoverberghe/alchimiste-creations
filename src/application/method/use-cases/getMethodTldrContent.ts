import type { MethodTldrContent } from '@/domain/method';
import { methodTldrCopy } from '@/infrastructure/content/method-copy';

function assertString(value: unknown, context: string): asserts value is string {
    if (typeof value !== 'string' || value.trim().length === 0) {
        throw new Error(`Invalid method TLDR content: ${context} is required`);
    }
}

export function getMethodTldrContent(): MethodTldrContent {
    const source = methodTldrCopy;

    assertString(source.badge, 'badge');
    assertString(source.title, 'title');
    assertString(source.description, 'description');
    assertString(source.footnote, 'footnote');
    assertString(source.detailsCta, 'detailsCta');

    if (!Array.isArray(source.pillars) || source.pillars.length !== 3) {
        throw new Error('Invalid method TLDR content: pillars must contain exactly 3 items');
    }

    source.pillars.forEach((pillar, index) => {
        assertString(pillar.title, `pillars[${index}].title`);
        assertString(pillar.description, `pillars[${index}].description`);
    });

    assertString(source.metricLabels.delaisMoyens, 'metricLabels.delaisMoyens');
    assertString(source.metricLabels.cyclesRetours, 'metricLabels.cyclesRetours');
    assertString(source.metricLabels.capaciteProjets, 'metricLabels.capaciteProjets');

    assertString(source.defaultMetrics.delaisMoyens, 'defaultMetrics.delaisMoyens');
    assertString(source.defaultMetrics.cyclesRetours, 'defaultMetrics.cyclesRetours');
    assertString(source.defaultMetrics.capaciteProjets, 'defaultMetrics.capaciteProjets');

    return {
        badge: source.badge,
        title: source.title,
        description: source.description,
        pillars: [source.pillars[0], source.pillars[1], source.pillars[2]],
        metricLabels: source.metricLabels,
        footnote: source.footnote,
        detailsCta: source.detailsCta,
        defaultMetrics: source.defaultMetrics,
    };
}
