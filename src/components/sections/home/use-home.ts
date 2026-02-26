import { homeContent } from '@/content/home';

export function useHome() {
    const featuredOffer = homeContent.offers.items.find((offer) => offer.featured) ?? homeContent.offers.items[0];

    return {
        content: homeContent,
        featuredOffer,
    };
}
