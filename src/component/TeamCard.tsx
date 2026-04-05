import type { TeamCardProps } from "@/types/ourTeam.type";
import { useTranslation } from "react-i18next";

export const TeamCard = ({ name, role, image }: TeamCardProps) => {
  const { t } = useTranslation("ourTeam");

  return (
    <section className="flex flex-col items-center text-center">
      <div className="w-[13.75rem] h-[16.25rem] rounded-2xl overflow-hidden bg-gray-200 dark:bg-zinc-900 shadow-sm hover:shadow-md transition">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
        {t(`members.${name}`)}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
    </section>
  );
};
