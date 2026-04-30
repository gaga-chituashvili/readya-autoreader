import * as Popover from "@radix-ui/react-popover";
import { User } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import { useAuthStore } from "@/store/authStore";
import { ROUTES } from "@/routes/paths";

export const UserProfile = () => {
  const { user, isLoading } = useAuthStore();
  const navigate = useNavigate();

  if (isLoading) return null;
  if (!user) return null;

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="flex items-center gap-2"
          onClick={() => navigate({ to: ROUTES.profile })}
        >
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <User size={20} />
          </div>
        </button>
      </Popover.Trigger>
    </Popover.Root>
  );
};
