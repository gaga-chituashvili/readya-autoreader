import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/component/schemas/register.auth.schema";
import type { SignUpType } from "@/component/schemas/register.auth.schema";
import { Input } from "@/component/ui/Input";
import { PasswordField } from "@/component/signup/PasswordField";
import { Link } from "@tanstack/react-router";
import { ROUTES } from "@/routes/paths";
import { useTranslation } from "react-i18next";
import { registerRequest } from "@/services/authService";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "@tanstack/react-router";

export const SignUpForm = () => {
  const { t } = useTranslation("sign");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignUpType) => {
    setLoading(true);
    try {
      const response = await registerRequest(data);
      console.log(response);
      navigate({ to: ROUTES.singnIn });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email */}
      <Input
        id="email"
        label={t("email")}
        placeholder="example@gmail.com"
        {...register("email")}
        error={errors.email?.message && t(errors.email.message)}
      />

      {/* Full Name */}
      <Input
        id="full_name"
        label={t("full_name")}
        placeholder="John Doe"
        {...register("full_name")}
        error={errors.full_name?.message && t(errors.full_name.message)}
      />

      {/* Passwords */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PasswordField
          id="password"
          label={t("password")}
          placeholder="••••••"
          register={register("password")}
          error={errors.password?.message && t(errors.password.message)}
        />

        <PasswordField
          id="confirm_password"
          label={t("confirm_password")}
          placeholder="••••••"
          register={register("confirm_password")}
          error={
            errors.confirm_password?.message &&
            t(errors.confirm_password.message)
          }
        />
      </div>

      <span className="text-xs text-center text-gray-500 dark:text-gray-400">
        {t("terms_text")}{" "}
        <Link
          to={ROUTES.termsAndPolicy}
          className="text-indigo-500 hover:text-indigo-600 hover:underline font-medium"
        >
          {t("terms_link")}
        </Link>{" "}
      </span>

      <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold">
        {loading ? <ClipLoader size={20} /> : t("sign_up")}
      </button>
    </form>
  );
};
