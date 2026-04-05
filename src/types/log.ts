import type { UseFormRegisterReturn } from "react-hook-form";

export type PasswordFieldProps = {
  register: UseFormRegisterReturn;
  error?: string;
  placeholder?: string;
  label?: string;
  id?: string;
};


export type RegisterPayload = {
  email: string;
  full_name: string;
  password: string;
  confirm_password: string;
};

export type RegisterResponse = {
  message: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access: string;
  refresh: string;
};


export type ProfileResponse = {
  id: number;
  email: string;
  full_name: string;
};