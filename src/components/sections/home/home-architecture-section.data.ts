import { Sparkles, ShieldCheck, Target } from 'lucide-react';

import type { HomePillar } from '@/content/home';

export const ARCHITECTURE_ICONS = {
    sparkles: Sparkles,
    shield: ShieldCheck,
    target: Target,
} as const;

export const ARCHITECTURE_STEP_BADGE: Record<HomePillar['title'], string> = {
    Attire: '01',
    Convainc: '02',
    Convertit: '03',
};

export const ARCHITECTURE_IMPACT_LABEL: Record<HomePillar['title'], string> = {
    Attire: '↑ Attention',
    Convainc: '↑ Confiance',
    Convertit: '↑ Prises de contact',
};

export const ARCHITECTURE_IMAGE_CAPTION: Record<HomePillar['title'], string> = {
    Attire: 'Clarté immédiate',
    Convainc: 'Confiance renforcée',
    Convertit: 'Action évidente',
};

export const ARCHITECTURE_GLOW_BY_PILLAR: Record<HomePillar['title'], string> = {
    Attire: 'rgba(122,84,255,0.16)',
    Convainc: 'rgba(19,209,255,0.14)',
    Convertit: 'rgba(122,84,255,0.12)',
};

export const ARCHITECTURE_AUTO_PLAY_MS = 5200;
