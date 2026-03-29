import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordSchema } from "@/component/schemas/forgetPassword.schema";
import type { ForgetPasswordType } from "@/component/schemas/forgetPassword.schema";
import { Input } from "../ui/Input";
import { useTranslation } from "react-i18next";

export const ForgetPassForm = () => {
  const { t } = useTranslation("forgetpass");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordType>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = (data: ForgetPasswordType) => {
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

      <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold">
        {t("send")}
      </button>
    </form>
  );
};
