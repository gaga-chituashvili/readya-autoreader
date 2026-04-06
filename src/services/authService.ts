import type {
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
  ProfileResponse,
} from "../types/log";
import { url } from "@/api/config/url";

const request = async <T, R>(endpoint: string, payload: T): Promise<R> => {
  const res = await fetch(`${url}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};

export const registerRequest = (payload: RegisterPayload) => {
  return request<RegisterPayload, RegisterResponse>("/register/", payload);
};

export const loginRequest = (payload: LoginPayload) => {
  return request<LoginPayload, LoginResponse>("/login/", payload);
};

export const getProfile = async (): Promise<ProfileResponse> => {
  const res = await fetch(`${url}/profile/`, {
    method: "GET",
    credentials: "include",
  });

  const data: ProfileResponse = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};

export const logoutRequest = async () => {
  try {
    await fetch(`${url}/logout/`, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Logout error:", error);
  }
};
