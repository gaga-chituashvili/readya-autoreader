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
  socialLinks: {
    instagram:
      "https://www.instagram.com/readya.me?igsh=Y2Vob21udGlscTA%3D&utm_source=qr",
    facebook:
      "https://www.facebook.com/Readya.me?mibextid=wwXIfr&rdid=dj47jAOxGQCfBwfV&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1J296Wb9Hz%2F%3Fmibextid%3DwwXIfr%26ref%3D1",
    youtube: "https://www.youtube.com/watch?v=YTpFZR-Mr5Y",
    linkedin: "https://www.linkedin.com/company/readya/posts/?feedView=all",
  },
};
