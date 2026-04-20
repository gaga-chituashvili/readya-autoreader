"use client";

import { teamMembers } from "@/data/teamData";
import { TeamCard } from "@/component/TeamCard";
import readya from "@/assets/readya.jpeg";
import { useTranslation } from "react-i18next";

export const OurTeam = () => {
  const { t } = useTranslation("ourTeam");
  return (
    <section className="relative py-20 px-6 bg-gray-100 dark:bg-black overflow-hidden">
      <div className="pointer-events-none absolute top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-purple-300 to-indigo-300 opacity-70 dark:opacity-40 " />

      <section className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-16">
          {t("title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center mb-24">
          <div className="rounded-2xl overflow-hidden bg-white">
            <img
              src={readya}
              alt="Team"
              className="w-full  h-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t("aboutTitle")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t("aboutText")}
            </p>
          </div>
        </div>

        <h2 className="text-center text-3xl md:text-4xl font-bold mb-16 text-gray-900 dark:text-white">
          {t("membersTitle")}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>
      </section>

      <div className="pointer-events-none absolute bottom-0 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-purple-300 to-indigo-300 opacity-70 dark:opacity-40 " />
    </section>
  );
};
