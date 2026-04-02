import { create } from "zustand";

export type TabType = "text" | "file";

type AppStore = {
  email: string;
  text: string;
  activeTab: TabType;
  selectedFile: File | null;

  setEmail: (email: string) => void;
  setText: (text: string) => void;
  setTab: (tab: TabType) => void;
  setSelectedFile: (file: File | null) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  email: "",
  text: "",
  activeTab: "text",
  selectedFile: null,

  setEmail: (email) => set({ email }),
  setText: (text) => set({ text }),
  setTab: (tab) => set({ activeTab: tab }),
  setSelectedFile: (file) => set({ selectedFile: file }),
}));
