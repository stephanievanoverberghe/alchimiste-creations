import { homeAboutPreviewCopy } from '@/infrastructure/content/home-copy';

export type HomeAboutPreviewContent = {
    imageAlt: string;
    badge: string;
    title: string;
    introBeforeEmphasis: string;
    introEmphasis: string;
    introAfterEmphasis: string;
    highlights: [string, string, string];
    cta: string;
};

function assertString(value: unknown, context: string): asserts value is string {
    if (typeof value !== 'string' || value.trim().length === 0) {
        throw new Error(`Invalid home about preview content: ${context} is required`);
    }
}

function splitIntro(intro: string) {
    const marker = 'jalons courts';
    const markerIndex = intro.toLowerCase().indexOf(marker);

    if (markerIndex === -1) {
        return {
            before: intro,
            emphasis: '',
            after: '',
        };
    }

    const before = intro.slice(0, markerIndex).trimEnd();
    const emphasis = intro.slice(markerIndex, markerIndex + marker.length);
    const after = intro.slice(markerIndex + marker.length);

    return { before, emphasis, after };
}

export function getHomeAboutPreviewContent(): HomeAboutPreviewContent {
    const source = homeAboutPreviewCopy;

    assertString(source.imageAlt, 'imageAlt');
    assertString(source.badge, 'badge');
    assertString(source.title, 'title');
    assertString(source.intro, 'intro');
    assertString(source.cta, 'cta');

    if (!Array.isArray(source.highlights) || source.highlights.length !== 3) {
        throw new Error('Invalid home about preview content: highlights must contain exactly 3 items');
    }

    source.highlights.forEach((highlight, index) => assertString(highlight, `highlights[${index}]`));

    const intro = splitIntro(source.intro);

    return {
        imageAlt: source.imageAlt,
        badge: source.badge,
        title: source.title,
        introBeforeEmphasis: intro.before,
        introEmphasis: intro.emphasis,
        introAfterEmphasis: intro.after,
        highlights: [source.highlights[0], source.highlights[1], source.highlights[2]],
        cta: source.cta,
    };
}
