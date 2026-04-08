import { z } from "zod";

export const configPasswordSchema = z.object({
  new_password: z.string().trim().min(1, "password_min_length"),
  confirm_password: z.string().trim().min(1, "password_min_length"),
});

export type ConfigPasswordType = z.infer<typeof configPasswordSchema>;
