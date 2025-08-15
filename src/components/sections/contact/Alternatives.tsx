'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { Mail, MessageSquareText, MessageCircle, Copy, CheckCircle2, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import HcaptchaGate from '@/components/integrations/HcaptchaGate'; // 👈 AJOUT

type ApiResponse = { success: boolean; error?: string };

export type AlternativesProps = {
    id?: string;
    name?: string;
    email?: string;
    contactEmail?: string;
    linkedinUrl?: string;
    /** WhatsApp au format international SANS + ni espaces : ex. 33612345678 */
    whatsapp?: string;
    className?: string;
};

export default function AlternativesSection({ id = 'contact-alternatives', name, email, contactEmail, linkedinUrl, whatsapp, className }: AlternativesProps) {
    const EMAIL = contactEmail || process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@alchimistecreations.fr';
    const LINKEDIN = linkedinUrl || process.env.NEXT_PUBLIC_LINKEDIN_URL || '';
    const WHATSAPP = whatsapp || process.env.NEXT_PUBLIC_WHATSAPP || '';
    const HCAPTCHA_SITEKEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY || ''; // 👈 AJOUT

    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [chars, setChars] = useState(0);

    // hCaptcha
    const [captchaToken, setCaptchaToken] = useState('');
    const [functionalAllowed, setFunctionalAllowed] = useState(false); // 👈 ON/OFF selon consent

    // ——— Modal de succès
    const [successOpen, setSuccessOpen] = useState(false);
    const closeBtnRef = useRef<HTMLButtonElement | null>(null);

    // Accessibilité (focus, ESC) + scroll lock pendant la modale
    useEffect(() => {
        if (!successOpen) return;
        const prevOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';
        closeBtnRef.current?.focus();
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSuccessOpen(false);
        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('keydown', onKey);
            document.documentElement.style.overflow = prevOverflow;
        };
    }, [successOpen]);

    // Lire le consentement (ac_consent) et écouter les changements
    useEffect(() => {
        const m = document.cookie.match(/(?:^|; )ac_consent=([^;]*)/);
        if (m) {
            try {
                const c = JSON.parse(decodeURIComponent(m[1])) as { functional: boolean; preferences: boolean };
                setFunctionalAllowed(Boolean(c.functional || c.preferences));
            } catch {}
        }
        const onUpdate = (e: Event) => {
            const detail = (e as CustomEvent).detail?.consent as { functional?: boolean; preferences?: boolean } | undefined;
            if (detail) setFunctionalAllowed(Boolean(detail.functional || detail.preferences));
        };
        window.addEventListener('ac:consent:update', onUpdate as EventListener);
        return () => window.removeEventListener('ac:consent:update', onUpdate as EventListener);
    }, []);

    // Mailto fallback (et affichage du mail)
    const mailtoHref = useMemo(() => {
        const subject = 'Contact — Appel découverte';
        const body = `Nom: ${name ?? ''}\nEmail: ${email ?? ''}\n\nMessage:\n`;
        return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }, [EMAIL, name, email]);

    // WhatsApp (prérempli)
    const whatsappHref = useMemo(() => {
        if (!WHATSAPP) return '';
        const text = ['Bonjour,', name ? `je m'appelle ${name}.` : '', email ? `Mon email: ${email}.` : '', 'Je voudrais échanger sur mon projet et réserver un appel découverte.']
            .filter(Boolean)
            .join(' ');
        return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
    }, [WHATSAPP, name, email]);

    // Envoi vers /api/contact (serveur)
    async function onSubmitExpress(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const fd = new FormData(form);

        // Honeypot
        if (String(fd.get('confirm_email') || '').trim()) return;

        const n = String(fd.get('name') || '').trim();
        const m = String(fd.get('email') || '').trim();
        const msg = String(fd.get('message') || '').trim();
        const consent = String(fd.get('consent') || '') === 'on';

        // Validation
        if (msg.length < 10) {
            setStatus('error');
            setErrorMsg('Ton message est un peu court (min. 10 caractères).');
            return;
        }
        // Si l’utilisateur a autorisé “Contenus tiers”, on exige un token valide
        if (functionalAllowed && !captchaToken) {
            setStatus('error');
            setErrorMsg('Merci de valider le challenge anti-spam.');
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
                    name: n,
                    email: m,
                    message: msg,
                    consent,
                    confirm_email: '',
                    hcaptcha: captchaToken, // 👈 AJOUT — à vérifier côté serveur si tu veux durcir
                }),
            });

            let data: ApiResponse | null = null;
            try {
                data = (await res.json()) as ApiResponse;
            } catch {}

            if (res.ok && data?.success) {
                setStatus('ok');
                form.reset();
                setChars(0);
                setCaptchaToken('');
                setSuccessOpen(true);
            } else {
                setStatus('error');
                setErrorMsg(data?.error || 'Impossible d’envoyer le message.');
            }
        } catch {
            setStatus('error');
            setErrorMsg('Erreur réseau. Réessaie dans un instant.');
        } finally {
            setSending(false);
        }
    }

    return (
        <section id={id} className={cn('relative overflow-x-hidden py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]', className)}>
            <div className="relative z-[1] max-w-5xl mx-auto space-y-8">
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        Tu préfères autre chose que Calendly ?
                    </span>
                    <h2 className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">Alternatives rapides</h2>
                </div>

                {/* 1) Formulaire express */}
                <article className="group relative h-full flex flex-col overflow-hidden rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                        aria-hidden
                    />

                    <header className="relative z-[1] flex items-center gap-3">
                        <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                            <MessageSquareText className="w-4 h-4" aria-hidden />
                        </span>
                        <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Formulaire express</h3>
                    </header>

                    <div className="relative z-[1] mt-3 h-[2px] overflow-hidden">
                        <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                        <div
                            className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                            aria-hidden
                        />
                    </div>

                    <form onSubmit={onSubmitExpress} className="relative z-[1] mt-3 grid gap-3">
                        <input
                            name="name"
                            defaultValue={name}
                            placeholder="Ton prénom"
                            autoComplete="name"
                            className="rounded-xl border border-sauge/30 bg-background px-3 py-2 text-sm outline-none focus:border-sauge/60"
                            required
                        />
                        <input
                            name="email"
                            defaultValue={email}
                            type="email"
                            placeholder="Ton email"
                            autoComplete="email"
                            className="rounded-xl border border-sauge/30 bg-background px-3 py-2 text-sm outline-none focus:border-sauge/60"
                            required
                        />
                        <div>
                            <textarea
                                name="message"
                                placeholder="Ton message (3 lignes suffisent)"
                                rows={3}
                                minLength={10}
                                maxLength={5000}
                                onInput={(e) => setChars((e.currentTarget.value || '').length)}
                                className="w-full rounded-xl border border-sauge/30 bg-background px-3 py-2 text-sm outline-none focus:border-sauge/60"
                                required
                            />
                            <div className="mt-1 text-[11px] text-foreground/50">{chars}/5000</div>
                        </div>

                        <label className="flex items-start gap-2 text-xs text-foreground/70 cursor-pointer">
                            <input type="checkbox" name="consent" className="mt-0.5" />
                            J’accepte que mes informations soient utilisées pour être recontacté·e au sujet de ma demande.
                        </label>

                        {/* Honeypot anti-bot */}
                        <input type="text" name="confirm_email" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                        {/* hCaptcha : chargé uniquement si “Contenus tiers” autorisé */}
                        <input type="hidden" name="h-captcha-response" value={captchaToken} />
                        <HcaptchaGate sitekey={HCAPTCHA_SITEKEY} enabled={functionalAllowed} onVerify={setCaptchaToken} className="mt-1" />

                        {/* Boutons */}
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                type="submit"
                                disabled={sending || (functionalAllowed && !captchaToken)}
                                aria-busy={sending}
                                className={cn(
                                    'group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl',
                                    'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                                    'border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]',
                                    'cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
                                )}
                            >
                                <span>{sending ? 'Envoi…' : 'Envoyer'}</span>
                                {!sending && <ChevronRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" aria-hidden />}
                            </button>

                            {/* Erreur inline */}
                            {status === 'error' && (
                                <span className="text-xs text-terracotta">
                                    {errorMsg || 'Oups, ça a échoué.'}{' '}
                                    <a href={mailtoHref} className="underline">
                                        Écris-moi par email
                                    </a>
                                    .
                                </span>
                            )}
                        </div>
                    </form>
                </article>

                {/* 2) Email + Messagerie — dessous, 2 colonnes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Email direct */}
                    <article className="group relative h-full flex flex-col overflow-hidden rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                        <div
                            className="pointer-events-none absolute inset-0 opacity-10"
                            style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                            aria-hidden
                        />
                        <header className="relative z-[1] flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <Mail className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Écrire un email</h3>
                        </header>
                        <div className="relative z-[1] mt-3 h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                            <div
                                className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                aria-hidden
                            />
                        </div>
                        <div className="relative z-[1] mt-3">
                            <p className="text-sm text-foreground/85 leading-relaxed">Décris-moi en 3–5 lignes ton besoin, je te réponds sous 24–48h ouvrées.</p>
                            <div className="mt-4 flex flex-wrap items-center gap-2">
                                <a
                                    href={mailtoHref}
                                    className={cn(
                                        'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold',
                                        'bg-terracotta text-background hover:bg-terracotta/90 border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                                    )}
                                >
                                    <Mail className="h-4 w-4" />
                                    {EMAIL}
                                </a>
                                <button
                                    type="button"
                                    onClick={async () => {
                                        try {
                                            await navigator.clipboard.writeText(EMAIL);
                                        } catch {}
                                    }}
                                    className={cn(
                                        'inline-flex items-center justify-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold',
                                        'border border-sauge/40 bg-sauge/10 text-sauge hover:bg-sauge/20'
                                    )}
                                    aria-label="Copier l’adresse e-mail"
                                    title="Copier l’adresse e-mail"
                                >
                                    <Copy className="h-4 w-4" />
                                    Copier
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* Messagerie */}
                    <article className="group relative h-full flex flex-col overflow-hidden rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                        <div
                            className="pointer-events-none absolute inset-0 opacity-10"
                            style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                            aria-hidden
                        />
                        <header className="relative z-[1] flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <MessageCircle className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Messagerie</h3>
                        </header>
                        <div className="relative z-[1] mt-3 h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                            <div
                                className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                aria-hidden
                            />
                        </div>
                        <div className="relative z-[1] mt-3">
                            <p className="text-sm text-foreground/85 leading-relaxed">Tu préfères écrire vite fait par messagerie ? Pas de souci.</p>
                            <div className="mt-4 flex flex-wrap items-center gap-2">
                                {LINKEDIN && (
                                    <a
                                        href={LINKEDIN}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold',
                                            'border border-sauge/40 bg-sauge/10 text-sauge hover:bg-sauge/20'
                                        )}
                                    >
                                        <FontAwesomeIcon icon={faLinkedinIn} />
                                        LinkedIn
                                    </a>
                                )}
                                {whatsappHref && (
                                    <a
                                        href={whatsappHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold',
                                            'border border-sauge/40 bg-sauge/10 text-sauge hover:bg-sauge/20'
                                        )}
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        WhatsApp
                                    </a>
                                )}
                            </div>

                            {!LINKEDIN && !whatsappHref && (
                                <p className="mt-2 text-xs text-foreground/50">
                                    Configure <code>NEXT_PUBLIC_LINKEDIN_URL</code> et/ou <code>NEXT_PUBLIC_WHATSAPP</code> pour afficher les boutons.
                                </p>
                            )}
                        </div>
                    </article>
                </div>
            </div>

            {/* ===== Modale de confirmation ===== */}
            {successOpen && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="contact-success-title"
                    aria-describedby="contact-success-desc"
                >
                    <button aria-label="Fermer la fenêtre" className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity" onClick={() => setSuccessOpen(false)} />
                    <div className="relative mx-4 w-full max-w-md rounded-2xl border border-sauge/30 bg-background shadow-xl">
                        <div className="absolute right-2 top-2">
                            <button
                                ref={closeBtnRef}
                                onClick={() => setSuccessOpen(false)}
                                className="inline-flex items-center justify-center rounded-full p-2 text-foreground/60 hover:text-foreground hover:bg-sauge/10"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="px-6 pt-8 pb-6 text-center">
                            <div className="mx-auto grid size-12 place-content-center rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <CheckCircle2 className="h-6 w-6" aria-hidden />
                            </div>
                            <h3 id="contact-success-title" className="mt-4 font-title text-xl font-bold text-terracotta tracking-widest">
                                Message envoyé
                            </h3>
                            <p id="contact-success-desc" className="mt-2 text-sm text-foreground/80">
                                Merci&nbsp;! Je te réponds sous 24–48h ouvrées. Tu peux aussi réserver un créneau dans l’agenda si tu préfères.
                            </p>

                            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                                <a
                                    href="#contact-schedule"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const el = document.getElementById('contact-schedule');
                                        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        (el as HTMLElement | null)?.focus?.({ preventScroll: true });
                                        setSuccessOpen(false);
                                    }}
                                    className={cn(
                                        'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl',
                                        'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                                        'border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                                    )}
                                >
                                    Réserver un appel
                                </a>
                                <button
                                    onClick={() => setSuccessOpen(false)}
                                    className="inline-flex items-center justify-center rounded-2xl border border-sauge/40 bg-sauge/10 px-4 py-2 text-sm font-semibold text-sauge hover:bg-sauge/20"
                                >
                                    Fermer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
