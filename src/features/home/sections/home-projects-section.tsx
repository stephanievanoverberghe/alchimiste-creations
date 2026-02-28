import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { cn } from '@/lib/utils';
import type { HomeContent } from '@/content/home';
import { ArrowRight, Camera, LayoutPanelTop, Sparkles, Brush, Wand2 } from 'lucide-react';

type HomeProjectsSectionProps = {
    content: HomeContent['projects'];
    contactHref?: string;
};

const ICONS = {
    camera: Camera,
    layout: LayoutPanelTop,
    sparkles: Sparkles,
    brush: Brush,
    wand2: Wand2,
} as const;

export function HomeProjectsSection({ content, contactHref = '/contact' }: HomeProjectsSectionProps) {
    const featured = content.items.filter((p) => p.featured).slice(0, 2);
    const displayed = featured.length ? featured : content.items.slice(0, 2);
    const [mainProject, secondaryProject] = displayed;

    return (
        <Section id="projects">
            <Container>
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
                    <Link href="/projets" className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-strong">
                        Voir tous les projets <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-6">
                    {mainProject
                        ? (() => {
                              const Icon = mainProject.icon ? ICONS[mainProject.icon] : null;

                              return (
                                  <Link key={mainProject.slug} href={`/projets/${mainProject.slug}`} className="focus-ring rounded-lg md:col-span-4">
                                      <Card className="group relative overflow-hidden border-border/70 bg-linear-to-br from-surface via-surface/95 to-surface/80 p-5 transition duration-300 ease-out hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_22px_50px_rgba(8,10,20,0.5)]">
                                          <div className="relative flex items-start justify-between gap-3">
                                              <div className="min-w-0">
                                                  <p className="text-xs font-semibold tracking-wide text-text-muted">{mainProject.sector}</p>
                                                  <p className="mt-1 text-xl font-semibold">{mainProject.client}</p>
                                              </div>

                                              {Icon ? (
                                                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-background/40 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2">
                                                      <Icon className="h-5 w-5 text-accent" />
                                                  </span>
                                              ) : null}
                                          </div>

                                          {mainProject.image ? (
                                              <div className="relative mt-4 overflow-hidden rounded-2xl border border-border/70 bg-background/30">
                                                  <Image
                                                      src={mainProject.image.src}
                                                      alt={mainProject.image.alt}
                                                      width={900}
                                                      height={520}
                                                      className="h-48 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-56"
                                                      priority
                                                  />
                                                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-surface/70 via-surface/15 to-transparent opacity-90" />

                                                  <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-2">
                                                      {mainProject.outcomes.slice(0, 2).map((outcome) => (
                                                          <span
                                                              key={outcome}
                                                              className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur"
                                                          >
                                                              {outcome}
                                                          </span>
                                                      ))}
                                                  </div>
                                              </div>
                                          ) : null}

                                          <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                              <div className="rounded-2xl border border-border/70 bg-background/25 p-3 text-sm text-text-muted">
                                                  <p className="text-xs font-semibold tracking-wide text-text-muted">Avant</p>
                                                  <p className="mt-1 text-pretty">{mainProject.challenge}</p>
                                              </div>
                                              <div className="rounded-2xl border border-accent/35 bg-accent/8 p-3 text-sm text-text-muted">
                                                  <p className="text-xs font-semibold tracking-wide text-accent">Après</p>
                                                  <p className="mt-1 text-pretty">{mainProject.solution}</p>
                                              </div>
                                          </div>

                                          <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-text">
                                              Voir l&apos;étude de cas <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                          </div>
                                      </Card>
                                  </Link>
                              );
                          })()
                        : null}

                    {secondaryProject
                        ? (() => {
                              const Icon = secondaryProject.icon ? ICONS[secondaryProject.icon] : null;

                              return (
                                  <Link key={secondaryProject.slug} href={`/projets/${secondaryProject.slug}`} className="focus-ring rounded-lg md:col-span-2">
                                      <Card className="group relative h-full overflow-hidden border-border/70 bg-linear-to-b from-surface/95 to-surface/80 p-5 transition duration-300 ease-out hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_18px_40px_rgba(8,10,20,0.45)]">
                                          <div className="relative flex items-start justify-between gap-3">
                                              <div className="min-w-0">
                                                  <p className="text-xs font-semibold tracking-wide text-text-muted">{secondaryProject.sector}</p>
                                                  <p className="mt-1 text-lg font-semibold">{secondaryProject.client}</p>
                                              </div>

                                              {Icon ? (
                                                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-background/40 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2">
                                                      <Icon className="h-5 w-5 text-accent" />
                                                  </span>
                                              ) : null}
                                          </div>

                                          {secondaryProject.image ? (
                                              <div className="relative mt-4 overflow-hidden rounded-2xl border border-border/70 bg-background/30">
                                                  <Image
                                                      src={secondaryProject.image.src}
                                                      alt={secondaryProject.image.alt}
                                                      width={640}
                                                      height={360}
                                                      className="h-36 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                  />
                                                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-surface/55 to-transparent opacity-80" />
                                              </div>
                                          ) : null}

                                          <div className="mt-4 space-y-3 text-sm text-text-muted">
                                              <p className="text-pretty">
                                                  <span className="font-semibold text-text">Besoin :</span> {secondaryProject.challenge}
                                              </p>
                                              <p className="text-pretty">
                                                  <span className="font-semibold text-text">Réponse :</span> {secondaryProject.solution}
                                              </p>
                                          </div>

                                          <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-text">
                                              Voir le projet <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                          </div>
                                      </Card>
                                  </Link>
                              );
                          })()
                        : null}

                    <Link
                        href={contactHref}
                        className={cn(
                            'focus-ring group rounded-lg md:col-span-6',
                            'glass relative overflow-hidden p-6 md:p-8',
                            'transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(8,10,20,0.45)]',
                        )}
                        aria-label="Contact - Planifier un appel découverte"
                    >
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full blur-3xl transition-all duration-500 group-hover:scale-110"
                            style={{ background: 'rgba(122,84,255,0.16)' }}
                        />

                        <div className="flex flex-wrap items-center justify-between gap-6">
                            <div className="max-w-xl">
                                <p className="text-sm font-semibold text-accent">Et si c’était le vôtre ?</p>
                                <h3 className="mt-2 text-lg font-semibold">On clarifie votre message et on augmente les prises de contact.</h3>
                                <p className="mt-2 text-sm text-text-muted">
                                    Parlez-moi de votre activité : on voit en 20 min si la meilleure option est une One Page, un site vitrine ou une refonte.
                                </p>
                            </div>

                            <ul className="grid gap-2 text-sm text-text-muted sm:grid-cols-2" aria-label="Bénéfices de l'accompagnement">
                                <li className="rounded-xl border border-border/70 bg-background/20 px-3 py-2">Message clair en 5 secondes</li>
                                <li className="rounded-xl border border-border/70 bg-background/20 px-3 py-2">Parcours simple vers le contact</li>
                                <li className="rounded-xl border border-border/70 bg-background/20 px-3 py-2">Design moderne et crédible</li>
                                <li className="rounded-xl border border-border/70 bg-background/20 px-3 py-2">CTA visibles au bon moment</li>
                            </ul>
                        </div>

                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-text">
                            Planifier un appel découverte <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    </Link>
                </div>
            </Container>
        </Section>
    );
}
