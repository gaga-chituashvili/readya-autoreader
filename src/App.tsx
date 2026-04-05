import "@/App.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/router";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}

export default App;
