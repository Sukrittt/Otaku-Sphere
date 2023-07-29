import { z } from "zod";

export const CreatePollValidator = z.object({
  question: z.string().min(3).max(150),
});

export const CreatePollValidatorServer = CreatePollValidator.extend({
  expiresAt: z.date().min(new Date()).optional(),
  options: z.array(z.string().min(1).max(80)),
});

export type CreatePollValidatorType = z.infer<typeof CreatePollValidator>;
export type CreatePollValidatorServerType = z.infer<
  typeof CreatePollValidatorServer
>;

export const VotePollValidator = z.object({
  optionId: z.string(),
});

export type VotePollValidatorType = z.infer<typeof VotePollValidator>;

export const DeletePollValidator = z.object({
  pollId: z.string(),
});

export type DeletePollValidatorType = z.infer<typeof DeletePollValidator>;
