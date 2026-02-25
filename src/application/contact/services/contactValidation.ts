import { z } from 'zod';
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

const normalizeText = (value: string) => value.replace(/\s+/g, ' ').trim();

const normalizedString = (minLength: number, maxLength: number) =>
    z.preprocess((value) => (typeof value === 'string' ? normalizeText(value) : ''), z.string().min(minLength).max(maxLength));

const identitySchema = z.object({
    name: normalizedString(2, 80),
    email: z.preprocess((value) => (typeof value === 'string' ? normalizeText(value).toLowerCase() : ''), z.string().max(120).email()).transform((value) => value),
    consent: z.preprocess((value) => Boolean(value), z.boolean()),
});

const messageSchema = normalizedString(10, 5000);

const identityErrorMap: Record<string, string> = {
    name: contactValidationCopy.invalidName,
    email: contactValidationCopy.invalidEmail,
};

function getFirstIssuePath(result: z.ZodError): string | undefined {
    return result.issues[0]?.path[0]?.toString();
}

function validateIdentity(input: ContactIdentityInput, options?: { requireConsent?: boolean }) {
    const parsed = identitySchema.safeParse(input);
    if (!parsed.success) {
        const issuePath = getFirstIssuePath(parsed.error);
        return { error: identityErrorMap[issuePath ?? ''] ?? contactValidationCopy.invalidForm } as const;
    }

    if (options?.requireConsent && !parsed.data.consent) {
        return { error: contactValidationCopy.consentRequired } as const;
    }

    return {
        normalizedName: parsed.data.name,
        normalizedEmail: parsed.data.email,
        consent: parsed.data.consent,
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

    const message = messageSchema.safeParse(input.message);
    if (!message.success) {
        return { isBot: false, error: contactValidationCopy.invalidMessage };
    }

    return {
        isBot: false,
        normalized: {
            name: validated.normalizedName,
            email: validated.normalizedEmail,
            message: message.data,
            consent: validated.consent,
        },
    };
}
