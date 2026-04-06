import { z } from "zod";

export const forgetPasswordSchema = z.object({
  email: z.string().trim().min(1, "email_required").email("email_invalid"),
});

export type ForgetPasswordType = z.infer<typeof forgetPasswordSchema>;
