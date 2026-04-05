import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import type { PasswordFieldProps } from "@/types/log";

export const PasswordField = ({
  register,
  error,
  placeholder,
  label,
  id,
}: PasswordFieldProps) => {
  const [show, setShow] = useState(false);

  return (
    <section className="w-full space-y-1">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          {...register}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-10 rounded-xl border 
          border-gray-300 dark:border-zinc-700 
          bg-white dark:bg-zinc-900 
          text-gray-900 dark:text-white
          placeholder:text-gray-400 dark:placeholder:text-gray-500
          focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </section>
  );
};
