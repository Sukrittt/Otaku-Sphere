import { z } from "zod";

export const CreatePollValidator = z.object({
  question: z.string().min(3).max(150),
});

export const CreatePollValidatorServer = CreatePollValidator.extend({
  expiresAt: z.date().min(new Date()).optional(),
  options: z.array(z.string().min(1).max(200)),
});

export type CreatePollValidatorType = z.infer<typeof CreatePollValidator>;
export type CreatePollValidatorServerType = z.infer<
  typeof CreatePollValidatorServer
>;
