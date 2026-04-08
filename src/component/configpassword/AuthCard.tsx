export const AuthCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="w-full max-w-md bg-gray-100 dark:bg-zinc-900 
    p-6 rounded-3xl shadow-xl"
    >
      {children}
    </div>
  );
};
