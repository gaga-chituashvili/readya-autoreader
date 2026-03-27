import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/component/ui/popover";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export const AboutDropdown = () => {
  const { t } = useTranslation("footer");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-indigo-500 transition">
          {t("about_our")}
          <ChevronDown size={16} />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-56 mt-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white rounded-xl p-4"
      >
        <nav className="flex flex-col gap-3">
          <Link to="/about-us" className="hover:text-indigo-500 transition">
            {t("about_readya")}
          </Link>
          <Link to="/our-team" className="hover:text-indigo-500 transition">
            {t("our_team")}
          </Link>

          <Link to="/contact" className="hover:text-indigo-500 transition">
            {t("contact")}
          </Link>
        </nav>
      </PopoverContent>
    </Popover>
  );
};
