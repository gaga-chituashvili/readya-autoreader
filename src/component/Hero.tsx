import { useTranslation } from "react-i18next";
import { Button } from "@/component/ui/Button";
import founder from "@/assets/founder1.png";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/routes/paths";

export const Hero = () => {
  const { t } = useTranslation("home");
  const navigate = useNavigate();

  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight * 1.4,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-20 md:py-28 px-4 sm:px-6 bg-gray-100 dark:bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight lg:whitespace-nowrap break-words">
            {t("hero_title")}
          </h2>

          <p className="mt-6 max-w-md text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-7 break-words">
            {t("hero_description")}
          </p>

          <div className="mt-10 md:hidden flex justify-center">
            <div className="relative flex items-center justify-center">
              <img
                src={founder}
                alt="Founder"
                className="w-40 h-40 object-cover rounded-full"
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              variant="default"
              onClick={() => navigate({ to: ROUTES.aboutUs })}
            >
              {t("learn_more")}
            </Button>

            <Button variant="secondary" onClick={scrollDown}>
              {t("try_readya")}
            </Button>
          </div>
        </div>

        <div className="hidden md:flex flex-1 justify-end">
          <div className="relative flex items-center justify-center">
            <img
              src={founder}
              alt="Founder"
              className="w-40 h-40 object-cover rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
