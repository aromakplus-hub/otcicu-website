import type { Metadata } from "next";
import { Vote, Handshake, ShieldCheck, Users2, Sprout, Scale } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { CtaSection } from "@/components/shared/cta-section";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Otitoloju C.I.C.U's history, vision, mission, and the cooperative principles that guide everything we do.",
};

const values = [
  { icon: Vote, title: "Democratic Control", description: "One member, one vote — every voice counts equally at the AGM." },
  { icon: Handshake, title: "Mutual Benefit", description: "Surplus and growth are shared fairly among contributing members." },
  { icon: ShieldCheck, title: "Transparency", description: "Every transaction is recorded, auditable, and open to member review." },
  { icon: Users2, title: "Inclusivity", description: "Open, voluntary membership without discrimination of any kind." },
  { icon: Sprout, title: "Community Focus", description: "We reinvest in the sustainable development of our members' community." },
  { icon: Scale, title: "Financial Discipline", description: "Interest-free lending backed by disciplined, consistent saving." },
];

const objectives = [
  "Digitise membership, account, and loan processes to eliminate manual error",
  "Scale responsibly across branches while preserving financial accuracy",
  "Provide mobile-first, 24/7 access to accounts and loan status",
  "Operate a fully auditable, double-entry financial system",
  "Maintain full compliance with Nigerian cooperative and data protection law",
  "Embed internal controls and maker-checker workflows across all transactions",
];

const reasons = [
  {
    title: "No interest, ever",
    description: "Our loan facilities are interest-free by principle — you pay a transparent processing fee, nothing more.",
  },
  {
    title: "You have a real vote",
    description: "Confirmed members shape cooperative decisions directly at the Annual General Meeting.",
  },
  {
    title: "Built on transparency",
    description: "A fully auditable financial engine means every contribution and disbursement is tracked and reviewable.",
  },
  {
    title: "Membership that grows with you",
    description: "Start as a Guest Member and unlock full privileges — loans, investment, voting — as a Confirmed Member.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Cooperative"
        title="Building financial security, together, since our founding"
        description="Otitoloju Cooperative Investment and Credit Union Limited pools member resources into collective savings and interest-free credit — guided by the cooperative principles of voluntary membership, democratic control, and shared prosperity."
      />

      {/* History */}
      <section className="py-24">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-900">
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <p className="font-display text-2xl font-semibold text-white">
                  A cooperative built by its members
                </p>
                <p className="mt-2 text-sm text-emerald-100/80">
                  Registered under the Nigerian Cooperative Societies Act.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-7">
            <SectionHeading
              eyebrow="Our History"
              title="From a small savings circle to a growing cooperative union"
              description="Otitoloju C.I.C.U began as a small group of colleagues pooling monthly contributions to support one another through life's expenses — a practice rooted in the Yoruba tradition of collective thrift. Over time, formal registration under the Cooperative Societies Act allowed the group to grow into a fully-fledged credit union serving thousands of members."
            />
            <p className="text-sm leading-relaxed text-ink-500">
              <em>Placeholder content — replace with the cooperative&rsquo;s verified founding history, registration date, and milestones before publishing.</em>
            </p>
          </div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="bg-emerald-50/50 py-24">
        <Container className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-3xl bg-white p-9">
            <span className="w-fit rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
              Our Vision
            </span>
            <p className="font-display text-xl font-semibold leading-snug text-ink-900">
              To be the leading member-owned cooperative for financial inclusion and shared prosperity in our community.
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-3xl bg-emerald-900 p-9 text-emerald-50">
            <span className="w-fit rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-950">
              Our Mission
            </span>
            <p className="font-display text-xl font-semibold leading-snug">
              To empower members through disciplined savings, interest-free credit, and transparent, democratic governance.
            </p>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Core Values"
            title="The principles that guide every decision"
            align="center"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex flex-col gap-4 rounded-2xl border border-ink-100 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  <Icon size={20} />
                </span>
                <p className="font-display text-base font-semibold text-ink-900">{title}</p>
                <p className="text-sm leading-relaxed text-ink-500">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Strategic Objectives */}
      <section className="bg-emerald-50/50 py-24">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Strategic Objectives"
              title="Where the cooperative is headed"
              description="Our current digital transformation initiative is guided by six strategic objectives approved by the Board."
            />
          </div>
          <div className="lg:col-span-7">
            <ol className="flex flex-col gap-4">
              {objectives.map((objective, index) => (
                <li key={objective} className="flex items-start gap-4 rounded-2xl bg-white p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 font-ui text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-sm leading-relaxed text-ink-700">{objective}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Why Choose Us" title="What makes membership worthwhile" align="center" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason.title} className="rounded-2xl bg-emerald-50 p-6">
                <p className="font-display text-base font-semibold text-ink-900">{reason.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        title="Ready to be part of the cooperative story?"
        description="Join thousands of members already saving, borrowing, and growing together."
      />
    </>
  );
}
