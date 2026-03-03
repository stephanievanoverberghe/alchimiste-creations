export function formatPrice(price: string) {
    return price
        .replace(/\s?€/, '€')
        .replace(/\s{2,}/g, ' ')
        .trim();
}

export function formatTimeline(timeline: string) {
    return timeline.replace('jours ouvrés', 'jours').trim();
}
