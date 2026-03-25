import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// --- English language files import ---
import enHeader from "./locales/en/header.json";
import enHero from "./locales/en/home.json";
import enfooter from "./locales/en/footer.json";
import enAbout from "./locales/en/about.json";

// --- Georgian language files import ---
import kaHeader from "./locales/ka/header.json";
import kaHero from "./locales/ka/home.json";
import kafooter from "./locales/ka/footer.json";
import kaAbout from "./locales/ka/about.json";

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
        home: enHero,
        footer: enfooter,
        about: enAbout,
      },
      ka: {
        header: kaHeader,
        home: kaHero,
        footer: kafooter,
        about: kaAbout,
      },
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
  });

export default i18n;
