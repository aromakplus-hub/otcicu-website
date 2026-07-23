import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, ShieldCheck, TrendingUp, CalendarClock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { CtaSection } from "@/components/shared/cta-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { savingsAccounts, savingsFaqs } from "@/lib/data/savings";

export const metadata: Metadata = {
  title: "Savings",
  description:
    "Explore Otitoloju C.I.C.U's Share & Savings, Special Savings, and Investment accounts, and how monthly contributions work.",
};

const whySave = [
  { icon: ShieldCheck, title: "Protected Balances", description: "Core savings are safeguarded — no self-debit on your Share & Savings Account." },
  { icon: TrendingUp, title: "Steady Growth", description: "Consistent monthly contributions compound into meaningful savings over time." },
  { icon: CalendarClock, title: "Automatic Discipline", description: "Contributions process automatically each month, removing the guesswork." },
];

export default function SavingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Savings"
        title="Save with structure. Grow with confidence."
        description="Every member holds a Share & Savings, Special Savings, and — on confirmation — an Investment Account, each built for a different purpose."
      />

      {/* Overview / account types */}
      <section className="py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Savings Overview" title="Three accounts, one steady plan" align="center" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {savingsAccounts.map((account) => (
              <div key={account.code} className="flex flex-col gap-4 rounded-3xl border border-ink-100 p-7">
                <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 font-ui text-xs font-semibold uppercase tracking-[0.1em] text-emerald-800">
                  {account.code}
                </span>
                <p className="font-display text-lg font-semibold text-ink-900">{account.name}</p>
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-gold-600">
                  {account.audience}
                </p>
                <p className="text-sm leading-relaxed text-ink-500">{account.description}</p>
                <ul className="mt-2 flex flex-col gap-2.5">
                  {account.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-ink-700">
                      <Check size={15} className="mt-0.5 shrink-0 text-emerald-700" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why save with us */}
      <section className="bg-emerald-50/50 py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Why Save With Us" title="Built for consistency, not speculation" align="center" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {whySave.map(({ icon: Icon, title, description }) => (
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

      {/* Contribution process */}
      <section className="py-24">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Contribution Process"
              title="How monthly contributions work"
              description="Contributions are split automatically between your Share & Savings and the cooperative's Building & Development Fund, and posted through a fully auditable double-entry journal."
            />
          </div>
          <div className="flex flex-col gap-4 lg:col-span-7">
            {[
              "Choose your payment channel — card, bank transfer, USSD, or payroll deduction",
              "Receive a reminder a few days before your contribution due date",
              "Contribution is processed and allocated automatically each month",
              "View your updated balance and history anytime in the Member Portal",
            ].map((step, index) => (
              <div key={step} className="flex items-start gap-4 rounded-2xl border border-ink-100 p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 font-ui text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <span className="pt-1 text-sm leading-relaxed text-ink-700">{step}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="bg-emerald-50/50 py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="FAQs" title="Common questions about savings" />
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion items={savingsFaqs} />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="flex justify-center">
          <Link href="/apply" className={cn(buttonVariants({ size: "lg" }))}>
            Open Your Savings Accounts <ArrowUpRight />
          </Link>
        </Container>
      </section>

      <CtaSection
        title="Start building your savings today"
        description="Membership takes minutes to apply for — your accounts are created automatically on approval."
      />
    </>
  );
}
