export type GalleryItem = {
  id: string;
  caption: string;
  category: string;
  span?: "wide" | "tall" | "normal";
};

export const galleryCategories = [
  "All",
  "Events",
  "Meetings",
  "Community",
  "Office",
] as const;

export const galleryItems: GalleryItem[] = [
  { id: "g1", caption: "Annual General Meeting, 2025", category: "Meetings", span: "wide" },
  { id: "g2", caption: "Member Onboarding Day", category: "Events" },
  { id: "g3", caption: "Cooperative Head Office", category: "Office" },
  { id: "g4", caption: "Loan Beneficiaries Forum", category: "Events", span: "tall" },
  { id: "g5", caption: "Community Outreach Programme", category: "Community" },
  { id: "g6", caption: "Executive Committee Retreat", category: "Meetings" },
  { id: "g7", caption: "New Member Induction", category: "Events" },
  { id: "g8", caption: "Financial Literacy Workshop", category: "Community" },
  { id: "g9", caption: "Branch Office Reception", category: "Office" },
];
