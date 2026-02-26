import { contactCallToActionCopy } from '@/infrastructure/content/contact-copy';

export type ContactCallToActionContent = {
    waveImageAlt: string;
    badge: string;
    title: string;
    description: string;
    chips: Array<{ icon: 'clock' | 'shield'; label: string }>;
    scheduleButton: {
        label: string;
        ariaLabel: string;
    };
    emailButton: {
        label: string;
        ariaLabel: string;
        subject: string;
    };
    note: string;
};

function assertString(value: unknown, context: string): asserts value is string {
    if (typeof value !== 'string' || value.trim().length === 0) {
        throw new Error(`Invalid contact CTA content: ${context} is required`);
    }
}

export function getContactCallToActionContent(): ContactCallToActionContent {
    const source = contactCallToActionCopy;

    assertString(source.waveImageAlt, 'waveImageAlt');
    assertString(source.badge, 'badge');
    assertString(source.title, 'title');
    assertString(source.description, 'description');
    assertString(source.note, 'note');

    source.chips.forEach((chip, index) => {
        assertString(chip.icon, `chips[${index}].icon`);
        assertString(chip.label, `chips[${index}].label`);
    });

    assertString(source.scheduleButton.label, 'scheduleButton.label');
    assertString(source.scheduleButton.ariaLabel, 'scheduleButton.ariaLabel');

    assertString(source.emailButton.label, 'emailButton.label');
    assertString(source.emailButton.ariaLabel, 'emailButton.ariaLabel');
    assertString(source.emailButton.subject, 'emailButton.subject');

    return {
        waveImageAlt: source.waveImageAlt,
        badge: source.badge,
        title: source.title,
        description: source.description,
        chips: source.chips.map((chip) => ({ icon: chip.icon, label: chip.label })),
        scheduleButton: {
            label: source.scheduleButton.label,
            ariaLabel: source.scheduleButton.ariaLabel,
        },
        emailButton: {
            label: source.emailButton.label,
            ariaLabel: source.emailButton.ariaLabel,
            subject: source.emailButton.subject,
        },
        note: source.note,
    };
}
