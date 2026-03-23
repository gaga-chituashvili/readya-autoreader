import type { FooterData } from "../types/footer";

export const footerData: FooterData = {
  contact: {
    email: "tvitploba@gmail.com",
    website: "www.readya.me",
  },

  sections: [
    {
      title: "conditions",
      links: [
        { label: "terms_and_policy", to: "/" },
        { label: "footer_terms", to: "/" },
        { label: "footer_privacy", to: "/" },
      ],
    },
    {
      title: "footer_features",
      links: [
        { label: "about_readya", to: "/" },
        { label: "our_team", to: "/" },
        { label: "contact", to: "/" },
      ],
    },
    {
      title: "service_user",
      links: [
        { label: "service", to: "/" },
        { label: "support", to: "/" },
      ],
    },
  ],
};
