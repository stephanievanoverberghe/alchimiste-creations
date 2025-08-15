import Image from 'next/image';
import Link from 'next/link';
import { Quote, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import projectsData from '@/data/projects.json';

type Testi = { quote: string; author?: string };
type Urls = { caseStudy?: string };
type Project = {
    slug: string;
    titre?: string;
    client?: string;
    logo?: string;
    logoAlt?: string;
    testimonials?: Testi[];
    urls?: Urls;
    featured?: boolean;
    priority?: number;
};

type Props = {
    id?: string;
    /** Forcer un projet (ex: "norel-art"). Si non fourni : featured + priority, sinon premier avec testimonial. */
    slug?: string;
    /** Micro-tag au-dessus du bloc */
    tag?: string;
    className?: string;
};

function chooseProject(list: Project[], prefer?: string): Project | undefined {
    const valid = list.filter((p) => Array.isArray(p.testimonials) && p.testimonials.length > 0);
    if (!valid.length) return undefined;
    if (prefer) return valid.find((p) => p.slug === prefer) ?? valid[0];

    const byFeatured = valid.slice().sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false) || (a.priority ?? 999) - (b.priority ?? 999));
    return byFeatured[0] ?? valid[0];
}

export default function ContactTestimonial({ id = 'contact-temoignage', slug, tag = 'Onboarding fluide', className }: Props) {
    const RAW = Array.isArray(projectsData) ? (projectsData as Project[]) : [];
    const project = chooseProject(RAW, slug);

    if (!project) return null;

    // on prend la 1re citation “courte”
    const quote = project.testimonials?.[0]?.quote ?? '';
    const author = project.testimonials?.[0]?.author ?? project.client ?? project.titre ?? 'Client';
    const logoSrc = project.logo;
    const logoAlt = project.logoAlt || '';
    const href = project.urls?.caseStudy;

    return (
        <section id={id} aria-labelledby="contact-temoignage-title" className={cn('relative py-16 md:py-24 px-6 md:px-8 lg:px-[100px] xl:px-[150px]', className)}>
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background pointer-events-none" aria-hidden />

            {/* Fond or avec opacité 10% UNIQUEMENT sur mobile */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0 pointer-events-none" aria-hidden />

            {/* Vague décorative visible uniquement à partir de md */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0 pointer-events-none" aria-hidden>
                <Image src="/deco/about-wave.png" alt="" role="presentation" fill priority className="object-cover" sizes="100vw" />
            </div>
            <div className="relative max-w-5xl mx-auto">
                <article className="group relative overflow-hidden rounded-[20px] border border-sauge/30 bg-background p-5 md:p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    {/* motif discret */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                        aria-hidden
                    />

                    {/* header */}
                    <header className="relative z-[1] flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-3 py-1">
                            {tag}
                        </span>
                        <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge" aria-hidden>
                            <Quote className="w-4 h-4" />
                        </span>
                    </header>

                    {/* séparateur animé */}
                    <div className="relative z-[1] mt-3 h-[2px] overflow-hidden" aria-hidden>
                        <div className="absolute inset-0 bg-sauge/20" />
                        <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                    </div>

                    {/* citation */}
                    <h3 id="contact-temoignage-title" className="sr-only">
                        Témoignage
                    </h3>
                    <blockquote className="relative z-[1] mt-4 text-base md:text-lg text-foreground/90 leading-relaxed">
                        <p className="italic">“{quote}”</p>
                    </blockquote>

                    {/* auteur */}
                    <footer className="relative z-[1] mt-5 flex items-center gap-3">
                        {logoSrc ? (
                            <span className="relative inline-block size-10 rounded-full overflow-hidden border border-sauge/30 bg-background">
                                <Image src={logoSrc} alt={logoAlt} fill sizes="40px" className="object-contain p-1.5" />
                            </span>
                        ) : (
                            <span className="grid place-content-center size-10 rounded-full border border-sauge/30 bg-sauge/10 text-sauge text-sm font-semibold">
                                {author?.[0]?.toUpperCase() ?? '•'}
                            </span>
                        )}

                        <div className="min-w-0">
                            <div className="text-sm font-semibold text-foreground">{author}</div>
                            {project.titre && <div className="text-xs text-foreground/70 truncate">{project.titre}</div>}
                        </div>

                        {href && (
                            <div className="ml-auto">
                                <Link
                                    href={href}
                                    className={cn(
                                        'group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl',
                                        'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                                        'border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]',
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                                    )}
                                >
                                    Voir le cas
                                    <ChevronRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" aria-hidden />
                                </Link>
                            </div>
                        )}
                    </footer>
                </article>
            </div>
        </section>
    );
}
