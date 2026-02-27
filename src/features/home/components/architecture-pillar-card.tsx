import Image from 'next/image';

import type { HomePillar } from '@/content/home';
import { cn } from '@/lib/utils';

import { ARCHITECTURE_ICONS, ARCHITECTURE_IMAGE_CAPTION, ARCHITECTURE_IMPACT_LABEL, ARCHITECTURE_STEP_BADGE } from '../sections/home-architecture-section.data';

type ArchitecturePillarCardProps = {
    pillar: HomePillar;
    variant: 'desktop' | 'mobile';
    bulletLimit?: number;
    imageTransform?: string;
};

export function ArchitecturePillarCard({ pillar, variant, bulletLimit, imageTransform }: ArchitecturePillarCardProps) {
    const Icon = ARCHITECTURE_ICONS[pillar.icon];
    const isDesktop = variant === 'desktop';
    const bullets = typeof bulletLimit === 'number' ? pillar.bullets.slice(0, bulletLimit) : pillar.bullets;

    return (
        <div className={cn('relative z-10', isDesktop ? 'grid gap-8 lg:grid-cols-[1.1fr_0.9fr]' : 'flex h-full flex-col')}>
            <div>
                <div className="flex items-start gap-3">
                    <span
                        className={cn(
                            'rounded-2xl border border-border/70 bg-background/40',
                            isDesktop ? 'inline-flex h-10 w-10 items-center justify-center' : 'p-2 backdrop-blur',
                        )}
                    >
                        <Icon className="h-5 w-5 text-accent" />
                    </span>
                    <div className="min-w-0">
                        <p className={cn('text-text-muted', isDesktop ? 'text-xs font-semibold tracking-wide' : 'text-xs')}>
                            {ARCHITECTURE_STEP_BADGE[pillar.title]} · <span className="text-accent">{pillar.title}</span>
                        </p>
                        <h3 className={cn('mt-1 font-semibold leading-snug', isDesktop ? 'text-xl' : 'text-base')}>{pillar.headline}</h3>
                    </div>
                </div>

                <p className={cn('text-text-muted', isDesktop ? 'mt-3 text-sm sm:text-base' : 'mt-3 text-sm')}>{pillar.description}</p>

                <ul className={cn('text-text-muted', isDesktop ? 'mt-5 space-y-2 text-sm sm:text-base' : 'mt-3 space-y-2 text-sm')}>
                    {bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                            <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full bg-accent', isDesktop ? 'mt-2' : 'mt-1.5')} />
                            <span>{bullet}</span>
                        </li>
                    ))}
                </ul>

                <div className={cn('flex items-center justify-between border-t border-border/60 text-xs text-text-muted', isDesktop ? 'mt-5 pt-4 sm:text-sm' : 'mt-3 pt-3')}>
                    <span>Impact</span>
                    <span className={cn('font-semibold', isDesktop && pillar.title !== 'Convertit' ? 'text-text-muted' : 'text-text')}>
                        {ARCHITECTURE_IMPACT_LABEL[pillar.title]}
                    </span>
                </div>
            </div>

            {pillar.image ? (
                <div className="overflow-hidden rounded-2xl border border-border/70 bg-background/30">
                    <div className="relative h-56 sm:h-64 md:h-72">
                        <Image
                            src={pillar.image.src}
                            alt={pillar.image.alt}
                            width={isDesktop ? 640 : 540}
                            height={isDesktop ? 420 : 300}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            style={imageTransform ? { transform: imageTransform } : undefined}
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent md:via-background/25" />

                        {isDesktop && <p className="absolute bottom-3 left-3 text-xs font-medium text-text sm:text-sm">{ARCHITECTURE_IMAGE_CAPTION[pillar.title]}</p>}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
