import { faq } from '@/content/faq';
import { packs } from '@/content/packs';
import { projects } from '@/content/projects';
import { siteContent } from '@/content/site';

export function getSiteViewModel() {
    return {
        site: siteContent,
        packs,
        projects,
        faq,
        featuredFaq: faq.filter((item) => item.featured).slice(0, 4),
    };
}
