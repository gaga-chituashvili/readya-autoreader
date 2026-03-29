import { useTranslation } from "react-i18next";
import { Button } from "@/component/ui/Button";

export const HeroButtons = () => {
  const { t } = useTranslation("home");

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
      <Button className="w-full sm:w-auto" variant="secondary">
        {t("auth.register")}
      </Button>

      <Button className="w-full sm:w-auto" variant="secondary">
        {t("auth.login")}
      </Button>
    </div>
  );
};
