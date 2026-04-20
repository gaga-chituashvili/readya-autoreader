import { type LucideIcon } from "lucide-react";

// Settings types

export interface VoiceSettings {
  speed: number;
}

export type SettingKey = keyof VoiceSettings;

export interface SliderConfig {
  key: Exclude<SettingKey, "saveSettings">;
  label: string;
  min: number;
  max: number;
  step: number;
}

// features types
export type Feature = {
  icon: LucideIcon;
  title?: string;
  description: string;
};

// testimonials types
export type Testimonial = {
  name: string;
  text: string;
  image: string;
};

// FAQ types
export type FAQKey =
  | "what_is_readya"
  | "why_use_readya"
  | "how_to_work"
  | "what_file_types"
  | "what_languages"
  | "can_use_for_study"
  | "why_readya";

export interface FeatureCardProps {
  item: {
    points: string[];
  };
}
