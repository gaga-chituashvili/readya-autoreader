type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  label?: string;
  id?: string;
};

export const Input = ({ error, label, id, ...props }: Props) => {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      {/* ⌨️ Input */}
      <input
        id={id}
        {...props}
        className="w-full px-4 py-3 rounded-xl border 
        border-gray-300 dark:border-zinc-700 
        bg-white dark:bg-zinc-900 
        text-gray-900 dark:text-white
        placeholder:text-gray-400 dark:placeholder:text-gray-500
        focus:ring-2 focus:ring-indigo-500 
        outline-none transition"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
