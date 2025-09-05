import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { AUTHOR } from "consts";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      authorsNames: z.array(z.string()).default([AUTHOR]),
      category: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image(),
      heroImageAlt: z.string().default(""),
    }),
});

const authors = defineCollection({
  loader: glob({ base: "./src/content/authors", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image(),
      bio: z.string(),
    }),
});

export const collections = { blog, authors };
