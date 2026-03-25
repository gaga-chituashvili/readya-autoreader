import { useId, memo } from "react";

interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

export const SettingsSlider = memo(
  ({ label, value, min, max, step, onChange }: Props) => {
    const id = useId();

    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <label
            htmlFor={id}
            className="text-sm text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
          <span className="text-sm font-medium text-gray-900 dark:text-white tabular-nums">
            : {value}%
          </span>
        </div>

        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          className="
          w-full h-2 
          bg-gradient-to-r from-violet-200 via-violet-300 to-violet-200 
          dark:from-violet-900 dark:via-violet-800 dark:to-violet-900 
          rounded-full appearance-none cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
          [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:w-5 
          [&::-webkit-slider-thumb]:h-5 
          [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:bg-violet-500 
          [&::-webkit-slider-thumb]:cursor-pointer 
          [&::-webkit-slider-thumb]:shadow-md 
          [&::-webkit-slider-thumb]:transition-transform 
          [&::-webkit-slider-thumb]:hover:scale-110
          [&::-webkit-slider-thumb]:focus:ring-2
          [&::-webkit-slider-thumb]:focus:ring-violet-500
          [&::-moz-range-thumb]:w-5 
          [&::-moz-range-thumb]:h-5 
          [&::-moz-range-thumb]:rounded-full 
          [&::-moz-range-thumb]:bg-violet-500 
          [&::-moz-range-thumb]:border-0 
          [&::-moz-range-thumb]:cursor-pointer 
          [&::-moz-range-thumb]:shadow-md 
          [&::-moz-range-thumb]:transition-transform 
          [&::-moz-range-thumb]:hover:scale-110
        "
        />
      </div>
    );
  },
);

SettingsSlider.displayName = "SettingsSlider";
