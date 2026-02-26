import { FormEvent, RefObject, useState } from 'react';
import { HcaptchaHandle } from '@/presentation/components/integrations/HcaptchaGate';
import { validateContactSubmission } from '@/application/contact/services/contactValidation';
import { contactValidationCopy } from '@/infrastructure/content/contact-copy';

export type ApiResponse = { success: boolean; error?: string };

type UseContactExpressFormParams = {
    functionalAllowed: boolean;
    captchaToken: string;
    captchaRef: RefObject<HcaptchaHandle | null>;
    onSuccess: () => void;
};

export function useContactExpressForm({ functionalAllowed, captchaToken, captchaRef, onSuccess }: UseContactExpressFormParams) {
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [chars, setChars] = useState(0);

    async function onSubmitExpress(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        const consent = String(fd.get('consent') || '') === 'on';

        const validation = validateContactSubmission({
            name: String(fd.get('name') || ''),
            email: String(fd.get('email') || ''),
            message: String(fd.get('message') || ''),
            consent,
            confirm_email: String(fd.get('confirm_email') || ''),
        });

        if (validation.isBot) return;

        if (!validation.normalized) {
            setStatus('error');
            setErrorMsg(validation.error === contactValidationCopy.invalidMessage ? contactValidationCopy.shortMessageUi : validation.error || contactValidationCopy.invalidForm);
            return;
        }

        if (functionalAllowed && !captchaToken) {
            setStatus('error');
            setErrorMsg(contactValidationCopy.captchaRequired);
            return;
        }

        setSending(true);
        setStatus('idle');
        setErrorMsg('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: validation.normalized.name,
                    email: validation.normalized.email,
                    message: validation.normalized.message,
                    consent,
                    confirm_email: '',
                    hcaptcha: captchaToken,
                }),
            });

            let data: ApiResponse | null = null;
            try {
                data = (await res.json()) as ApiResponse;
            } catch {}

            if (!res.ok || !data?.success) {
                setStatus('error');
                setErrorMsg(data?.error || contactValidationCopy.unexpectedError);
                return;
            }

            setStatus('ok');
            setErrorMsg('');
            form.reset();
            setChars(0);
            captchaRef.current?.reset();
            onSuccess();
        } catch {
            setStatus('error');
            setErrorMsg(contactValidationCopy.networkError);
        } finally {
            setSending(false);
        }
    }

    return { sending, status, errorMsg, chars, setChars, onSubmitExpress };
}
