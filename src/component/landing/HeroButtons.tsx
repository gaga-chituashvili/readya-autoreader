import { useTranslation } from "react-i18next";
import { Button } from "@/component/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/routes/paths";
import { useAuthStore } from "@/store/authStore";

export const HeroButtons = () => {
  const { t } = useTranslation("home");
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
      {!user ? (
        <>
          <Button
            variant="secondary"
            onClick={() => navigate({ to: ROUTES.signUp })}
          >
            {t("auth.register")}
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate({ to: ROUTES.signIn })}
          >
            {t("auth.login")}
          </Button>
        </>
      ) : null}
    </div>
  );
};
