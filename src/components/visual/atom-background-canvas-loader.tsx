'use client';

import dynamic from 'next/dynamic';

const AtomBackgroundCanvas = dynamic(() => import('./atom-background-canvas').then((module) => module.AtomBackgroundCanvas), {
    ssr: false,
});

export function AtomBackgroundCanvasLoader() {
    return <AtomBackgroundCanvas />;
}
