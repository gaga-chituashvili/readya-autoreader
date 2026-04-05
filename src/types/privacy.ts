export type PrivacySection = {
  title: string;
  content: string[];
};

export type PrivacyLang = {
  title: string;
  updated: string;
  intro: string;
  sections: PrivacySection[];
};
