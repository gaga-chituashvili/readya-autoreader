import { useState, useCallback, useEffect } from "react";
import type { VoiceSettings, SettingKey } from "@/types/home.type";
import { DEFAULT_SETTINGS, STORAGE_KEY } from "@/constants/settingsConfig";

export const useSettings = () => {
  const [settings, setSettings] = useState<VoiceSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const updateSetting = useCallback(
    <K extends SettingKey>(key: K, value: VoiceSettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to reset settings:", error);
    }
  }, []);

  useEffect(() => {
    if (settings.saveSettings) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      } catch (error) {
        console.error("Failed to save settings:", error);
      }
    }
  }, [settings]);

  return {
    settings,
    updateSetting,
    resetSettings,
  };
};
