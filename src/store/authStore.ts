import { create } from "zustand";
import { getProfile } from "@/services/authService";

type User = {
  email: string;
  full_name: string;
};

type AuthStore = {
  user: User | null;
  token: string | null;
  isLoading: boolean;

  setUser: (user: User) => void;
  login: (data: { access: string; user: User }) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: localStorage.getItem("access_token"),
  isLoading: true,

  setUser: (user) => set({ user }),

  login: (data) => {
    localStorage.setItem("access_token", data.access);

    set({
      user: data.user,
      token: data.access,
      isLoading: false,
    });
  },

  fetchUser: async () => {
    const token = get().token;

    if (!token) {
      set({ isLoading: false });
      return;
    }

    try {
      const data = await getProfile();
      set({ user: data, isLoading: false });
    } catch {
      localStorage.removeItem("access_token");
      set({ user: null, token: null, isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("access_token");
    set({ user: null, token: null });
  },
}));
