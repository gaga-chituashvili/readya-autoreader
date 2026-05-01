import { MessageCircle, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const HELP_CHANNELS: { icon: LucideIcon; label: string }[] = [
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Mail, label: "Email" },
];

export function HelpCard() {
  return (
    <div className="bg-white border border-black/[0.07] rounded-xl p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900">Have an idea?</span>
        <button className="px-3.5 py-1.5 rounded-lg border border-black/[0.15] bg-white text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors">
          Share Your Thoughts
        </button>
      </div>

      <hr className="my-3 border-black/[0.06]" />

      <p className="text-sm font-medium text-gray-900 mb-2.5">Get Help</p>
      <div className="flex gap-2">
        {HELP_CHANNELS.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-black/[0.08] bg-white text-xs text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <Icon size={14} aria-hidden />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
