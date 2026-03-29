import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/component/schemas/login.auth.schema";
import type { LoginType } from "@/component/schemas/login.auth.schema";
import { Input } from "@/component/ui/Input";
import { PasswordField } from "@/component/signin/PasswordField";
import { Link } from "@tanstack/react-router";
import { ROUTES } from "@/routes/paths";
import { useTranslation } from "react-i18next";

export const SignInForm = () => {
  const { t } = useTranslation("sign");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginType) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        id="email"
        label={t("email")}
        placeholder="example@gmail.com"
        {...register("email")}
        error={errors.email?.message && t(errors.email.message)}
      />

      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("password")}
        </label>

        <Link
          to={ROUTES.forgetPassword}
          className="text-sm text-indigo-500 hover:underline"
        >
          {t("forgot_password")}
        </Link>
      </div>

      <PasswordField
        id="password"
        placeholder="••••••"
        register={register("password")}
        error={errors.password?.message && t(errors.password.message)}
      />

      <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold">
        {t("sign_in")}
      </button>
    </form>
  );
};
