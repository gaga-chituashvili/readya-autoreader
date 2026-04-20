import type { SliderConfig, VoiceSettings } from "@/types/home.type";

export const DEFAULT_SETTINGS: VoiceSettings = {
  speed: 50,
};

export const SLIDER_CONFIGS: SliderConfig[] = [
  {
    key: "speed",
    label: "კითხვის სიჩქარის რეგულირება",
    min: 0,
    max: 100,
    step: 1,
  },
];

export const STORAGE_KEY = "voice-settings";
