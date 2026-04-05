import { AuthCard } from "@/component/forgetpassword/AuthCard";
import { useTranslation } from "react-i18next";
import { ForgetPassForm } from "@/component/forgetpassword/ForgetPassForm";
import { Link } from "@tanstack/react-router";
import { ROUTES } from "@/routes/paths";

export const ForgetPassword = () => {
  const { t } = useTranslation("forgetpass");
  return (
    <section
      className="relative min-h-screen flex items-center 
      justify-center md:justify-start
      bg-gray-50 dark:bg-black px-4 md:px-10 py-10 overflow-hidden"
    >
      <div className="w-full max-w-md md:ml-10 z-10">
        <AuthCard>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-center text-gray-900 dark:text-white">
            {t("forget_password")}
          </h2>
          <ForgetPassForm />

          <div className="my-6 h-px bg-gradient-to-r from-transparent via-black/30 to-transparent dark:via-white/30" />

          <div className="text-center">
            <Link
              to={ROUTES.singnIn}
              className="text-base text-indigo-500 hover:text-indigo-600 hover:underline font-medium"
            >
              {t("back")}
            </Link>
          </div>
        </AuthCard>
      </div>

      <div className="pointer-events-none absolute  -right-[-30rem] w-96 h-96 rounded-full bg-gradient-to-br from-purple-300 to-indigo-300 opacity-70" />
    </section>
  );
};
