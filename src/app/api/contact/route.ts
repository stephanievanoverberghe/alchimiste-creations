import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ContactPayload = {
    name?: string;
    email?: string;
    message?: string;
    consent?: boolean;
    confirm_email?: string; // honeypot
};

function isValidEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: NextRequest) {
    try {
        const { name, email, message, consent, confirm_email }: ContactPayload = await req.json();

        // Honeypot anti-bot
        if (confirm_email && confirm_email.trim()) {
            return NextResponse.json({ success: true }, { status: 200 });
        }

        // Normalisation
        const n = (name ?? '').trim();
        const m = (email ?? '').trim();
        const msg = (message ?? '').replace(/\s+/g, ' ').trim();

        // Validation
        if (!n || n.length < 2 || n.length > 80) {
            return NextResponse.json({ success: false, error: 'Nom invalide' }, { status: 400 });
        }
        if (!m || !isValidEmail(m) || m.length > 120) {
            return NextResponse.json({ success: false, error: 'Email invalide' }, { status: 400 });
        }
        if (msg.length < 10 || msg.length > 5000) {
            return NextResponse.json({ success: false, error: 'Merci d’ajouter au moins 10 caractères.' }, { status: 400 });
        }

        const access_key = process.env.WEB3FORMS_KEY;
        if (!access_key) {
            return NextResponse.json({ success: false, error: 'Configuration serveur manquante (WEB3FORMS_KEY)' }, { status: 500 });
        }

        // Contexte
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '';
        const ua = req.headers.get('user-agent') ?? '';
        const referer = req.headers.get('referer') ?? '';

        // Envoi via Web3Forms (serveur → Web3Forms)
        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            cache: 'no-store',
            body: JSON.stringify({
                access_key,
                subject: 'Contact — Formulaire express',
                name: n,
                from_name: n,
                email: m, // utilisé en Reply-To
                message: msg,
                consent: consent ? 'yes' : 'no',
                botcheck: '',
                ip,
                user_agent: ua,
                referrer: referer,
            }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data?.success) {
            return NextResponse.json({ success: false, error: data?.message || 'Échec de l’envoi via Web3Forms' }, { status: 502 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch {
        return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
    }
}

export function GET() {
    // Utile pour tester rapidement dans le navigateur
    return NextResponse.json({ ok: true, hint: 'POST only' }, { status: 200 });
}
