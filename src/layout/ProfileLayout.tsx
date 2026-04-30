import { Outlet } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useNavigate, useLocation } from "@tanstack/react-router";
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
    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-lg font-medium text-blue-700 border-2 border-black/5">
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

  if (!user) return null;

  const handleLogout = async () => {
    await logoutRequest();
    logout();
    navigate({ to: ROUTES.signIn });
  };

  const displayName = user.full_name ?? user.email;
  const activeId = NAV_ITEMS.find((n) => n.path === pathname)?.id ?? "profile";

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <aside className="w-48 flex-shrink-0 bg-white border-r border-black/[0.07] px-3 py-6 flex flex-col gap-1">
        <div className="flex flex-col gap-1 mb-5">
          <Avatar name={displayName} />
          <p className="text-sm font-medium text-gray-900 mt-1">
            {displayName}
          </p>
          <p className="text-[11px] text-gray-400 break-all">{user.email}</p>
          <span className="self-start text-[11px] font-medium bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full mt-1">
            {user.subscription_plan ?? "Free"}
          </span>
          {user.subscription_end && (
            <p className="text-[10px] text-gray-400">
              Expires: {new Date(user.subscription_end).toLocaleDateString()}
            </p>
          )}
        </div>

        <nav className="flex flex-col gap-0.5">
          {NAV_ITEMS.map(({ id, label, path }) => (
            <button
              key={id}
              onClick={() => navigate({ to: path })}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activeId === id
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-50 transition-colors"
        >
          <LogOut size={15} />
          Log Out
        </button>
      </aside>

      <main className="flex-1 p-5 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
