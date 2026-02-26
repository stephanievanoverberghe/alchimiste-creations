'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

type Orbit = {
    radiusX: number;
    radiusY: number;
    speed: number;
    tilt: number;
    color: string;
};

const orbits: Orbit[] = [
    { radiusX: 130, radiusY: 62, speed: 0.9, tilt: 0.3, color: 'rgba(117, 90, 255, 0.75)' },
    { radiusX: 110, radiusY: 80, speed: -0.7, tilt: -0.45, color: 'rgba(19, 209, 255, 0.7)' },
    { radiusX: 145, radiusY: 54, speed: 0.55, tilt: 1.05, color: 'rgba(255, 120, 214, 0.58)' },
];

const discoveries = [
    { label: 'IA', image: '/images/discovery-ai.svg', offset: -15, delay: '0s' },
    { label: 'Motion', image: '/images/discovery-motion.svg', offset: 10, delay: '1.8s' },
    { label: 'Story', image: '/images/discovery-story.svg', offset: 24, delay: '3.1s' },
];

export function AtomBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        let frame = 0;
        let rafId = 0;

        const render = () => {
            const ratio = window.devicePixelRatio || 1;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;

            if (canvas.width !== width * ratio || canvas.height !== height * ratio) {
                canvas.width = width * ratio;
                canvas.height = height * ratio;
                context.setTransform(ratio, 0, 0, ratio, 0, 0);
            }

            context.clearRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;

            context.save();
            context.beginPath();
            context.arc(centerX, centerY, 22, 0, Math.PI * 2);
            const nucleus = context.createRadialGradient(centerX - 6, centerY - 4, 4, centerX, centerY, 30);
            nucleus.addColorStop(0, 'rgba(255,255,255,0.95)');
            nucleus.addColorStop(1, 'rgba(117,90,255,0.18)');
            context.fillStyle = nucleus;
            context.fill();
            context.restore();

            orbits.forEach((orbit) => {
                context.save();
                context.translate(centerX, centerY);
                context.rotate(orbit.tilt);

                context.beginPath();
                context.ellipse(0, 0, orbit.radiusX, orbit.radiusY, 0, 0, Math.PI * 2);
                context.strokeStyle = orbit.color;
                context.lineWidth = 1.7;
                context.stroke();

                const t = frame * 0.01 * orbit.speed;
                const x = Math.cos(t) * orbit.radiusX;
                const y = Math.sin(t) * orbit.radiusY;

                context.beginPath();
                context.arc(x, y, 5.3, 0, Math.PI * 2);
                context.fillStyle = orbit.color;
                context.shadowColor = orbit.color;
                context.shadowBlur = 20;
                context.fill();
                context.restore();
            });

            frame += 1;
            rafId = window.requestAnimationFrame(render);
        };

        rafId = window.requestAnimationFrame(render);

        return () => window.cancelAnimationFrame(rafId);
    }, []);

    return (
        <div className="atom-hero">
            <canvas ref={canvasRef} className="atom-hero__canvas" aria-hidden="true" />

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
