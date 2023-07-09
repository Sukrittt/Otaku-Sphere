import { z } from "zod";

export const animeSchema = z.object({
  id: z.string().optional(), //server validation
  name: z.string().min(3).max(50),
  description: z.string().min(3).max(1500),
  genre: z.string(),
  releaseYear: z
    .string()
    .regex(/^[0-9_]+$/, { message: "Please enter a valid year." })
    .min(4, { message: "Please enter a valid year." })
    .max(4, { message: "Please enter a valid year." }),
  director: z.string().min(3).max(50),

  trailerLink: z.string().regex(/^(ftp|http|https):\/\/[^ "]+$/, {
    message: "Please enter a valid link.",
  }),
  coverImage: z
    .string()
    .regex(/^(ftp|http|https):\/\/[^ "]+$/, {
      message: "Error uploading image.",
    })
    .optional(),
});

export type AnimeSchemaType = z.infer<typeof animeSchema>;

export const idAnimeSchema = z.object({
  id: z.string(),
});

export type IdAnimeSchemaType = z.infer<typeof idAnimeSchema>;

export const rateAnimeSchema = idAnimeSchema.extend({
  rating: z.number().min(1).max(10),
});

export type RateAnimeSchemaType = z.infer<typeof rateAnimeSchema>;
