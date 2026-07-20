export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  featured?: boolean;
};

export const newsCategories = [
  "All",
  "Announcement",
  "Loans",
  "Milestone",
  "Governance",
  "Community",
] as const;

export const newsItems: NewsItem[] = [
  {
    id: "agm-2026-notice",
    title: "Notice of 2026 Annual General Meeting",
    excerpt:
      "All confirmed members are invited to attend this year's AGM to review cooperative performance and vote on key resolutions.",
    date: "2026-06-15",
    category: "Announcement",
    featured: true,
  },
  {
    id: "loan-disbursement-q2",
    title: "Second Quarter Loan Disbursement Completed",
    excerpt:
      "Over 400 members received interest-free and development loan facilities in this cycle, supporting business and family needs.",
    date: "2026-05-28",
    category: "Loans",
  },
  {
    id: "membership-milestone",
    title: "Cooperative Crosses 12,000 Active Members",
    excerpt:
      "A milestone reached through steady growth in guest and confirmed membership across all branches.",
    date: "2026-05-02",
    category: "Milestone",
  },
  {
    id: "board-elections-2026",
    title: "Executive Committee Elections Scheduled",
    excerpt:
      "Nominations for the next Executive Committee cycle open ahead of the AGM. Confirmed members are eligible to stand or vote.",
    date: "2026-04-20",
    category: "Governance",
  },
  {
    id: "outreach-programme",
    title: "Community Financial Literacy Outreach",
    excerpt:
      "The cooperative hosted a financial literacy session for prospective members in the local community.",
    date: "2026-04-05",
    category: "Community",
  },
  {
    id: "new-branch-notice",
    title: "Extended Office Hours Announced",
    excerpt:
      "To serve members better, the main office will now open earlier on contribution due dates each month.",
    date: "2026-03-18",
    category: "Announcement",
  },
];
