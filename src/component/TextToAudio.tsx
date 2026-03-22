import { Settings } from "lucide-react";
import { ModeSwitcher } from "./common/ModeSwitcher";
import { useTranslation } from "react-i18next";
import { useAppStore } from "../store/useAppStore";

export const TextToAudio = () => {
  const { t } = useTranslation("home");
  const { text, setText, activeTab, setTab } = useAppStore();

  return (
    <section className="relative w-full py-24 flex justify-center bg-gray-100 dark:bg-black overflow-hidden">
      <svg
        className="absolute top-0 left-0 w-full h-[200px]"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,80 C400,20 1040,20 1440,80 L1440,0 L0,0 Z"
          fill="url(#topGradient)"
          fillOpacity="0.4"
        />
        <defs>
          <linearGradient id="topGradient" x1="0" x2="1">
            <stop offset="0%" stopColor="#f3e8ff" />
            <stop offset="100%" stopColor="#e0e7ff" />
          </linearGradient>
        </defs>
      </svg>

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
          <linearGradient id="bottomGradient" x1="0" x2="1">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#818cf8" />
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
          <select className="px-4 py-2 rounded-full border border-purple-400 bg-transparent text-sm">
            <option>{t("language_georgian")}</option>
            <option>{t("language_english")}</option>
          </select>

          <Settings className="text-gray-500 cursor-pointer" size={18} />
        </div>

        <div className="flex justify-center mt-6">
          <button className="px-8 py-3 rounded-full bg-purple-500 text-white font-medium hover:bg-purple-600 transition">
            {t("generate")}
          </button>
        </div>
      </div>
    </section>
  );
};
