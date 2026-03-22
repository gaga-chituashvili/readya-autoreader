import readyalogo from "../../assets/readyalogo.png";
import { Link } from "react-router";
import { LanguageSwitcher } from "../common/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t } = useTranslation("header");
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <header>
      <img src={readyalogo} alt="Readya Logo" onClick={reloadPage} />

      <nav>
        <ul>
          <Link to="/">{t("about_our_company")}</Link>
          <Link to="/">{t("text_to_speech")}</Link>
          <Link to="/">{t("pay")}</Link>
        </ul>
      </nav>

      <LanguageSwitcher />
    </header>
  );
};
