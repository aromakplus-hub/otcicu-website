import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/shared/page-hero";
import { CtaSection } from "@/components/shared/cta-section";
import { NewsListing } from "@/components/news/news-listing";

export const metadata: Metadata = {
  title: "News & Announcements",
  description:
    "Read the latest news, meeting notices, and announcements from Otitoloju C.I.C.U.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay Informed"
        title="News & Announcements"
        description="Meeting notices, loan disbursement updates, and milestones from across the cooperative."
      />

      <section className="py-24">
        <Container>
          <NewsListing />
        </Container>
      </section>

      <CtaSection
        title="Never miss an announcement"
        description="Confirmed members receive AGM notices and updates directly by SMS and email."
        primaryLabel="Become a Member"
        secondaryLabel="Contact Us"
      />
    </>
  );
}
