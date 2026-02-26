'use client';
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { contactValidationCopy } from '@/infrastructure/content/contact-copy';

type Props = {
    sitekey: string;
    enabled: boolean;
    onVerify?: (token: string) => void;
    className?: string;
};

interface HCaptchaAPI {
    render: (
        container: HTMLElement,
        opts: {
            sitekey: string;
            callback: (token: string) => void;
            'error-callback'?: () => void;
            'expired-callback'?: () => void;
            theme?: 'light' | 'dark';
            size?: 'normal' | 'compact' | 'invisible';
        },
    ) => string | number;
    reset: (id?: string | number) => void;
}

declare global {
    interface Window {
        hcaptcha?: HCaptchaAPI;
    }
}

// 👉 interface exposée au parent
export type HcaptchaHandle = { reset: () => void };

const HcaptchaGate = forwardRef<HcaptchaHandle, Props>(function HcaptchaGate({ sitekey, enabled, onVerify, className }: Props, ref) {
    const boxRef = useRef<HTMLDivElement | null>(null);
    const [ready, setReady] = useState(false);
    const widgetIdRef = useRef<string | number | null>(null);

    // Charger le script uniquement si enabled = true
    useEffect(() => {
        if (!enabled) return;

        const existing = document.querySelector<HTMLScriptElement>('script[data-hcaptcha]');
        if (existing) {
            if (window.hcaptcha) setReady(true);
            else existing.addEventListener('load', () => setReady(true), { once: true });
            return;
        }

        const s = document.createElement('script');
        s.src = 'https://hcaptcha.com/1/api.js?render=explicit&hl=fr';
        s.async = true;
        s.defer = true;
        s.setAttribute('data-hcaptcha', '1');
        s.onload = () => setReady(true);
        document.head.appendChild(s);
    }, [enabled]);

    // Rendu / (re)initialisation du widget
    useEffect(() => {
        if (!enabled || !ready || !boxRef.current || !window.hcaptcha) return;

        // Ne rend qu'une fois ; si déjà rendu, on reset juste
        if (widgetIdRef.current == null) {
            widgetIdRef.current = window.hcaptcha.render(boxRef.current, {
                sitekey,
                callback: (token) => onVerify?.(token),
                'expired-callback': () => onVerify?.(''),
                'error-callback': () => onVerify?.(''),
                theme: 'light',
            });
        } else {
            window.hcaptcha.reset(widgetIdRef.current);
            onVerify?.('');
        }
    }, [enabled, ready, onVerify, sitekey]);

    // 👉 Méthode impérative reset() pour le parent
    useImperativeHandle(
        ref,
        () => ({
            reset() {
                if (window.hcaptcha && widgetIdRef.current != null) {
                    window.hcaptcha.reset(widgetIdRef.current);
                    onVerify?.(''); // vide aussi le token côté parent
                }
            },
        }),
        [onVerify],
    );

    if (!enabled) {
        return (
            <div className={className}>
                <p className="text-xs text-foreground/60">
                    {contactValidationCopy.captchaGate.enableThirdPartyPrefix} <strong>{contactValidationCopy.captchaGate.thirdPartyStrongLabel}</strong>{' '}
                    {contactValidationCopy.captchaGate.enableThirdPartySuffix}{' '}
                    <a href="/preferences-cookies" className="underline underline-offset-2">
                        {contactValidationCopy.captchaGate.cookiePreferencesLabel}
                    </a>
                    .
                </p>
            </div>
        );
    }

    return <div ref={boxRef} className={className} aria-label={contactValidationCopy.captchaGate.antiSpamAriaLabel} />;
});

export default HcaptchaGate;
