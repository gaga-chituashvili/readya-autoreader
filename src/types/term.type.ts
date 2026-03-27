export type TermsSection = {
  title: string;
  content: string[];
};

export type TermsLang = {
  title: string;
  updated: string;
  intro: string;
  sections: TermsSection[];
};

export type Section = {
  title: string;
  content: string[];
  bullets?: string[];
};
