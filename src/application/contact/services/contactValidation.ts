import { contactValidationCopy } from '@/infrastructure/content/contact-copy';

export type ContactSubmissionInput = {
    name?: string;
    email?: string;
    message?: string;
    consent?: boolean;
    confirm_email?: string;
};

export type ContactIdentityInput = {
    name?: string;
    email?: string;
    consent?: boolean;
};

export type NormalizedContactSubmission = {
    name: string;
    email: string;
    message: string;
    consent: boolean;
};

export type ContactValidationResult = {
    isBot: boolean;
    normalized?: NormalizedContactSubmission;
    error?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeText = (value: string) => value.replace(/\s+/g, ' ').trim();

function validateIdentity(input: ContactIdentityInput, options?: { requireConsent?: boolean }) {
    const normalizedName = normalizeText(input.name ?? '');
    if (!normalizedName || normalizedName.length < 2 || normalizedName.length > 80) {
        return { error: contactValidationCopy.invalidName } as const;
    }

    const normalizedEmail = normalizeText(input.email ?? '').toLowerCase();
    if (!normalizedEmail || !EMAIL_PATTERN.test(normalizedEmail) || normalizedEmail.length > 120) {
        return { error: contactValidationCopy.invalidEmail } as const;
    }

    const consent = Boolean(input.consent);
    if (options?.requireConsent && !consent) {
        return { error: contactValidationCopy.consentRequired } as const;
    }

    return {
        normalizedName,
        normalizedEmail,
        consent,
    } as const;
}

export function validateContactIdentity(input: ContactIdentityInput, options?: { requireConsent?: boolean }) {
    const validated = validateIdentity(input, options);
    return {
        error: 'error' in validated ? validated.error : undefined,
        normalized:
            'error' in validated
                ? undefined
                : {
                      name: validated.normalizedName,
                      email: validated.normalizedEmail,
                      consent: validated.consent,
                  },
    };
}

export function validateContactSubmission(input: ContactSubmissionInput, options?: { requireConsent?: boolean }): ContactValidationResult {
    if ((input.confirm_email ?? '').trim()) {
        return { isBot: true };
    }

    const validated = validateIdentity(input, options);
    if ('error' in validated) {
        return { isBot: false, error: validated.error };
    }

    const normalizedMessage = normalizeText(input.message ?? '');
    if (normalizedMessage.length < 10 || normalizedMessage.length > 5000) {
        return { isBot: false, error: contactValidationCopy.invalidMessage };
    }

    return {
        isBot: false,
        normalized: {
            name: validated.normalizedName,
            email: validated.normalizedEmail,
            message: normalizedMessage,
            consent: validated.consent,
        },
    };
}
