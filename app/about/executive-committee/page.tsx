import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProfileCard } from "@/components/shared/profile-card";
import { CtaSection } from "@/components/shared/cta-section";
import { executiveCommittee } from "@/lib/data/executive-committee";

export const metadata: Metadata = {
  title: "Executive Committee",
  description:
    "Meet the Executive Committee of Otitoloju C.I.C.U — the elected leadership guiding the cooperative's governance and strategy.",
};

export default function ExecutiveCommitteePage() {
  const [chairman, viceChairman, secretary, treasurer, financialSecretary, ...members] =
    executiveCommittee;

  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Executive Committee"
        description="Elected by the membership to steward the cooperative's governance, financial integrity, and strategic direction between Annual General Meetings."
      />

      <section className="py-24">
        <Container className="flex flex-col gap-16">
          <div>
            <SectionHeading eyebrow="Officers" title="Board Officers" className="mb-8" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[chairman, viceChairman, secretary, treasurer, financialSecretary].map((profile) => (
                <ProfileCard key={profile.name} profile={profile} />
              ))}
            </div>
          </div>

          {members.length > 0 && (
            <div>
              <SectionHeading eyebrow="Members" title="Committee Members" className="mb-8" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {members.map((profile) => (
                  <ProfileCard key={profile.name} profile={profile} />
                ))}
              </div>
            </div>
          )}

          <p className="text-sm text-ink-500">
            <em>
              Placeholder profiles — replace with verified names, roles, and biographies approved
              by the Board before publishing.
            </em>
          </p>
        </Container>
      </section>

      <CtaSection
        title="Have a question for the Executive Committee?"
        description="Reach out through our contact page — your enquiry will be routed to the right officer."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Learn About Membership"
        secondaryHref="/membership"
      />
    </>
  );
}
