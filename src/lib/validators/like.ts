import { z } from "zod";

export const LikeValidator = z.object({
  postId: z.string(),
});

export type LikeValidatorType = z.infer<typeof LikeValidator>;
