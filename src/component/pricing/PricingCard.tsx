import type { PricingCardProps } from "@/types/pricing";
import { useTranslation } from "react-i18next";

export const PricingCard = ({
  title,
  price,
  oldPrice,
  period,
  active,
}: PricingCardProps) => {
  const { t } = useTranslation("pricing");

  return (
    <div
      className={`
        relative rounded-3xl px-10 py-10 text-center
        transition-all duration-300 group
        bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl
        border border-gray-200 dark:border-zinc-800
        ${
          active
            ? "scale-105 shadow-2xl border-indigo-400/40"
            : "opacity-80 hover:opacity-100 hover:scale-[1.02]"
        }
      `}
    >
      {/* 🔥 Glow effect (active only) */}
      {active && (
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-xl pointer-events-none" />
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold mb-8 text-gray-800 dark:text-white relative z-10">
        {title}
      </h3>

      {/* Price Row */}
      <div className="flex items-end justify-center gap-3 mb-6 relative z-10">
        {/* Price */}
        <span className="text-5xl font-bold text-indigo-500 leading-none tracking-tight">
          {price}
        </span>

        {/* Slash */}
        {(oldPrice || period) && (
          <span className="text-lg text-gray-800 dark:text-white mb-1">/</span>
        )}

        {/* Period (👉 გვერდით ლამაზად) */}
        {period && (
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-1 whitespace-nowrap">
            {period}
          </span>
        )}

        {/* Old price */}
        {oldPrice && (
          <span className="text-lg line-through text-gray-400 mb-1">
            {oldPrice}
          </span>
        )}
      </div>

      {/* Button */}
      <button
        className={`
          w-full py-3 rounded-full text-sm font-medium transition-all duration-300
          bg-gradient-to-r from-indigo-500 to-purple-500
          text-white
          hover:shadow-lg hover:shadow-indigo-500/30
          active:scale-95
        `}
      >
        {t("buy_now")}
      </button>
    </div>
  );
};
