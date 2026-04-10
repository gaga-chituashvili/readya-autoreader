import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";

export function AnalyticsWrapper() {
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

  return <Analytics />;
}
