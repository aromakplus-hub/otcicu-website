import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/shared/page-hero";
import { CtaSection } from "@/components/shared/cta-section";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from Otitoloju C.I.C.U's meetings, events, and community programmes.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Moments"
        title="Gallery"
        description="A look at the people, meetings, and events behind the cooperative."
      />

      <section className="py-24">
        <Container>
          <GalleryGrid />
        </Container>
      </section>

      <CtaSection
        title="Be part of the next photo"
        description="Join the cooperative and take part in our AGMs, outreach programmes, and member events."
      />
    </>
  );
}
