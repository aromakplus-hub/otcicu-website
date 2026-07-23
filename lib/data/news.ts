export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  featured?: boolean;
  body?: string;
};

export const newsCategories = [
  "All",
  "Announcement",
  "Award",
  "News at Union Meeting",
] as const;

export const newsItems: NewsItem[] = [
  {
    id: "2025-agm",
    title: "OTITOLOJU CICU LTD Holds 2025 Annual General Meeting (AGM)",
    excerpt:
      "Members of OTITOLOJU CICU LTD gathered at Iree Town Hall for the 2025 Annual General Meeting to review the cooperative's progress and celebrate outstanding achievements.",
    date: "2026-05-02",
    category: "Announcement",
    featured: true,
    body: "OTITOLOJU Cooperative Investment and Credit Union Limited (OTITOLOJU CICU LTD) successfully held its 2025 Annual General Meeting (AGM) on Saturday, 2nd May 2026, at Iree Town Hall, beginning at 10:00 a.m. The meeting featured the presentation of annual reports, review of the cooperative's performance, and discussions on strategies for strengthening member welfare and promoting sustainable growth. The Executive Committee reaffirmed its commitment to transparency, accountability, and the provision of ethical, non-interest financial services for all members.",
  },
  {
    id: "2025-best-member-award",
    title: "2025 Best Member Award Presentation to Alhaja Muibat Ajibade Soliu",
    excerpt:
      "Alhaja Muibat Ajibade Soliu was honoured as the Best Member of the Year 2025 in recognition of her outstanding commitment, dedication, and valuable contributions to OTITOLOJU CICU LTD.",
    date: "2026-05-02",
    category: "Award",
    body: "During the 2026 Annual General Meeting, OTITOLOJU CICU LTD proudly presented the 2025 Best Membership Award to Alhaja Muibat Ajibade Soliu. The award recognized her exceptional commitment, dedication, consistency, and active participation in the affairs of the cooperative. Her unwavering support and valuable contributions have significantly contributed to the growth and success of OTITOLOJU CICU LTD. The cooperative congratulates her on this well-deserved honour and encourages all members to emulate her exemplary commitment and cooperative spirit.",
  },
  {
    id: "non-interest-financing",
    title: "OTITOLOJU CICU LTD Continues to Empower Members Through Non-Interest Financing",
    excerpt:
      "OTITOLOJU CICU LTD remains committed to improving members' economic well-being through accessible non-interest financial services.",
    date: "2026-04-06",
    category: "News at Union Meeting",
    body: 'As a non-interest Cooperative Investment and Credit Union, OTITOLOJU CICU LTD provides eligible members with financial support through loans of up to two (2) or three (3) times their savings, subject to the cooperative\'s approved policies and repayment terms. This initiative continues to empower members, support business growth, improve household welfare, and contribute to poverty eradication in line with the cooperative\'s motto, "Towards Poverty Eradication."',
  },
];
