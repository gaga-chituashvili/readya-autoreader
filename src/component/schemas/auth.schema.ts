import { z } from "zod";

export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "errors.email_required")
      .email("errors.email_invalid"),

    fullName: z.string().min(1, "errors.full_name_required"),

    password: z
      .string()
      .min(6, "errors.password_min")
      .min(1, "errors.password_required"),

    confirmPassword: z.string().min(1, "errors.confirm_password_required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "errors.passwords_not_match",
  });

export type SignUpType = z.infer<typeof signupSchema>;
