import { z } from 'zod';

export const packSchema = z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    baseline: z.string().min(1),
    idealFor: z.string().min(1),
    priceFrom: z.string().min(1),
    timeline: z.string().min(1),
    highlights: z.array(z.string().min(1)).min(3),
    ctaHref: z.string().startsWith('/'),
    featured: z.boolean().default(false),
});

export const projectSchema = z.object({
    slug: z.string().min(1),
    name: z.string().min(1),
    sector: z.string().min(1),
    challenge: z.string().min(1),
    outcome: z.string().min(1),
    image: z.string().min(1),
    tags: z.array(z.string().min(1)).default([]),
    testimonial: z
        .object({
            quote: z.string().min(1),
            author: z.string().min(1),
        })
        .optional(),
});

export const faqItemSchema = z.object({
    id: z.string().min(1),
    question: z.string().min(1),
    answer: z.string().min(1),
    featured: z.boolean().default(false),
});

export const packsSchema = z.array(packSchema);
export const projectsSchema = z.array(projectSchema);
export const faqSchema = z.array(faqItemSchema);

export type Pack = z.infer<typeof packSchema>;
export type Project = z.infer<typeof projectSchema>;
export type FaqItem = z.infer<typeof faqItemSchema>;
