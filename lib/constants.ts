export const siteConfig = {
  name: "OTITOLOJU C.I.C.U",
  fullName: "Otitoloju Cooperative Investment and Credit Union Limited",
  slogan: "Fun Iserere Temi Tire",
  sloganTranslation: "For the benefit of mine and yours",
  description:
    "A member-owned, non-interest cooperative building financial security through collective savings, interest-free financing, and shared prosperity.",
  email: "", // Not supplied in the approved content workbook — show "Coming Soon" until confirmed
  phone: "+234 816 473 0336",
  whatsapp: "+2348164730336",
  address:
    "Otitoloju Cooperative Office 1, opposite Post Office, Toad Garage, Ikirun/Ila-Orangun Road, Oju-Elegba, Iree, Osun State",
  founded: "Registered under the Nigerian Cooperative Societies Act — January 2019",
  social: {
    facebook: "https://www.facebook.com/share/1DTqyDdteJ/?mibextid=wwXIfr",
    instagram: "https://www.instagram.com/otitolojucicu?igsh=OTZuYWl0bXV5dTE4",
    x: "https://x.com/OTITOLOJUCICU",
  },
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
