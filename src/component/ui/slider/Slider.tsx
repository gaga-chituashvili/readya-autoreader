import { useId } from "react";

type Props = {
  label: string;
  value: number;
  onChange: (v: number) => void;
};

export const Slider = ({ label, value, onChange }: Props) => {
  const id = useId();

  return (
    <div className="mb-8">
      {/* Label with percentage */}
      <div className="flex justify-between items-center mb-3">
        <label
          htmlFor={id}
          className="text-sm text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          : {value}%
        </span>
      </div>

      {/* Slider Input */}
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gradient-to-r from-violet-200 via-violet-300 to-violet-200 dark:from-violet-900 dark:via-violet-800 dark:to-violet-900 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-violet-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:hover:scale-110"
      />
    </div>
  );
};
