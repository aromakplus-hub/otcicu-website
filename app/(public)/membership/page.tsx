import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, PiggyBank, HandCoins, Smartphone, Users2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { CtaSection } from "@/components/shared/cta-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  membershipCategories,
  membershipEligibility,
  membershipProcess,
  membershipFaqs,
} from "@/lib/data/membership";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Membership eligibility, benefits, categories, and how to apply to join Otitoloju C.I.C.U.",
};

const benefits = [
  { icon: PiggyBank, title: "Disciplined Savings", description: "Automatic monthly contributions build your balance steadily." },
  { icon: HandCoins, title: "Interest-Free Loans", description: "Access five loan products with no interest — only a processing fee." },
  { icon: Smartphone, title: "Mobile-First Access", description: "View balances and apply for loans from your phone, anytime." },
  { icon: Users2, title: "A Voice That Counts", description: "Confirmed members vote at the AGM and shape cooperative direction." },
];

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="Join a cooperative built on mutual benefit"
        description="Membership opens with Guest status and grows into full Confirmed status within six months of steady contributions."
      />

      {/* Eligibility */}
      <section className="py-24">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Eligibility"
              title="Who can join"
              description="Membership is open and non-discriminatory, in line with cooperative principles. To apply, you'll need:"
            />
          </div>
          <div className="lg:col-span-7">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {membershipEligibility.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-ink-100 p-4">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-700" />
                  <span className="text-sm leading-relaxed text-ink-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section id="why-join" className="bg-emerald-50/50 py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Why Join" title="What membership unlocks" align="center" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex flex-col gap-4 rounded-2xl bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-700 text-white">
                  <Icon size={20} />
                </span>
                <p className="font-display text-base font-semibold text-ink-900">{title}</p>
                <p className="text-sm leading-relaxed text-ink-500">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Membership Categories" title="Two stages of membership" align="center" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {membershipCategories.map((category) => (
              <div key={category.code} className="rounded-3xl border border-ink-100 p-8">
                <span className="rounded-full bg-emerald-50 px-3 py-1 font-ui text-xs font-semibold uppercase tracking-[0.1em] text-emerald-800">
                  {category.code}
                </span>
                <p className="mt-4 font-display text-xl font-semibold text-ink-900">{category.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{category.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Registration Process */}
      <section className="bg-emerald-50/50 py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="How to Apply" title="Registration process" align="center" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {membershipProcess.map((step, index) => (
              <div key={step.title} className="flex flex-col gap-3 rounded-2xl bg-white p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 font-ui text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <p className="font-display text-[15px] font-semibold text-ink-900">{step.title}</p>
                <p className="text-sm leading-relaxed text-ink-500">{step.description}</p>
              </div>
            ))}
          </div>
          <Link href="/apply" className={cn(buttonVariants({ size: "lg", className: "mx-auto" }))}>
            Start Your Application <ArrowUpRight />
          </Link>
        </Container>
      </section>

      {/* FAQs */}
      <section className="py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="FAQs" title="Common questions about membership" />
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion items={membershipFaqs} />
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
