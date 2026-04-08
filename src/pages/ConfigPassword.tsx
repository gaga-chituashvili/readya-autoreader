import { AuthCard } from "@/component/forgetpassword/AuthCard";
import { useTranslation } from "react-i18next";
import { ConfigPasswordForm } from "@/component/configpassword/ConfigPasswordForm";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ROUTES } from "@/routes/paths";
import { passwordResetConfirmRequest } from "@/services/authService";
import { useState } from "react";

export const ConfigPassword = () => {
  const { t } = useTranslation("configpassword");
  const navigate = useNavigate();

  const { uid, token } = useParams({ strict: false });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: {
    new_password: string;
    confirm_password: string;
  }) => {
    try {
      setLoading(true);
      setError("");

      await passwordResetConfirmRequest({
        uid,
        token,
        password: data.new_password,
        confirm_password: data.confirm_password,
      });

      navigate({ to: ROUTES.signIn });
    } catch (err: any) {
      setError(
        err?.detail ||
          err?.error ||
          err?.confirm_password?.[0] ||
          err?.password?.[0] ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!uid || !token) {
    return <div>Invalid reset link</div>;
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4 py-10">
      <div className="w-full max-w-md">
        <AuthCard>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            {t("reset_password")}
          </h2>

          <ConfigPasswordForm onSubmit={handleSubmit} loading={loading} />

          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
        </AuthCard>
      </div>
    </section>
  );
};
