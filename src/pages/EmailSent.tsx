import { Check, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/routes/paths";

type Props = {
  title?: string;
  description?: string;
  showBack?: boolean;
};

export const EmailSent = ({ title, description, showBack = true }: Props) => {
  const { t } = useTranslation("forgetpass");

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4">
      <div className="text-center w-full max-w-sm mx-auto space-y-6">
        <div className="relative mx-auto w-24 h-24">
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <Mail className="w-10 h-10 text-white" strokeWidth={2} />
          </div>

          <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
            <Check className="w-5 h-5 text-white" />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
          {title || t("email_sent_title")}
        </h2>

        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-xs mx-auto">
          {description || t("email_sent_desc")}
        </p>

        {showBack && (
          <Link
            to={ROUTES.signIn}
            className="inline-block text-indigo-500 hover:text-indigo-600 hover:underline font-medium transition"
          >
            {t("back")}
          </Link>
        )}
      </div>
    </section>
  );
};
