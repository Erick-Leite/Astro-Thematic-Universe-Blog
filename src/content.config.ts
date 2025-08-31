import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { authorsData } from "./data/authorsData";

const defaultAuthorName = authorsData[0].name;

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      authorsNames: z.array(z.string()).default([defaultAuthorName]),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image(),
      heroImageAlt: z.string().default(""),
    }),
});

export const collections = { blog };
