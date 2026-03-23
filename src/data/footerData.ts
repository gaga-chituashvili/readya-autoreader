import type { FooterData } from "../types/footer";

export const footerData: FooterData = {
  contact: {
    email: "tvitploba@gmail.com",
    website: "www.readya.me",
  },

  sections: [
    {
      title: "footer_product",
      links: [
        { label: "footer_terms", to: "/" },
        { label: "footer_privacy", to: "/" },
      ],
    },
    {
      title: "footer_features",
      links: [
        { label: "footer_reader", to: "/" },
        { label: "footer_ai", to: "/" },
        { label: "footer_voice", to: "/" },
      ],
    },
    {
      title: "footer_support",
      links: [
        { label: "footer_help", to: "/" },
        { label: "footer_contact", to: "/" },
      ],
    },
  ],
};
