import { create } from "zustand";

type TabType = "text" | "file";

type AppStore = {
  text: string;
  activeTab: TabType;
  setText: (text: string) => void;
  setTab: (tab: TabType) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  text: "",
  activeTab: "text",

  setText: (text) => set({ text }),
  setTab: (tab) => set({ activeTab: tab }),
}));
