import { AuthCard } from "@/component/signin/AuthCard";
import { SocialAuth } from "@/component/signin/SocialAuth";
import logo from "@/assets/readya-logo.png";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SignInForm } from "@/component/signin/SignInForm";
import { Link } from "@tanstack/react-router";
import { ROUTES } from "@/routes/paths";

export const SignIn = () => {
  const { t } = useTranslation("sign");
  return (
    <section
      className="relative min-h-screen flex items-center 
      justify-center md:justify-start
      bg-gray-50 dark:bg-black px-4 md:px-10 py-10 overflow-hidden"
    >
      <div className="w-full max-w-md md:ml-10 z-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-center text-gray-900 dark:text-white">
          {t("log_in")}
        </h2>

        <AuthCard>
          <img
            src={logo}
            alt="Readya Logo"
            className="mx-auto mb-6 w-24 md:w-28"
          />

          <SignInForm />

          <div className="my-6 h-px bg-gradient-to-r from-transparent via-black/30 to-transparent dark:via-white/30" />

          <SocialAuth />

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            {t("no_account")}{" "}
            <Link
              to={ROUTES.signUp}
              className="text-indigo-500 hover:underline font-medium"
            >
              {t("create")}
            </Link>
          </p>

          <div className="my-6 h-px bg-gradient-to-r from-transparent via-black/30 to-transparent dark:via-white/30" />

          <div className="flex justify-center gap-5 text-gray-500">
            <Youtube className="w-5 h-5 hover:text-red-500 transition cursor-pointer" />
            <Facebook className="w-5 h-5 hover:text-blue-500 transition cursor-pointer" />
            <Instagram className="w-5 h-5 hover:text-pink-500 transition cursor-pointer" />
          </div>
        </AuthCard>
      </div>

      <div className="pointer-events-none absolute  -right-[-30rem] w-96 h-96 rounded-full bg-gradient-to-br from-purple-300 to-indigo-300 opacity-70" />
    </section>
  );
};
