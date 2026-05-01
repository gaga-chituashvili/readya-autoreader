import { useState } from "react";
import { Outlet } from "@tanstack/react-router";
import { LogOut, Menu } from "lucide-react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import { logoutRequest } from "@/services/authService";
import { ROUTES } from "@/routes/paths";

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-lg font-medium text-blue-700 dark:text-blue-300 border-2 border-black/5 dark:border-white/10">
      {initials}
    </div>
  );
}

type NavItem = "profile" | "subscription" | "library";

const NAV_ITEMS: { id: NavItem; label: string; path: string }[] = [
  { id: "profile", label: "Profile", path: ROUTES.profile },
  { id: "subscription", label: "Subscription", path: ROUTES.pricing },
  { id: "library", label: "Library", path: ROUTES.library },
];

export default function ProfileLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return null;

  const handleLogout = async () => {
    await logoutRequest();
    logout();
    navigate({ to: ROUTES.signIn });
  };

  const handleNav = (path: string) => {
    navigate({ to: path });
    setMobileOpen(false);
  };

  const displayName = user.full_name ?? user.email;
  const activeId = NAV_ITEMS.find((n) => n.path === pathname)?.id ?? "profile";

  const sidebarContent = (
    <>
      <div className="flex flex-col gap-1 mb-5">
        <Avatar name={displayName} />
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mt-1">
          {displayName}
        </p>
        <p className="text-[11px] text-gray-400 dark:text-gray-500 break-all">
          {user.email}
        </p>
        <span className="self-start text-[11px] font-medium bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full mt-1">
          {user.subscription_plan ?? "Free"}
        </span>
        {user.subscription_end && (
          <p className="text-[10px] text-gray-400 dark:text-gray-500">
            Expires: {new Date(user.subscription_end).toLocaleDateString()}
          </p>
        )}
      </div>

      <nav className="flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ id, label, path }) => (
          <button
            key={id}
            onClick={() => handleNav(path)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              activeId === id
                ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
      >
        <LogOut size={15} />
        Log Out
      </button>
    </>
  );

  return (
    <div
      className="flex bg-gray-100 dark:bg-gray-900 font-sans"
      style={{ minHeight: "calc(100vh - 4.1rem)" }}
    >
      <aside className="hidden md:flex w-48 flex-shrink-0 bg-white dark:bg-gray-800 border-r border-black/[0.07] dark:border-white/[0.07] px-3 py-6 flex-col gap-1">
        {sidebarContent}
      </aside>

      <div
        className="md:hidden fixed left-0 top-0 h-full w-5 z-40"
        onTouchStart={() => setMobileOpen(true)}
      />

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="md:hidden fixed inset-0 z-30 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              className="md:hidden fixed left-0 h-full w-56 bg-white top-[4.1rem] dark:bg-gray-800 px-3 py-6 flex flex-col gap-1 shadow-xl z-40"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0.5, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) setMobileOpen(false);
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed bottom-6 left-4 z-40 bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 border border-black/[0.07] dark:border-white/[0.07]"
        aria-label="Open menu"
      >
        <Menu size={20} className="text-gray-600 dark:text-gray-300" />
      </button>

      <main className="flex-1 p-4 md:p-5 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
