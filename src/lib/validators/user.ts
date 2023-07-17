import { z } from "zod";

export const AddAdminUserPayload = z.object({
  email: z.string().email(),
});

export type AddAdminUserPayloadType = z.infer<typeof AddAdminUserPayload>;
