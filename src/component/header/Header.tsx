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
import { useAuthStore } from "@/store/authStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/component/ui/popover";
import { AboutDropdown } from "@/component/AboutDropdown";
import { ROUTES } from "@/routes/paths";
import { UserProfile } from "@/component/UserProfile";

export const Header = () => {
  const { t } = useTranslation("header");
  const isVisible = useScrollDirection();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isLoading } = useAuthStore();
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
            to={ROUTES.home}
            activeProps={{
              className: "text-indigo-600 font-semibold dark:text-indigo-400",
            }}
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
          >
            {t("text_to_speech")}
          </Link>

          <Link
            to={ROUTES.pricing}
            activeProps={{
              className: "text-indigo-600 font-semibold dark:text-indigo-400",
            }}
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
          >
            {t("pay")}
          </Link>
        </ul>
      </nav>

      <article className="hidden md:flex space-x-10">
        <article className="flex items-center space-x-4">
          {isLoading ? null : user ? (
            <UserProfile />
          ) : (
            <Button
              variant="default"
              onClick={() => navigate({ to: ROUTES.singnIn })}
            >
              {t("enter")}
            </Button>
          )}

          <ThemeToggle />
        </article>
        <LanguageSwitcher />
      </article>

      <section className="flex items-center gap-3 md:hidden">
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
                to={ROUTES.aboutUs}
                onClick={() => setOpen(false)}
                activeProps={{
                  className:
                    "text-indigo-600 font-semibold dark:text-indigo-400",
                }}
                className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
              >
                {t("about_our_company")}
              </Link>

              <Link
                to={ROUTES.home}
                onClick={() => setOpen(false)}
                activeProps={{
                  className:
                    "text-indigo-600 font-semibold dark:text-indigo-400",
                }}
                className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
              >
                {t("text_to_speech")}
              </Link>

              <li>
                <button
                  onClick={() => {
                    if (user) {
                      navigate({ to: ROUTES.pricing });
                    } else {
                      navigate({ to: ROUTES.singnIn });
                    }
                  }}
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                >
                  {t("pay")}
                </button>
              </li>

              <div className="border-t border-gray-200 dark:border-zinc-700 my-2" />

              {isLoading ? null : user ? (
                <UserProfile />
              ) : (
                <Button
                  variant="default"
                  onClick={() => navigate({ to: ROUTES.singnIn })}
                >
                  {t("enter")}
                </Button>
              )}
            </nav>
          </PopoverContent>
        </Popover>
      </section>
    </header>
  );
};
