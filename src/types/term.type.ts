export type TermsSection = {
  title: string;
  content: string[];
  bullets?: string[];
};

export type TermsLang = {
  title: string;
  updated: string;
  intro: string;
  sections: TermsSection[];
};
