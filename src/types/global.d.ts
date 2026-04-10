export {};

declare global {
  interface Window {
    Cookiebot?: {
      consent: {
        statistics: boolean;
        marketing: boolean;
        preferences: boolean;
      };
    };
  }
}
