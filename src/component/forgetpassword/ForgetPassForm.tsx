import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordSchema } from "@/component/schemas/forgetPassword.schema";
import type { ForgetPasswordType } from "@/component/schemas/forgetPassword.schema";
import { Input } from "@/component/ui/Input";
import { useTranslation } from "react-i18next";

type Props = {
  onSubmit: (data: ForgetPasswordType) => Promise<void>;
  loading?: boolean;
};

export const ForgetPassForm = ({ onSubmit, loading }: Props) => {
  const { t } = useTranslation("forgetpass");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordType>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        id="email"
        label={t("email")}
        placeholder="example@gmail.com"
        {...register("email")}
        error={errors.email?.message && t(errors.email.message)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold"
      >
        {loading ? "Sending..." : t("send")}
      </button>
    </form>
  );
};
