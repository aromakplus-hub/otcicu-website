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

const milestones = [
  {
    year: "2013",
    title: "Foundation of OTITOLOJU CICU LTD",
    description:
      "The cooperative was founded under the leadership of Alhaji Abdulahi Kolawole Oyeyemi with the vision of establishing a strong, non-interest cooperative dedicated to improving the socio-economic well-being of its members.",
  },
  {
    year: "Jan 2019",
    title: "Official Government Registration",
    description:
      "OTITOLOJU CICU LTD was officially registered by the Government as a Cooperative Investment and Credit Union Limited, providing legal recognition and strengthening its operations.",
  },
  {
    year: "2020",
    title: "Expansion of Membership and Services",
    description:
      "The cooperative experienced significant growth in membership and expanded its non-interest savings and loan services, empowering more members and supporting small businesses.",
  },
  {
    year: "2025",
    title: "Growth, Recognition, and Digital Transformation",
    description:
      "The cooperative strengthened its governance, introduced member recognition initiatives such as the Best Member Award, and began embracing digital platforms to improve communication and service delivery.",
  },
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
        title="Building financial security together since 2013"
        description="Otitoloju Cooperative Investment and Credit Union Limited pools member resources into collective savings and interest-free credit — guided by the cooperative principles of voluntary membership, democratic control, and shared prosperity."
      />

      {/* History */}
      <section className="py-24">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-900">
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <p className="font-display text-2xl font-semibold text-white">
                  Founded 2013 &middot; Registered 2019
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
              title="Founded in 2013, registered in 2019"
            />
            <div className="flex flex-col gap-4 text-sm leading-relaxed text-ink-600 sm:text-base">
              <p>
                OTITOLOJU Cooperative Investment and Credit Union Limited (OTITOLOJU CICU LTD) is a
                non-interest cooperative founded in 2013 by a group of visionary individuals led by
                Alhaji Abdulahi Kolawole Oyeyemi, with a shared commitment to improving the economic
                and social well-being of members through the cooperative model. The society was
                established on the principles of self-help, mutual trust, transparency, and
                collective responsibility, with a strong focus on promoting savings, providing
                interest-free financial assistance, and fostering sustainable economic growth.
              </p>
              <p>
                As the cooperative continued to grow in membership and strength, it attained
                official government registration in January 2019, giving it legal recognition to
                operate as a Cooperative Investment and Credit Union Limited. This milestone
                strengthened its governance and enabled it to expand its services in accordance
                with cooperative laws and regulations.
              </p>
              <p>
                One of the unique features of OTITOLOJU CICU LTD is its non-interest loan
                programme, through which qualified members can access loans of up to two (2) or
                three (3) times their savings, subject to the cooperative&rsquo;s approved policies
                and repayment terms. This initiative has empowered many members to grow their
                businesses, support their families, and improve their standard of living without
                the burden of interest charges.
              </p>
              <p>
                Today, OTITOLOJU CICU LTD continues to grow in membership, financial strength, and
                service delivery. The cooperative remains committed to promoting unity, integrity,
                accountability, and shared prosperity while empowering members through ethical,
                non-interest financial services.
              </p>
            </div>
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
              To be the leading non-interest Cooperative Investment and Credit Union Limited,
              empowering members through ethical financial services, interest-free financing,
              sustainable economic growth, and shared prosperity while upholding the highest
              standards of integrity, unity, and cooperative excellence.
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-3xl bg-emerald-900 p-9 text-emerald-50">
            <span className="w-fit rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-950">
              Our Mission
            </span>
            <p className="font-display text-xl font-semibold leading-snug">
              To build a strong, viable, and sustainable cooperative organization that responds to
              the socio-economic needs of its members by promoting financial independence through
              savings, investment opportunities, and accessible non-interest loans of up to two or
              three times members&rsquo; savings, in accordance with the cooperative&rsquo;s
              policies. We are committed to operating with integrity, honesty, accountability, and
              entrepreneurial excellence while adhering to government regulations and the core
              principles of the cooperative movement.
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

      {/* Milestones */}
      <section className="bg-emerald-50/50 py-24">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Our Journey"
              title="Milestones along the way"
              description="From a small group of founding members to a registered cooperative union serving thousands."
            />
          </div>
          <div className="lg:col-span-7">
            <ol className="flex flex-col gap-4">
              {milestones.map((milestone) => (
                <li key={milestone.year} className="flex items-start gap-4 rounded-2xl bg-white p-5">
                  <span className="flex h-14 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-700 px-2 text-center font-ui text-xs font-semibold text-white">
                    {milestone.year}
                  </span>
                  <div>
                    <p className="font-display text-[15px] font-semibold text-ink-900">{milestone.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">{milestone.description}</p>
                  </div>
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
