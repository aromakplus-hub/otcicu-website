export const siteConfig = {
  name: "OTITOLOJU C.I.C.U",
  fullName: "Otitoloju Cooperative Investment and Credit Union Limited",
  slogan: "Fun Iserere Temi Tire",
  sloganTranslation: "For the benefit of mine and yours",
  description:
    "A member-owned cooperative building financial security through collective savings, transparent lending, and shared prosperity.",
  email: "info@otitolojucicu.org",
  phone: "+234 800 000 0000",
  address: "Cooperative House, Lagos, Nigeria",
  founded: "Registered under the Nigerian Cooperative Societies Act",
};

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  href: string;
  children?: NavItem[];
};

/**
 * Primary navigation. Structured as groups with optional children so that
 * future sub-pages (e.g. Membership > Benefits, > How to Join) can be added
 * without restructuring the header component.
 */
export const mainNav: NavGroup[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Executive Committee", href: "/about/executive-committee" },
  {
    label: "Membership",
    href: "/membership",
    children: [
      { label: "Why Join", href: "/membership#why-join" },
      { label: "How to Apply", href: "/apply" },
    ],
  },
  { label: "Savings", href: "/savings" },
  { label: "Loans", href: "/loans" },
  { label: "News & Announcements", href: "/news" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

export const footerNav = {
  cooperative: [
    { label: "About Us", href: "/about" },
    { label: "Executive Committee", href: "/about/executive-committee" },
    { label: "News & Announcements", href: "/news" },
    { label: "Gallery", href: "/gallery" },
  ],
  services: [
    { label: "Membership", href: "/membership" },
    { label: "Savings", href: "/savings" },
    { label: "Loans", href: "/loans" },
    { label: "Apply Now", href: "/apply" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/contact#faqs" },
  ],
};
