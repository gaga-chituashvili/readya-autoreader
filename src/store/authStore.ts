import { create } from "zustand";
import { getProfile } from "@/services/authService";

type User = {
  email: string;
  full_name: string;
};

type AuthStore = {
  user: User | null;
  isLoading: boolean;

  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user }),

  fetchUser: async () => {
    try {
      const data = await getProfile();
      set({ user: data, isLoading: false });
    } catch {
      set({ user: null, isLoading: false });
    }
  },

  logout: () => {
    set({ user: null });
  },
}));
