import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "errors.email_required")
    .email("errors.email_invalid"),

  password: z.string().min(1, "errors.password_required"),
});

export type LoginType = z.infer<typeof loginSchema>;
