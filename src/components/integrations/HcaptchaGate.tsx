// src/components/integrations/HcaptchaGate.tsx
'use client';
import { useEffect, useRef, useState } from 'react';

type Props = {
    sitekey: string;
    enabled: boolean; // true si "Contenus tiers" accepté
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
        }
    ) => string | number;
    reset: (id?: string | number) => void;
}

declare global {
    interface Window {
        hcaptcha?: HCaptchaAPI;
    }
}

export default function HcaptchaGate({ sitekey, enabled, onVerify, className }: Props) {
    const boxRef = useRef<HTMLDivElement | null>(null);
    const widgetIdRef = useRef<string | number | null>(null);
    const [ready, setReady] = useState(false);

    // Charge le script uniquement quand enabled = true
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

    // Rend / re-rend le widget quand prêt (et si la sitekey change)
    useEffect(() => {
        if (!enabled || !ready || !boxRef.current || !window.hcaptcha) return;

        // ✅ copie la valeur du ref pour l’utiliser dans le cleanup
        const el = boxRef.current;

        // Clean le conteneur si déjà rempli (évite les doubles iframes)
        el.innerHTML = '';

        widgetIdRef.current = window.hcaptcha.render(el, {
            sitekey,
            callback: (token) => onVerify?.(token),
            'expired-callback': () => onVerify?.(''),
            'error-callback': () => onVerify?.(''),
            theme: 'light',
        });

        // Cleanup : utilise la variable `el` (et pas boxRef.current)
        return () => {
            el.innerHTML = '';
            widgetIdRef.current = null;
        };
    }, [enabled, ready, onVerify, sitekey]);

    if (!enabled) {
        return (
            <div className={className}>
                <p className="text-xs text-foreground/60">
                    Pour envoyer le formulaire, autorise <strong>Contenus tiers</strong> dans{' '}
                    <a href="/preferences-cookies" className="underline underline-offset-2">
                        Préférences cookies
                    </a>
                    .
                </p>
            </div>
        );
    }

    return <div ref={boxRef} className={className} aria-label="Vérification anti-spam" />;
}
