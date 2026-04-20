

import { useTranslation } from "react-i18next";
import { footerData } from "@/data/footerData";
import { Link } from "@tanstack/react-router";
import {
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Copyright,
} from "lucide-react";
import logo from "@/assets/readya-logo.png";

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
};

export const Footer = () => {
  const { t } = useTranslation("footer");

  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-zinc-800 mt-20">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
          <div className="space-y-3 flex flex-col items-center md:items-start">
            <img src={logo} alt="Readya Logo" className="w-32" />

            <p className="text-gray-500 text-sm">{footerData.contact.email}</p>

            <p className="text-gray-500 text-sm">
              {footerData.contact.website}
            </p>
          </div>

          {footerData.sections.map((section, i) => (
            <div key={i} className="flex flex-col items-center md:items-start">
              <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
                {t(section.title)}
              </h4>

              <ul className="space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.to}
                      className="text-gray-500 hover:text-black dark:hover:text-white transition"
                    >
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <div className="w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-black/40 to-transparent dark:via-white/40" />
        </div>

        <article className="relative mt-10 pt-6 flex flex-col items-center gap-4 text-center md:flex-row md:items-center">
          <div className="hidden md:block flex-1" />

          <p className="text-gray-500 text-sm flex items-center gap-1 md:absolute md:left-1/2 md:-translate-x-1/2">
            <Copyright className="w-4 h-4" />
            {new Date().getFullYear()} Readya. {t("footer_rights")}
          </p>

          <div className="flex gap-4 text-gray-500 md:ml-auto">
            {Object.entries(footerData.socialLinks).map(([key, url]) => {
              const Icon = socialIcons[key as keyof typeof socialIcons];
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={key}
                  className="w-5 h-5 hover:text-black dark:hover:text-white transition cursor-pointer"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </article>
      </section>
    </footer>
  );
};
