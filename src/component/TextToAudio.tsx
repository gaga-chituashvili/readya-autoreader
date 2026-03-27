import { ModeSwitcher } from "@/component/common/ModeSwitcher";
import { useTranslation } from "react-i18next";
import { useAppStore } from "@/store/useAppStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/component/ui/select";
import { SettingsModal } from "@/component/SettingsModal";
import {} from "@/component/SettingsModal";
import { Button } from "@/component/ui/Button";

export const TextToAudio = () => {
  const { t, i18n } = useTranslation("home");

  const { text, setText, activeTab, setTab } = useAppStore();

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <section className="relative w-full py-24 flex justify-center bg-gray-100 dark:bg-black overflow-hidden">
      <svg
        className="absolute top-0 left-0 w-full h-[250px]"
        viewBox="0 0 1440 250"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 H1440 V120 C1100,250 340,250 0,120 Z"
          fill="url(#bottomGradient)"
        />
        <defs>
          <linearGradient id="bottomGradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#d8b4fe" />
            <stop offset="50%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#a5b4fc" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <ModeSwitcher activeTab={activeTab} setActiveTab={setTab} />
      </div>

      <div className="relative z-10 w-full max-w-xl bg-gray-200 dark:bg-gray-900 rounded-3xl p-8 pt-16 shadow-sm">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={2000}
            placeholder={t("textarea_placeholder")}
            className="w-full h-52 resize-none rounded-2xl border border-purple-400 bg-transparent p-4 outline-none focus:ring-2 focus:ring-purple-400 text-sm"
          />

          <div className="absolute top-2 right-3 text-xs text-gray-500">
            {t("characters", { count: text.length })}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <Select onValueChange={handleChange}>
            <SelectTrigger className="w-[180px] rounded-full border-purple-400">
              <SelectValue placeholder={t("language_georgian")} />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ka">{t("language_georgian")}</SelectItem>
              <SelectItem value="en">{t("language_english")}</SelectItem>
            </SelectContent>
          </Select>

          <SettingsModal />
        </div>

        <div className="flex justify-center mt-6">
          <Button variant="default">{t("generate")}</Button>
        </div>
      </div>
    </section>
  );
};
