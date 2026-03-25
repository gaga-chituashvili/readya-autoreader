import { useId, memo } from "react";
import { Check } from "lucide-react";

interface Props {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const SettingsCheckbox = memo(({ label, checked, onChange }: Props) => {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className="
        mt-8 flex items-center gap-3 
        bg-gray-100 dark:bg-zinc-800 
        rounded-full px-5 py-4 
        cursor-pointer 
        hover:bg-gray-150 dark:hover:bg-zinc-750 
        transition-colors
        focus-within:ring-2 focus-within:ring-violet-500 focus-within:ring-offset-2
      "
    >
      <div className="relative flex items-center justify-center flex-shrink-0">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
          aria-label={label}
        />
        <div
          className="
            w-5 h-5 
            border-2 border-gray-400 dark:border-gray-600 
            rounded 
            peer-checked:bg-violet-500 peer-checked:border-violet-500 
            peer-focus:ring-2 peer-focus:ring-violet-500 peer-focus:ring-offset-2
            transition-all 
            flex items-center justify-center
          "
        >
          {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
        </div>
      </div>
      <span className="text-sm text-gray-800 dark:text-gray-200 select-none">
        {label}
      </span>
    </label>
  );
});

SettingsCheckbox.displayName = "SettingsCheckbox";
