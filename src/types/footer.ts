export type FooterData = {
  contact: {
    email: string;
    website: string;
  };
  sections: {
    title: string;
    links: { label: string; to: string }[];
  }[];
};
