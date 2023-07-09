import { z } from "zod";

export const createCommunityValidator = z.object({
  name: z.string().min(3).max(30),
  category: z.string().optional(),
});

export type CreateCommunityValidatorType = z.infer<
  typeof createCommunityValidator
>;
