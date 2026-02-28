import { z } from 'zod';

export const navItemSchema = z.object({
    label: z.string(),
    href: z.string(),
});

export const statSchema = z.object({
    label: z.string(),
    value: z.string(),
});

export const offerImageSchema = z.object({
    src: z.string(),
    alt: z.string(),
});

export const offerSchema = z.object({
    slug: z.string(),
    name: z.string(),
    punchline: z.string(),
    summary: z.string(),
    timeline: z.string(),
    priceFrom: z.string(),
    priceFactors: z.array(z.string()).optional(),
    deliverables: z.array(z.string()).min(3),
    featured: z.boolean().default(false),
    icon: z.enum(['shield', 'sparkles', 'layout', 'zap']).optional(),
    bestFor: z.string().optional(),
    highlights: z.array(z.string()).optional(),
    note: z.string().optional(),
    image: z.object({ src: z.string(), alt: z.string() }).optional(),
});

export const projectSchema = z.object({
    slug: z.string(),
    client: z.string(),
    sector: z.string(),
    challenge: z.string(),
    solution: z.string(),
    outcomes: z.array(z.string()).min(2),
    stack: z.array(z.string()),
    tag: z.string().optional(),
    icon: z.enum(['brush', 'sparkles', 'camera', 'layout', 'wand2']).optional(),
    image: z.object({ src: z.string(), alt: z.string() }).optional(),
    liveUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
});

export const faqSchema = z.object({
    question: z.string(),
    answer: z.string(),
});

export const siteSchema = z.object({
    brand: z.string(),
    baseline: z.string(),
    valueProposition: z.string(),
    ctaPrimary: z.object({ label: z.string(), href: z.string() }),
    ctaSecondary: z.object({ label: z.string(), href: z.string() }),
    nav: z.array(navItemSchema),
    stats: z.array(statSchema),
});

export const offersSchema = z.array(offerSchema);
export const projectsSchema = z.array(projectSchema);
export const faqListSchema = z.array(faqSchema);

export type SiteContent = z.infer<typeof siteSchema>;
export type Offer = z.infer<typeof offerSchema>;
export type Project = z.infer<typeof projectSchema>;
export type FAQ = z.infer<typeof faqSchema>;
