import type { FooterData } from "@/types/footer";

export const footerData: FooterData = {
  contact: {
    email: "tvitploba@gmail.com",
    website: "www.readya.me",
  },

  sections: [
    {
      title: "conditions",
      links: [
        { label: "terms_and_policy", to: "/terms-and-policy" },
        { label: "footer_terms", to: "/refund-policy" },
        { label: "footer_privacy", to: "/privacy-policy" },
      ],
    },
    {
      title: "about_our",
      links: [
        { label: "about_readya", to: "/about-us" },
        { label: "our_team", to: "/our-team" },
        { label: "contact", to: "/" },
      ],
    },
    {
      title: "service_user",
      links: [
        { label: "service", to: "/services" },
        { label: "support", to: "/supports" },
      ],
    },
  ],
};
