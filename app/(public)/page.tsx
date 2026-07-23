import { Hero } from "@/components/sections/hero";
import { StatsBand } from "@/components/sections/stats-band";
import { AboutPreview } from "@/components/sections/about-preview";
import { MembershipBenefits } from "@/components/sections/membership-benefits";
import { SavingsLoansOverview } from "@/components/sections/savings-loans-overview";
import { NewsPreview } from "@/components/sections/news-preview";
import { GalleryPreview } from "@/components/sections/gallery-preview";
import { CtaSection } from "@/components/shared/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <AboutPreview />
      <MembershipBenefits />
      <SavingsLoansOverview />
      <NewsPreview />
      <GalleryPreview />
      <CtaSection />
    </>
  );
}
