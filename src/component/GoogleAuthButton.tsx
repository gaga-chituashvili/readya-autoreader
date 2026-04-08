import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/routes/paths";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { url } from "@/api/config/url";

export const GoogleAuthButton = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    const token = credentialResponse.credential;

    if (!token) return;

    try {
      await fetch(`${url}/auth/google/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ token }),
      });

      const res = await fetch(`${url}/profile/`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const user = await res.json();

      setUser(user);

      navigate({ to: ROUTES.home });
    } catch (err) {
      console.error("Google auth error:", err);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Google Login Failed")}
      />
    </div>
  );
};
