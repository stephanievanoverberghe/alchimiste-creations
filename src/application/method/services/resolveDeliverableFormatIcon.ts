export type DeliverableFormatIconKey = 'layoutTemplate' | 'fileText' | 'palette' | 'database' | 'code2' | 'playCircle' | 'keyRound';

const rules: Array<{ pattern: RegExp; icon: DeliverableFormatIconKey }> = [
    { pattern: /figma/i, icon: 'layoutTemplate' },
    { pattern: /docs|doc/i, icon: 'fileText' },
    { pattern: /palette|ui/i, icon: 'palette' },
    { pattern: /cms|wordpress|headless/i, icon: 'database' },
    { pattern: /code|repo|github/i, icon: 'code2' },
    { pattern: /replay|video/i, icon: 'playCircle' },
    { pattern: /accès|codes|keys?/i, icon: 'keyRound' },
];

export function resolveDeliverableFormatIcon(format: string): DeliverableFormatIconKey {
    const normalizedFormat = typeof format === 'string' ? format : '';
    return rules.find((rule) => rule.pattern.test(normalizedFormat))?.icon ?? 'fileText';
}
