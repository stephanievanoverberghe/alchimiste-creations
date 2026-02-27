'use client';

import { useEffect, useRef } from 'react';

type ThreeObject = {
    position: { set: (x: number, y: number, z: number) => void; y: number };
    rotation: { x: number; y: number };
};

type ThreeMaterial = { dispose: () => void };
type ThreeGeometry = {
    dispose: () => void;
    setAttribute: (name: string, attribute: ThreeBufferAttribute) => void;
};
type ThreeBufferAttribute = object;

type ThreeRenderer = {
    setPixelRatio: (value: number) => void;
    setSize: (width: number, height: number, updateStyle: boolean) => void;
    render: (scene: object, camera: ThreeCamera) => void;
    dispose: () => void;
};

type ThreeCamera = {
    aspect: number;
    position: { set: (x: number, y: number, z: number) => void };
    updateProjectionMatrix: () => void;
};

type ThreeNamespace = {
    Scene: new () => { fog?: object; add: (...objects: object[]) => void };
    FogExp2: new (color: number, density: number) => object;
    PerspectiveCamera: new (fov: number, aspect: number, near: number, far: number) => ThreeCamera;
    WebGLRenderer: new (options: { canvas: HTMLCanvasElement; alpha: boolean; antialias: boolean }) => ThreeRenderer;
    PointLight: new (color: number, intensity: number, distance: number) => ThreeObject;
    TorusKnotGeometry: new (radius: number, tube: number, tubularSegments: number, radialSegments: number) => ThreeGeometry;
    MeshPhysicalMaterial: new (options: object) => ThreeMaterial;
    Mesh: new (geometry: ThreeGeometry, material: ThreeMaterial) => ThreeObject;
    BufferGeometry: new () => ThreeGeometry;
    BufferAttribute: new (array: Float32Array, itemSize: number) => ThreeBufferAttribute;
    PointsMaterial: new (options: object) => ThreeMaterial;
    Points: new (geometry: ThreeGeometry, material: ThreeMaterial) => ThreeObject;
};

declare global {
    interface Window {
        THREE?: Record<string, unknown>;
    }
}

const THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';

export function AtomBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let stopAnimation = false;
        let frameId = 0;
        let renderer: ThreeRenderer | undefined;

        const initScene = () => {
            if (!window.THREE) return;
            const THREE = window.THREE as unknown as ThreeNamespace;

            const scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x070b14, 0.035);

            const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
            camera.position.set(0, 0, 7.5);

            renderer = new THREE.WebGLRenderer({
                canvas,
                alpha: true,
                antialias: true,
            });

            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

            const lightMain = new THREE.PointLight(0x755aff, 1.4, 30);
            lightMain.position.set(2.5, 2.2, 6);
            scene.add(lightMain);

            const lightFill = new THREE.PointLight(0x13d1ff, 1, 25);
            lightFill.position.set(-4, -2.5, 3);
            scene.add(lightFill);

            const coreGeometry = new THREE.TorusKnotGeometry(1.4, 0.34, 140, 16);
            const coreMaterial = new THREE.MeshPhysicalMaterial({
                color: 0x9f8dff,
                metalness: 0.35,
                roughness: 0.2,
                transmission: 0.15,
                clearcoat: 0.9,
                wireframe: true,
            });

            const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
            scene.add(coreMesh);

            const starsGeometry = new THREE.BufferGeometry();
            const starsCount = 320;
            const starsPositions = new Float32Array(starsCount * 3);

            for (let i = 0; i < starsCount; i += 1) {
                starsPositions[i * 3] = (Math.random() - 0.5) * 9;
                starsPositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
                starsPositions[i * 3 + 2] = (Math.random() - 0.5) * 7;
            }

            starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));

            const starsMaterial = new THREE.PointsMaterial({
                color: 0xd0ebff,
                size: 0.045,
                transparent: true,
                opacity: 0.8,
            });

            const stars = new THREE.Points(starsGeometry, starsMaterial);
            scene.add(stars);

            const resize = () => {
                const width = canvas.clientWidth;
                const height = canvas.clientHeight;
                renderer?.setSize(width, height, false);
                camera.aspect = width / Math.max(height, 1);
                camera.updateProjectionMatrix();
            };

            resize();
            window.addEventListener('resize', resize);

            const tick = (time: number) => {
                if (stopAnimation) return;

                const t = time * 0.001;

                coreMesh.rotation.x = t * 0.25;
                coreMesh.rotation.y = t * 0.45;
                coreMesh.position.y = Math.sin(t * 1.3) * 0.2;

                stars.rotation.y = t * 0.05;
                stars.rotation.x = t * 0.025;

                renderer?.render(scene, camera);
                frameId = window.requestAnimationFrame(tick);
            };

            frameId = window.requestAnimationFrame(tick);

            return () => {
                window.removeEventListener('resize', resize);
                window.cancelAnimationFrame(frameId);
                coreGeometry.dispose();
                coreMaterial.dispose();
                starsGeometry.dispose();
                starsMaterial.dispose();
                renderer?.dispose();
            };
        };

        let cleanup: (() => void) | undefined;

        const ensureThree = () => {
            if (window.THREE) {
                cleanup = initScene();
                return;
            }

            const script = document.createElement('script');
            script.src = THREE_CDN;
            script.async = true;
            script.addEventListener('load', () => {
                cleanup = initScene();
            });

            document.head.appendChild(script);
        };

        ensureThree();

        return () => {
            stopAnimation = true;
            window.cancelAnimationFrame(frameId);
            cleanup?.();
            renderer?.dispose();
        };
    }, []);

    return (
        <div className="atom-hero" aria-hidden="true">
            <canvas ref={canvasRef} className="atom-hero__canvas" />
        </div>
    );
}
