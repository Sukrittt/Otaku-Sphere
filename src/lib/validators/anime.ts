import { z } from "zod";

export const animeSchema = z.object({
  id: z.string().optional(), //server validation
  name: z.string().min(3).max(150),
  description: z.string().min(3).max(1200),
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

export const AnimeWatchlistSchema = z.object({
  category: z.string().optional(),
  animeId: z.string().optional(),
});

export type AnimeWatchlistSchemaType = z.infer<typeof AnimeWatchlistSchema>;

export const ZodCategoryType = z.union([
  z.literal("pending"),
  z.literal("watching"),
  z.literal("finished"),
]);

export const AnimeWatchlistClient = z.object({
  animeId: z.string(),
  category: z.string(),
});

export type AnimeWatchlistClientType = z.infer<typeof AnimeWatchlistClient>;

export const AnimeWatchlistServer = z.object({
  animeId: z.string(),
  category: ZodCategoryType,
});

export type AnimeWatchlistServerType = z.infer<typeof AnimeWatchlistServer>;

export const AnimeWatchlistUpdate = z.object({
  animeId: z.string(),
  category: ZodCategoryType,
  dropTo: ZodCategoryType,
});

export type AnimeWatchlistUpdateType = z.infer<typeof AnimeWatchlistUpdate>;

export const AnimeWatchlistDelete = z.object({
  watchlistId: z.string(),
  category: ZodCategoryType,
});

export type AnimeWatchlistDeleteType = z.infer<typeof AnimeWatchlistDelete>;

export const AnimeReviewSchema = z.object({
  review: z.string().min(3).max(1500),
  title: z.string().min(3).max(50),
});

export type AnimeReviewSchemaType = z.infer<typeof AnimeReviewSchema>;

export const AnimeReviewServerSchema = AnimeReviewSchema.extend({
  animeId: z.string(),
});

export type AnimeReviewServerSchemaType = z.infer<
  typeof AnimeReviewServerSchema
>;

export const AnimeReviewDeleteSchema = z.object({
  reviewId: z.string(),
});

export type AnimeReviewDeleteSchemaType = z.infer<
  typeof AnimeReviewDeleteSchema
>;
