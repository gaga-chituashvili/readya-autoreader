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
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  return data;
};

export const registerRequest = (payload: RegisterPayload) => {
  return request<RegisterPayload, RegisterResponse>(
    "/register/",
    payload,
  );
};

export const loginRequest = (payload: LoginPayload) => {
  return request<LoginPayload, LoginResponse>(
    "/login/",
    payload,
  );
};

export const getProfile = async (): Promise<ProfileResponse> => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No access token found");
  }

  const res = await fetch(`${url}/profile/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: ProfileResponse = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return data;
};

export const logoutRequest = async () => {
  try {
    const refresh = localStorage.getItem("refresh_token");

    if (refresh) {
      await fetch(`${url}/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh }),
      });
    }
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
};
