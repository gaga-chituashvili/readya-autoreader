export type RefundSection = {
  title: string;
  content: string[];
};

export type RefundData = {
  title: string;
  updated: string;
  intro: string;
  sections: RefundSection[];
};
