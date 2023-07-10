import { z } from "zod";

export const createCommunityValidator = z.object({
  name: z.string().min(3).max(20),
  description: z.string().min(3).max(300),
  category: z.string().optional(),
});

export type CreateCommunityValidatorType = z.infer<
  typeof createCommunityValidator
>;

export const createPostValidator = z.object({
  text: z.string().min(3).max(600),
});

export type CreatePostValidatorType = z.infer<typeof createPostValidator>;

export const creatPostServerValidator = createPostValidator.extend({
  communityId: z.string(),
});
