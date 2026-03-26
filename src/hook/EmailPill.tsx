const CONTACT_EMAIL = "tvitploba@gmail.com";

export const EmailPill = ({ email = CONTACT_EMAIL }: { email?: string }) => {
  const handleClick = () => {
    window.location.href = `mailto:${email}`;
  };
  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center bg-gray-200 dark:bg-zinc-900 px-6 py-3 rounded-full text-indigo-500 font-medium transition hover:bg-gray-300 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      aria-label={`Send email to ${email}`}
    >
      {email}
    </button>
  );
};
