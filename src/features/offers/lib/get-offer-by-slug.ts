import { offers } from '@/content/offers';

export function getOfferBySlug(slug: string) {
    return offers.find((offer) => offer.slug === slug);
}
