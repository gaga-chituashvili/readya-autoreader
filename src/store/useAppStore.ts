import { create } from "zustand";

export type TabType = "text" | "file";

type AppStore = {
  text: string;
  activeTab: TabType;
  selectedFile: File | null;

  setText: (text: string) => void;
  setTab: (tab: TabType) => void;
  setSelectedFile: (file: File | null) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  text: "",
  activeTab: "text",
  selectedFile: null,

  setText: (text) => set({ text }),
  setTab: (tab) => set({ activeTab: tab }),
  setSelectedFile: (file) => set({ selectedFile: file }),
}));
