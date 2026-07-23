export type GalleryItem = {
  id: string;
  caption: string;
  category: string;
  span?: "wide" | "tall" | "normal";
  photo?: string;
};

export const galleryCategories = [
  "All",
  "History",
  "Meetings",
  "Awards",
  "Office",
  "Services",
  "Community",
  "Training",
  "Membership",
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: "g-agm-group",
    caption: "2025 Annual General Meeting at Iree Town Hall",
    category: "Meetings",
    span: "wide",
    photo: "/images/gallery/agm-2025-group-photo.jpg",
  },
  {
    id: "g-agm-prayer-1",
    caption: "Opening Prayer during the 2025 AGM",
    category: "Meetings",
    photo: "/images/gallery/agm-2025-opening-prayer-1.jpg",
  },
  {
    id: "g-agm-prayer-2",
    caption: "Opening Prayer during the 2025 AGM",
    category: "Meetings",
    photo: "/images/gallery/agm-2025-opening-prayer-2.jpg",
  },
  {
    id: "g-agm-president-address",
    caption: "Union President Addressing Members at the AGM",
    category: "Meetings",
    span: "tall",
    photo: "/images/gallery/agm-2025-president-address.jpg",
  },
  {
    id: "g-best-member-award",
    caption: "Presentation of the 2025 Best Member Award to Alhaja Muibat Ajibade Soliu",
    category: "Awards",
    photo: "/images/gallery/best-member-award-2025.jpg",
  },
  {
    id: "g-executive-committee-2026",
    caption: "Executive Officers of OTITOLOJU CICU LTD",
    category: "Office",
    photo: "/images/gallery/executive-committee-2026.jpg",
  },
  // The items below are confirmed captions from the cooperative but photos have not
  // been supplied yet — they render as placeholder tiles until images arrive.
  { id: "g-founding-members", caption: "Founding Members of OTITOLOJU CICU LTD", category: "History" },
  { id: "g-government-registration", caption: "Official Government Registration Ceremony", category: "History" },
  { id: "g-loan-disbursement", caption: "Members Receiving Non-Interest Loan Support", category: "Services" },
  { id: "g-monthly-meeting", caption: "Monthly Cooperative Members' Meeting", category: "Meetings" },
  { id: "g-community-outreach", caption: "Community Development and Outreach Programme", category: "Community" },
  { id: "g-members-training", caption: "Members' Capacity Building and Financial Literacy Training", category: "Training" },
  { id: "g-office-building", caption: "OTITOLOJU CICU LTD Secretariat", category: "Office" },
  { id: "g-new-members-induction", caption: "Orientation and Induction of New Members", category: "Membership" },
  { id: "g-executive-board-meeting", caption: "Executive Committee Strategy Meeting", category: "Meetings" },
  { id: "g-savings-collection", caption: "Monthly Savings and Contribution Exercise", category: "Services" },
];
