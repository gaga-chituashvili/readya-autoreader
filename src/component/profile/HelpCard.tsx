import { MessageCircle, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const HELP_CHANNELS: { icon: LucideIcon; label: string }[] = [
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Mail, label: "Email" },
];

export function HelpCard() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-black/[0.07] dark:border-white/[0.07] rounded-xl p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Have an idea?
        </span>
        <button className="self-start sm:self-auto px-3.5 py-1.5 rounded-lg border border-black/[0.15] dark:border-white/[0.15] bg-white dark:bg-gray-700 text-sm font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
          Share Your Thoughts
        </button>
      </div>

      <hr className="my-3 border-black/[0.06] dark:border-white/[0.06]" />

      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2.5">
        Get Help
      </p>
      <div className="flex gap-2">
        {HELP_CHANNELS.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            <Icon size={14} aria-hidden />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
