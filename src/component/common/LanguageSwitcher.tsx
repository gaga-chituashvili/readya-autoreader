import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-200 transition"
      >
        <Globe size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-800 shadow-lg rounded-lg border">
          <button
            onClick={() => changeLang("en")}
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
              i18n.language === "en" ? "font-semibold" : ""
            }`}
          >
            English
          </button>

          <button
            onClick={() => changeLang("ka")}
            className={`w-full text-left px-4 py-2 hover:bg-gray-100  ${
              i18n.language === "ka" ? "font-semibold" : ""
            }`}
          >
            ქართული
          </button>
        </div>
      )}
    </div>
  );
};
