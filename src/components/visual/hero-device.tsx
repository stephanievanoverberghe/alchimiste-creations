import { Card } from '@/components/ui/card';
import { AtomBackground } from '@/components/visual/atom-background';
import { cn } from '@/lib/utils';

type HeroDeviceProps = {
    chips: string[];
    stats?: { value: string; label: string }[];
    variant: 'a' | 'b';
};

export function HeroDevice({ chips, stats = [], variant }: HeroDeviceProps) {
    return (
        <div className="group relative isolate">
            <div className="absolute -inset-5 -z-10 rounded-4xl bg-linear-to-br from-primary/20 via-accent/10 to-transparent blur-2xl" aria-hidden />
            <Card className="relative overflow-hidden border-border/70 bg-card/70 p-2 backdrop-blur-xl">
                <div className="hero-device-frame relative overflow-hidden rounded-2xl border border-white/10 bg-background/60 p-2 transition-transform duration-(--motion-base) motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:rotate-[0.4deg]">
                    <div className="hero-device-overlay pointer-events-none absolute inset-0" aria-hidden />
                    <AtomBackground />

                    <ul className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2" aria-hidden>
                        {chips.slice(0, 3).map((chip) => (
                            <li key={chip} className="rounded-full border border-border/70 bg-surface-elevated/80 px-3 py-1 text-xs font-semibold text-text">
                                {chip}
                            </li>
                        ))}
                    </ul>

                    {variant === 'b' ? (
                        <div className="pointer-events-none absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2" aria-hidden>
                            {stats.slice(0, 3).map((stat) => (
                                <div key={stat.label} className="rounded-xl border border-border/70 bg-background/80 p-2 text-center backdrop-blur">
                                    <p className="text-sm font-semibold text-primary">{stat.value}</p>
                                    <p className="text-[11px] text-text-muted">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
            </Card>
            <div
                className={cn('hero-device-gloss pointer-events-none absolute inset-x-8 top-3 h-10 rounded-full bg-white/10 blur-xl', variant === 'b' && 'opacity-80')}
                aria-hidden
            />
        </div>
    );
}
