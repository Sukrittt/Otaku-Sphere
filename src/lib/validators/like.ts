import { z } from "zod";

export const LikeValidator = z.object({
  postId: z.string(),
});

export type LikeValidatorType = z.infer<typeof LikeValidator>;

export const ReviewLikeValidator = z.object({
  reviewId: z.string(),
});

export type ReviewLikeValidatorType = z.infer<typeof ReviewLikeValidator>;
