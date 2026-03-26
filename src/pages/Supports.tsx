"use client";
import { useTranslation } from "react-i18next";
import { faqKeys } from "@/data/faqData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/component/ui/accordion";
import { Facebook, Instagram, Linkedin, Plus, Youtube } from "lucide-react";
import { EmailPill } from "@/hook/EmailPill";

export const Supports = () => {
  const { t } = useTranslation(["home", "supports"]);

  return (
    <section className="relative py-20 px-4 md:px-6 pb-28 md:pb-36 bg-gray-100 dark:bg-black overflow-hidden">
      <div className="pointer-events-none absolute top-20 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-purple-300 to-indigo-300 opacity-70 dark:opacity-40" />
      <article className="relative max-w-3xl mx-auto">
        <h2 className="text-center text-2xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white">
          {t("supports:supports_title")}
        </h2>

        <Accordion type="single" collapsible className="grid gap-4">
          {faqKeys.map((key) => (
            <AccordionItem key={key} value={key} className="border-none">
              <div className="bg-gray-200 dark:bg-zinc-900 rounded-xl px-5 py-4 transition hover:bg-gray-300 dark:hover:bg-zinc-800">
                <AccordionTrigger className="group flex items-center justify-between text-left font-medium text-gray-900 dark:text-white">
                  {t(`faq.${key}.q`)}

                  <Plus className="h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-45" />
                </AccordionTrigger>

                <AccordionContent className="text-gray-600 dark:text-gray-400 pt-2">
                  {t(`faq.${key}.a`)}
                </AccordionContent>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </article>
      <article className="mt-24 md:mt-32 flex flex-col items-center text-center gap-6">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {t("supports:contact")}
        </h2>
        <EmailPill />
        <div className="flex items-center justify-center gap-5 bg-gray-200 dark:bg-zinc-900 px-6 py-3 rounded-full">
          <Instagram className="w-5 h-5 hover:text-black dark:hover:text-white transition cursor-pointer" />
          <Facebook className="w-5 h-5 hover:text-black dark:hover:text-white transition cursor-pointer" />
          <Youtube className="w-5 h-5 hover:text-black dark:hover:text-white transition cursor-pointer" />
          <Linkedin className="w-5 h-5 hover:text-black dark:hover:text-white transition cursor-pointer" />
        </div>
      </article>
      <div className="pointer-events-none absolute bottom-20 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-purple-300 to-indigo-300 opacity-70 dark:opacity-40" />
    </section>
  );
};
