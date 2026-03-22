import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// --- English language files import ---
import enHeader from "./locales/en/header.json";

// --- Georgian language files import ---
import kaHeader from "./locales/ka/header.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ka"],
    load: "languageOnly",
    fallbackLng: "en",
    defaultNS: "header",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        header: enHeader,
      },
      ka: {
        header: kaHeader,
      },
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
  });

export default i18n;
