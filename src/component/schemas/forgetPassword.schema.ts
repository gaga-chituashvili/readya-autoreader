import { z } from "zod";

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "errors.email_required")
    .email("errors.email_invalid"),
});

export type ForgetPasswordType = z.infer<typeof forgetPasswordSchema>;
