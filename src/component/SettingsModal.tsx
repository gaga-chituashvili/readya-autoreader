import { Settings, X } from "lucide-react";
import { Modal } from "@/shared/ui/modal/Modal";
import { useModal } from "@/hook/useModal";
import { useSettings } from "@/hook/useSettings";
import { SettingsSlider } from "@/component/SettingsModal/SettingsSlider";
import { SettingsCheckbox } from "@/component/SettingsModal/SettingsCheckbox";
import { SLIDER_CONFIGS } from "@/constants/settingsConfig";

export const SettingsModal = () => {
  const { isOpen, open, close } = useModal();
  const { settings, updateSetting } = useSettings();

  return (
    <>
      <button
        onClick={open}
        aria-label="Open settings"
        className="
          p-3 rounded-full 
          hover:bg-gray-100 dark:hover:bg-zinc-800 
          transition-colors
          focus:outline-none focus:ring-2 focus:ring-violet-500
        "
      >
        <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>

      <Modal isOpen={isOpen} onClose={close}>
        <header className="flex items-center justify-between mb-8">
          <h2
            id="settings-modal-title"
            className="text-xl font-semibold text-gray-900 dark:text-white"
          >
            ხმის პარამეტრები
          </h2>
          <button
            onClick={close}
            aria-label="Close settings"
            className="
              p-1 
              hover:bg-gray-100 dark:hover:bg-zinc-800 
              rounded-full 
              transition-colors
              focus:outline-none focus:ring-2 focus:ring-violet-500
            "
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </header>

      
        <section aria-labelledby="settings-modal-title">
          {SLIDER_CONFIGS.map((config) => (
            <SettingsSlider
              key={config.key}
              label={config.label}
              value={settings[config.key]}
              min={config.min}
              max={config.max}
              step={config.step}
              onChange={(value) => updateSetting(config.key, value)}
            />
          ))}
        </section>

        <SettingsCheckbox
          label="შეინახე პარამეტრები"
          checked={settings.saveSettings}
          onChange={(checked) => updateSetting("saveSettings", checked)}
        />
      </Modal>
    </>
  );
};
