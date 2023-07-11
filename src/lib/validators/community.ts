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
  title: z.string().min(3).max(80),
  text: z.string().min(3).max(600),
});

export type CreatePostValidatorType = z.infer<typeof createPostValidator>;

export const creatPostServerValidator = createPostValidator.extend({
  communityId: z.string(),
});

export const CreateCommentValidator = z.object({
  text: z.string().min(3).max(150),
});

export type CommentValidatorType = z.infer<typeof CreateCommentValidator>;

export const CreateServerCommentValidator = CreateCommentValidator.extend({
  postId: z.string(),
});

export type ServerCommentValidatorType = z.infer<
  typeof CreateServerCommentValidator
>;
