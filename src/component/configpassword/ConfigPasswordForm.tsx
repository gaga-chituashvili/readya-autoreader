import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { configPasswordSchema } from "@/component/schemas/configPassword.schema";
import { Input } from "@/component/ui/Input";
import { useTranslation } from "react-i18next";
import type { ConfigPasswordType } from "../schemas/configPassword.schema";

type Props = {
  onSubmit: (data: ConfigPasswordType) => Promise<void>;
  loading?: boolean;
};

export const ConfigPasswordForm = ({ onSubmit, loading }: Props) => {
  const { t } = useTranslation("configpassword");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfigPasswordType>({
    resolver: zodResolver(configPasswordSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        id="new_password"
        label={t("new_password")}
        type="password"
        placeholder="********"
        {...register("new_password")}
        error={errors.new_password?.message && t(errors.new_password.message)}
      />
      <Input
        id="confirm_password"
        label={t("confirm_password")}
        type="password"
        placeholder="********"
        {...register("confirm_password")}
        error={
          errors.confirm_password?.message && t(errors.confirm_password.message)
        }
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold"
      >
        {loading ? "Sending..." : t("update")}
      </button>
    </form>
  );
};
