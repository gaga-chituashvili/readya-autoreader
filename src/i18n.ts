import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// --- English language files import ---
import enHeader from "@/locales/en/header.json";
import enHero from "@/locales/en/home.json";
import enfooter from "@/locales/en/footer.json";
import enAbout from "@/locales/en/about.json";
import enServices from "@/locales/en/servicec.json";
import enSupports from "@/locales/en/supports.json";
import enOurTeam from "@/locales/en/ourTeam.json";
import enTerms from "@/locales/en/terms.json";
import enPrivacy from "@/locales/en/privacy.json";
import enRefund from "@/locales/en/refund.json";
import ensign from "@/locales/en/sign.json";
import enforgetpass from "@/locales/en/forgetpass.json";

// --- Georgian language files import ---
import kaHeader from "@/locales/ka/header.json";
import kaHero from "@/locales/ka/home.json";
import kafooter from "@/locales/ka/footer.json";
import kaAbout from "@/locales/ka/about.json";
import kaServices from "@/locales/ka/services.json";
import kaSupports from "@/locales/ka/supports.json";
import kaOurTeam from "@/locales/ka/ourTeam.json";
import kaTerms from "@/locales/ka/terms.json";
import kaprivacy from "@/locales/ka/privacy.json";
import kaRefund from "@/locales/ka/refund.json";
import kasign from "@/locales/ka/sign.json";
import kaforgetpass from "@/locales/ka/fotgetpass.json";

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
        services: enServices,
        supports: enSupports,
        ourTeam: enOurTeam,
        terms: enTerms,
        privacy: enPrivacy,
        refund: enRefund,
        sign: ensign,
        forgetpass: enforgetpass,
      },
      ka: {
        header: kaHeader,
        home: kaHero,
        footer: kafooter,
        about: kaAbout,
        services: kaServices,
        supports: kaSupports,
        ourTeam: kaOurTeam,
        terms: kaTerms,
        privacy: kaprivacy,
        refund: kaRefund,
        sign: kasign,
        forgetpass: kaforgetpass,
      },
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
  });

export default i18n;
