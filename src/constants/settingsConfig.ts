import type { SliderConfig, VoiceSettings } from "@/types/home.type";

export const DEFAULT_SETTINGS: VoiceSettings = {
  speed: 50,
  tone: 50,
  reading: 50,
  saveSettings: false,
};

export const SLIDER_CONFIGS: SliderConfig[] = [
  {
    key: "speed",
    label: "კითხვის სიჩქარის რეგულირება",
    min: 0,
    max: 100,
    step: 1,
  },
  {
    key: "tone",
    label: "ხმის ტონის არჩევა",
    min: 0,
    max: 100,
    step: 1,
  },
  {
    key: "reading",
    label: "ტექსტის ჰაილაითი მოსმენის დროს",
    min: 0,
    max: 100,
    step: 1,
  },
];

export const STORAGE_KEY = "voice-settings";
