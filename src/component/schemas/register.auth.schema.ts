import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().min(1, "email_required").email("email_invalid"),

    full_name: z.string().min(1, "full_name_required"),

    password: z.string().min(6, "password_min").min(1, "password_required"),

    confirm_password: z.string().min(1, "confirm_password_required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "passwords_not_match",
  });

export type SignUpType = z.infer<typeof signupSchema>;
