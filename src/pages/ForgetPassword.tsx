import { AuthCard } from "@/component/forgetpassword/AuthCard";
import { useTranslation } from "react-i18next";
import { ForgetPassForm } from "@/component/forgetpassword/ForgetPassForm";
import { Link, useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/routes/paths";
import { resetPasswordRequest } from "@/services/authService";
import { useState } from "react";

export const ForgetPassword = () => {
  const { t } = useTranslation("forgetpass");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: { email: string }) => {
    try {
      setLoading(true);
      setError("");

      await resetPasswordRequest(data);

      navigate({ to: ROUTES.emailSent });
    } catch (err: unknown) {
      setError((err as { detail?: string })?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center md:justify-start bg-gray-50 dark:bg-black px-4 md:px-10 py-10 overflow-hidden">
      <div className="w-full max-w-md md:ml-10 z-10">
        <AuthCard>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            {t("forget_password")}
          </h2>

          <ForgetPassForm onSubmit={handleSubmit} loading={loading} />

          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}

          <div className="my-6 h-px bg-gradient-to-r from-transparent via-black/30 to-transparent dark:via-white/30" />

          <div className="text-center">
            <Link
              to={ROUTES.signIn}
              className="text-base text-indigo-500 hover:text-indigo-600 hover:underline font-medium"
            >
              {t("back")}
            </Link>
          </div>
        </AuthCard>
      </div>

      <div className="pointer-events-none absolute -right-[-30rem] w-96 h-96 rounded-full bg-gradient-to-br from-purple-300 to-indigo-300 opacity-70" />
    </section>
  );
};
