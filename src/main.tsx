import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import "@/i18n";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

import { AnalyticsWrapper } from "@/component/AnalyticsWrapper";
import { SpeedInsightsWrapper } from "@/component/SpeedInsightsWrapper";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        <App />
      </ThemeProvider>

      <SpeedInsightsWrapper />
      <AnalyticsWrapper />
    </QueryClientProvider>
  </StrictMode>,
);
