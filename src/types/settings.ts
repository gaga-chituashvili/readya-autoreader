export interface VoiceSettings {
  speed: number;
  tone: number;
  reading: number;
  saveSettings: boolean;
}

export type SettingKey = keyof VoiceSettings;

export interface SliderConfig {
  key: Exclude<SettingKey, "saveSettings">;
  label: string;
  min: number;
  max: number;
  step: number;
}
