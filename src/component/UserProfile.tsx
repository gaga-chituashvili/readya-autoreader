import * as Popover from "@radix-ui/react-popover";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/routes/paths";
import { logoutRequest } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

export const UserProfile = () => {
  const { user, isLoading, logout } = useAuthStore();
  const navigate = useNavigate();

  if (isLoading) return null;
  if (!user) return null;

  const handleLogout = async () => {
    await logoutRequest();
    logout();
    navigate({ to: ROUTES.signIn });
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <User size={20} />
          </div>
        </button>
      </Popover.Trigger>

      <Popover.Content
        align="end"
        className="w-72 rounded-2xl bg-white shadow-xl p-4 border animate-in fade-in zoom-in-95"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={22} />
          </div>

          <div>
            <p className="font-semibold text-gray-900">{user.full_name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="border-t my-3" />

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 text-red-500 w-full transition"
        >
          <LogOut size={18} />
          გამოსვლა
        </button>
      </Popover.Content>
    </Popover.Root>
  );
};
