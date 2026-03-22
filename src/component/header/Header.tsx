import readyalogo from "../../assets/readyalogo.png";
import { Link } from "react-router";
import { LanguageSwitcher } from "../common/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "../common/ToggleButton";

export const Header = () => {
  const { t } = useTranslation("header");

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 dark:bg-black  shadow-sm">
      <img
        className="h-10 cursor-pointer"
        src={readyalogo}
        alt="Readya Logo"
        onClick={reloadPage}
      />

      <nav>
        <ul className="flex space-x-4">
          <Link to="/">{t("about_our_company")}</Link>
          <Link to="/">{t("text_to_speech")}</Link>
          <Link to="/">{t("pay")}</Link>
        </ul>
      </nav>
      <article className="flex space-x-10">
        <div className="flex items-center space-x-4">
          <button className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition">
            {t("enter")}
          </button>
          <ThemeToggle />
        </div>
        <LanguageSwitcher />
      </article>
    </header>
  );
};
