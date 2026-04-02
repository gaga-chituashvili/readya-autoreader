import "@/App.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/router";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return <RouterProvider router={router} />;
}

export default App;
