"use client";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { faqKeys } from "@/data/faqData";

// shadcn accordion
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const { t } = useTranslation("home");

  return (
    <section className="relative py-20 px-4 md:px-6 bg-gray-100 dark:bg-black overflow-hidden">
      {/* decorative circle */}
      <div className="pointer-events-none absolute -top-0 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-purple-300 to-indigo-300 opacity-70 dark:opacity-40" />

      {/* container */}
      <div className="relative max-w-3xl mx-auto">
        {/* title */}
        <h2 className="text-center text-2xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white">
          {t("faq.title")}
        </h2>

        {/* accordion */}
        <Accordion type="single" collapsible className="grid gap-4">
          {faqKeys.map((key) => (
            <AccordionItem key={key} value={key} className="border-none">
              <div className="bg-gray-200 dark:bg-zinc-900 rounded-xl px-5 py-4 transition hover:bg-gray-300 dark:hover:bg-zinc-800">
                <AccordionTrigger className="text-left font-medium text-gray-900 dark:text-white">
                  {t(`faq.${key}.q`)}
                </AccordionTrigger>

                <AccordionContent className="text-gray-600 dark:text-gray-400 pt-2">
                  {t(`faq.${key}.a`)}
                </AccordionContent>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
