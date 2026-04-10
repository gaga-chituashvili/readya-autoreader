import { useEffect, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export function SpeedInsightsWrapper() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      if (window.Cookiebot?.consent?.statistics) {
        setConsent(true);
      } else {
        setConsent(false);
      }
    };

    checkConsent();

    window.addEventListener("CookiebotOnAccept", checkConsent);
    window.addEventListener("CookiebotOnDecline", checkConsent);

    return () => {
      window.removeEventListener("CookiebotOnAccept", checkConsent);
      window.removeEventListener("CookiebotOnDecline", checkConsent);
    };
  }, []);

  if (!consent) return null;

  return <SpeedInsights />;
}
