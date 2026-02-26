import { getSiteViewModel } from '@/application/site/use-cases/getSiteViewModel';
import { PageHero } from '@/presentation/sections/marketing/PageHero';
import { Section } from '@/presentation/ui/primitives/Section';

export function ContactPage() {
    const { site } = getSiteViewModel();
    return (
        <>
            <PageHero {...site.contact.intro} primary={site.contact.intro.cta.primary} secondary={site.contact.intro.cta.secondary} />
            <Section>
                <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
                    <form className="rounded-2xl border border-sauge/35 p-6" aria-describedby="contact-help">
                        <h2 className="text-3xl">Demander un devis</h2>
                        <p id="contact-help" className="mt-2 text-sm text-foreground/75">
                            Décrivez votre besoin en quelques lignes. Retour sous 48h.
                        </p>
                        <div className="mt-6 grid gap-4">
                            <label className="grid gap-1 text-sm">
                                Nom
                                <input className="h-11 rounded-xl border border-sauge/40 px-3" name="name" required />
                            </label>
                            <label className="grid gap-1 text-sm">
                                Email
                                <input className="h-11 rounded-xl border border-sauge/40 px-3" name="email" type="email" required />
                            </label>
                            <label className="grid gap-1 text-sm">
                                Message
                                <textarea className="min-h-32 rounded-xl border border-sauge/40 px-3 py-2" name="message" required />
                            </label>
                            <button className="h-11 rounded-full bg-terracotta px-5 font-semibold text-[var(--ivoire)]">Envoyer ma demande</button>
                        </div>
                    </form>
                    <aside className="rounded-2xl border border-terracotta/30 bg-terracotta/5 p-6">
                        <h2 className="text-3xl">Rassurances</h2>
                        <ul className="mt-4 space-y-3 text-foreground/80">
                            {site.contact.reassurance.map((item) => (
                                <li key={item}>• {item}</li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </Section>
        </>
    );
}
