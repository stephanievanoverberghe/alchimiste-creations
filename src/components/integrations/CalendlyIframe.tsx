'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
    url: string; // ex: "https://calendly.com/.../appel-decouverte?hide_event_type_details=1"
    height?: number; // hauteur px (sera supplantée par le style clamp ci-dessous)
    name?: string; // prefill (optionnel)
    email?: string; // prefill (optionnel)
    source?: string; // utm_source (optionnel)
    className?: string;
};

export default function CalendlyIframe({ url, height = 720, name, email, source, className }: Props) {
    const [loaded, setLoaded] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const timerRef = useRef<number | null>(null);

    // URL finale (prefill + hints + UTM + brand color)
    const embedUrl = useMemo(() => {
        try {
            const u = new URL(url);

            // Pré-remplissage (gratuit)
            if (name) u.searchParams.set('name', name);
            if (email) u.searchParams.set('email', email);

            // Hints d'embed
            u.searchParams.set('embed_type', 'Inline');
            u.searchParams.set('locale', 'fr');
            // Couleur primaire alignée brand (terracotta). Sans le "#"
            u.searchParams.set('primary_color', 'A44B34');

            // Domaine d'embed
            if (typeof window !== 'undefined') {
                u.searchParams.set('embed_domain', window.location.hostname);
            }

            // UTM
            u.searchParams.set('utm_medium', 'site');
            u.searchParams.set('utm_campaign', 'contact-booking');
            u.searchParams.set('utm_source', source || 'site');

            return u.toString();
        } catch {
            return url;
        }
    }, [url, name, email, source]);

    // Fallback auto si l'iframe ne charge pas (ad-block / réseau)
    useEffect(() => {
        timerRef.current = window.setTimeout(() => {
            if (!loaded) setBlocked(true);
        }, 2600);
        return () => {
            if (timerRef.current) window.clearTimeout(timerRef.current);
        };
    }, [loaded]);

    // Analytics: écoute l'événement de réservation envoyé par Calendly
    useEffect(() => {
        const handler = (e: MessageEvent) => {
            if (typeof e.data === 'object' && e.data?.event === 'calendly.event_scheduled') {
                window.dispatchEvent(new CustomEvent('cal-booked', { detail: e.data }));
                // Exemple: gtag('event','calendly_event_scheduled',{eventType:e.data?.payload?.event?.event_type?.name});
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);

    return (
        <div className={className}>
            {/* Loader accessible */}
            {!loaded && <div className="mb-2 h-10 w-40 animate-pulse rounded-full border border-sauge/30 bg-sauge/10" aria-hidden={loaded} />}

            <iframe
                key={embedUrl} // force le refresh si les params changent
                title="Prendre rendez-vous — Calendly"
                src={embedUrl}
                width="100%"
                // Hauteur responsive (prend le pas sur prop height)
                style={{ height: `clamp(${height}px, 82vh, ${Math.max(height, 860)}px)` }}
                loading="lazy"
                onLoad={() => {
                    setLoaded(true);
                    setBlocked(false);
                }}
                aria-busy={!loaded}
                // sandbox: surface minimale requise par Calendly
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full rounded-[16px] border border-sauge/30"
            />

            {/* Fallback visible si l'iframe n'a pas pu se charger */}
            {blocked && (
                <p className="mt-3 text-center text-xs text-foreground/60">
                    Le module ne s’est pas chargé.{' '}
                    <a href={embedUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                        Ouvrir Calendly dans un nouvel onglet
                    </a>
                    .
                </p>
            )}
        </div>
    );
}
