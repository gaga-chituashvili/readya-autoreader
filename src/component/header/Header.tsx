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
    <header className="flex justify-between items-center p-4">
      <img src={readyalogo} alt="Readya Logo" onClick={reloadPage} />

      <nav>
        <ul className="flex space-x-4">
          <Link to="/">{t("about_our_company")}</Link>
          <Link to="/">{t("text_to_speech")}</Link>
          <Link to="/">{t("pay")}</Link>
        </ul>
      </nav>
      <div>
        <button>{t("enter")}</button>
        <ThemeToggle />
      </div>
      <LanguageSwitcher />
    </header>
  );
};
