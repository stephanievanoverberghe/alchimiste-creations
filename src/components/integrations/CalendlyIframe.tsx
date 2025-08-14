'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
    url: string; // ex: "https://calendly.com/alchimiste-creations/appel-decouverte?hide_event_type_details=1"
    height?: number; // hauteur en px (min 700 conseillé)
    name?: string; // prefill (optionnel)
    email?: string; // prefill (optionnel)
    className?: string;
};

export default function CalendlyIframe({ url, height = 700, name, email, className }: Props) {
    const [loaded, setLoaded] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const embedUrl = useMemo(() => {
        try {
            const u = new URL(url);
            // Pré-remplissage simple (gratuit)
            if (name) u.searchParams.set('name', name);
            if (email) u.searchParams.set('email', email);
            // Langue / embed hints
            u.searchParams.set('embed_type', 'Inline');
            if (typeof window !== 'undefined') {
                u.searchParams.set('embed_domain', window.location.hostname);
            }
            // Force FR si possible
            u.searchParams.set('locale', 'fr');
            return u.toString();
        } catch {
            return url;
        }
    }, [url, name, email]);

    // Optionnel : log quand une réservation est effectuée (postMessage)
    useEffect(() => {
        const handler = (e: MessageEvent) => {
            if (typeof e.data === 'object' && e.data?.event === 'calendly.event_scheduled') {
                // Ici tu pourrais lancer un toast, une confetti, etc.
                // console.log('Calendly: event scheduled', e.data);
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);

    return (
        <div ref={wrapperRef} className={className}>
            {/* Skeleton / loader tout simple */}
            {!loaded && <div className="mb-2 h-10 w-40 animate-pulse rounded-full border border-sauge/30 bg-sauge/10" aria-hidden />}
            <iframe
                title="Prendre rendez-vous — Calendly"
                src={embedUrl}
                width="100%"
                height={height}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                // sandbox pour réduire la surface — garde le minimum que Calendly requiert
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full rounded-[16px] border border-sauge/30 bg-background"
            />
        </div>
    );
}
