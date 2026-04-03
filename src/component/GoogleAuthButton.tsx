import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/routes/paths";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";

export const GoogleAuthButton = () => {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    const token = credentialResponse.credential;

    if (!token) {
      console.error("No credential received");
      return;
    }

    try {
      const res = await fetch("https://readya-backend.onrender.com/auth/google/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        throw new Error("Google login failed");
      }

      const data = await res.json();

      login(data);
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
