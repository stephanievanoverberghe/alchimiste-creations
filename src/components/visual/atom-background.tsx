import Image from 'next/image';
import { AtomBackgroundCanvasLoader } from './atom-background-canvas-loader';

const discoveries = [
    { label: 'Offre claire', image: '/images/discovery-story.svg', offset: -18, delay: '0s' },
    { label: 'Preuves', image: '/images/discovery-ai.svg', offset: 4, delay: '1.6s' },
    { label: 'CTA visible', image: '/images/discovery-motion.svg', offset: 26, delay: '3s' },
];

export function AtomBackground() {
    return (
        <div className="atom-hero">
            <AtomBackgroundCanvasLoader />

            <div className="atom-hero__discoveries" aria-hidden="true">
                {discoveries.map((discovery) => (
                    <div key={discovery.label} className="atom-hero__chip" style={{ top: `calc(50% + ${discovery.offset}%)`, animationDelay: discovery.delay }}>
                        <Image src={discovery.image} alt="" width={46} height={46} />
                        <span>{discovery.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
