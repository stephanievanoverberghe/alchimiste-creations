import type { SectionAnchor } from './use-active-section';

const round = (value: number) => Number(value.toFixed(2));

export function buildRoadmapPath(width: number, height: number, anchors: SectionAnchor[]) {
    if (anchors.length >= 2) {
        const [first, ...rest] = anchors;
        let d = `M ${round(first.x)} ${round(first.y)}`;

        rest.forEach((anchor, index) => {
            const previous = anchors[index];
            const controlY = (previous.y + anchor.y) / 2;
            d += ` C ${round(previous.x)} ${round(controlY)}, ${round(anchor.x)} ${round(controlY)}, ${round(anchor.x)} ${round(anchor.y)}`;
        });

        return d;
    }

    const marginX = Math.max(width * 0.12, 32);
    const usableWidth = Math.max(width - marginX * 2, 10);
    const stepY = Math.max(height / 6, 120);
    const points = Array.from({ length: 7 }, (_, index) => ({
        x: index % 2 === 0 ? marginX : marginX + usableWidth,
        y: 60 + index * stepY,
    }));

    let d = `M ${round(points[0].x)} ${round(points[0].y)}`;
    for (let index = 1; index < points.length; index += 1) {
        const previous = points[index - 1];
        const current = points[index];
        const controlY = (previous.y + current.y) / 2;
        d += ` C ${round(previous.x)} ${round(controlY)}, ${round(current.x)} ${round(controlY)}, ${round(current.x)} ${round(current.y)}`;
    }

    return d;
}
