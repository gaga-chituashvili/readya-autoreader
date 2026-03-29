"use client";

import readyalogo from "@/assets/Readyalogo.png";
import { Link } from "@tanstack/react-router";
import { LanguageSwitcher } from "@/component/common/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/component/common/ToggleButton";
import { useScrollDirection } from "@/hook/useScrollDirection";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/component/ui/Button";
import { useNavigate, useRouterState } from "@tanstack/react-router";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/component/ui/popover";
import { AboutDropdown } from "@/component/AboutDropdown";
import { ROUTES } from "@/routes/paths";

export const Header = () => {
  const { t } = useTranslation("header");
  const isVisible = useScrollDirection();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const handleLogoClick = () => {
    if (pathname === ROUTES.home) {
      window.location.reload();
    } else {
      navigate({ to: ROUTES.home });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-white dark:bg-black shadow-sm transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <img
        className="h-10 cursor-pointer"
        src={readyalogo}
        alt="Readya Logo"
        onClick={handleLogoClick}
      />

      <nav className="hidden md:block">
        <ul className="flex space-x-4">
          <AboutDropdown />
          <Link
            activeProps={{ className: "text-indigo-500 font-semibold" }}
            to="/"
          >
            {t("text_to_speech")}
          </Link>
          <Link
            activeProps={{ className: "text-indigo-500 font-semibold" }}
            to={ROUTES.pricing}
          >
            {t("pay")}
          </Link>
        </ul>
      </nav>

      <article className="hidden md:flex space-x-10">
        <div className="flex items-center space-x-4">
          <Button
            variant="default"
            onClick={() => navigate({ to: ROUTES.singnIn })}
          >
            {t("enter")}
          </Button>
          <ThemeToggle />
        </div>
        <LanguageSwitcher />
      </article>

      <div className="flex items-center gap-3 md:hidden">
        <LanguageSwitcher />
        <ThemeToggle />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-800 transition">
              <Menu className="h-6 w-6" />
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            className="w-56 mt-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white rounded-xl p-6"
          >
            <nav className="flex flex-col gap-4">
              <Link
                activeProps={{ className: "text-indigo-500 font-semibold" }}
                to="/"
                onClick={() => setOpen(false)}
              >
                {t("about_our_company")}
              </Link>

              <Link
                activeProps={{ className: "text-indigo-500 font-semibold" }}
                to="/"
                onClick={() => setOpen(false)}
              >
                {t("text_to_speech")}
              </Link>

              <Link
                activeProps={{ className: "text-indigo-500 font-semibold" }}
                to="/"
                onClick={() => setOpen(false)}
              >
                {t("pay")}
              </Link>

              <div className="border-t border-gray-200 dark:border-zinc-700 my-2" />

              <Button
                variant="default"
                onClick={() => navigate({ to: ROUTES.singnIn })}
              >
                {t("enter")}
              </Button>
            </nav>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};
