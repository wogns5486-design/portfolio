import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleKo: z.string(),
    description: z.string(),
    category: z.enum(['live', 'landing', 'app', 'tool', 'wishket']),
    subTags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    liveUrl: z.string().url().optional(),
    demoUrl: z.string().optional(),
    screenshot: z.string().optional(),
    techs: z.array(z.string()),
    tag: z.string(),
    order: z.number().default(999),
    client: z.string().optional(),
    duration: z.string().optional(),
    challenge: z.string().optional(),
    solution: z.string().optional(),
    result: z.string().optional(),
    screenshots: z.array(z.string()).default([]),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()).default([]),
    ogImage: z.string().optional(),
  }),
});

const testimonials = defineCollection({
  type: 'content',
  schema: z.object({
    client: z.string(),
    company: z.string().optional(),
    project: z.string(),
    rating: z.number().min(1).max(5),
    date: z.date(),
  }),
});

export const collections = { projects, blog, testimonials };
