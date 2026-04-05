import { SignUpForm } from "@/component/signup/SignUpForm";
import { AuthCard } from "@/component/signup/AuthCard";
import { SocialAuth } from "@/component/signup/SocialAuth";
import logo from "@/assets/readya-logo.png";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SignUp = () => {
    const { t } = useTranslation("sign");
  return (
    <section
      className="relative min-h-screen flex items-center 
      justify-center md:justify-start
      bg-gray-50 dark:bg-black px-4 md:px-10 py-10 overflow-hidden"
    >
      <div className="w-full max-w-md md:ml-10 z-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-center text-gray-900 dark:text-white">
          {t("create_account")}
        </h2>

        <AuthCard>
          <img
            src={logo}
            alt="Readya Logo"
            className="mx-auto mb-6 w-24 md:w-28"
          />

          <SignUpForm />

          <div className="my-6 h-px bg-gradient-to-r from-transparent via-black/30 to-transparent dark:via-white/30" />

          <SocialAuth />

          <div className="my-6 h-px bg-gradient-to-r from-transparent via-black/30 to-transparent dark:via-white/30" />

          <div className="flex justify-center gap-5 text-gray-500">
            <Youtube className="w-5 h-5 hover:text-red-500 transition cursor-pointer" />
            <Facebook className="w-5 h-5 hover:text-blue-500 transition cursor-pointer" />
            <Instagram className="w-5 h-5 hover:text-pink-500 transition cursor-pointer" />
          </div>
        </AuthCard>
      </div>

      <div className="pointer-events-none absolute -bottom-[10rem] -right-[-5rem] w-96 h-96 rounded-full bg-gradient-to-br from-purple-300 to-indigo-300 opacity-70" />
    </section>
  );
};
