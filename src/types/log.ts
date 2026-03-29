import type { UseFormRegisterReturn } from "react-hook-form";

export type PasswordFieldProps = {
  register: UseFormRegisterReturn;
  error?: string;
  placeholder?: string;
  label?: string;
  id?: string;
};
