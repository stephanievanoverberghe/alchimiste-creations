import { NextRequest, NextResponse } from 'next/server';
import { validateContactSubmission } from '@/application/contact/services/contactValidation';
import { contactValidationCopy } from '@/infrastructure/content/contact-copy';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const payload = (await req.json()) as {
            name?: string;
            email?: string;
            message?: string;
            consent?: boolean;
            confirm_email?: string;
        };

        const validation = validateContactSubmission(payload);
        if (validation.isBot) {
            return NextResponse.json({ success: true }, { status: 200 });
        }

        if (!validation.normalized) {
            return NextResponse.json({ success: false, error: validation.error || contactValidationCopy.fallbackInvalidPayload }, { status: 400 });
        }

        const access_key = process.env.WEB3FORMS_KEY;
        if (!access_key) {
            return NextResponse.json({ success: false, error: contactValidationCopy.missingServerConfig }, { status: 500 });
        }

        const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '';
        const ua = req.headers.get('user-agent') ?? '';
        const referer = req.headers.get('referer') ?? '';

        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            cache: 'no-store',
            body: JSON.stringify({
                access_key,
                subject: 'Contact — Formulaire express',
                name: validation.normalized.name,
                from_name: validation.normalized.name,
                email: validation.normalized.email,
                message: validation.normalized.message,
                consent: validation.normalized.consent ? 'yes' : 'no',
                botcheck: '',
                ip,
                user_agent: ua,
                referrer: referer,
            }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data?.success) {
            return NextResponse.json({ success: false, error: data?.message || contactValidationCopy.providerFailed }, { status: 502 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch {
        return NextResponse.json({ success: false, error: contactValidationCopy.serverError }, { status: 500 });
    }
}

export function GET() {
    return NextResponse.json({ ok: true, hint: 'POST only' }, { status: 200 });
}
