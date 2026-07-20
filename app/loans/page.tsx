import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { CtaSection } from "@/components/shared/cta-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { loanProducts, loanApplicationSteps, loanFaqs } from "@/lib/data/loans";

export const metadata: Metadata = {
  title: "Loans",
  description:
    "Explore Otitoloju C.I.C.U's interest-free loan products, eligibility requirements, and application process.",
};

export default function LoansPage() {
  return (
    <>
      <PageHero
        eyebrow="Loans"
        title="Five loan products. Zero interest."
        description="Borrow against your standing in the cooperative — with a transparent processing fee, never interest."
      />

      {/* Loan products */}
      <section className="py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Loan Products" title="Choose the facility that fits your need" align="center" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {loanProducts.map((product) => (
              <div key={product.name} className="flex flex-col gap-4 rounded-3xl border border-ink-100 p-7">
                <p className="font-display text-lg font-semibold text-ink-900">{product.name}</p>
                <p className="text-sm leading-relaxed text-ink-500">{product.summary}</p>
                <dl className="mt-2 flex flex-col gap-2 text-sm">
                  <div className="flex items-start gap-2">
                    <dt className="w-32 shrink-0 font-medium text-ink-700">Eligibility</dt>
                    <dd className="text-ink-500">{product.eligibility}</dd>
                  </div>
                  <div className="flex items-start gap-2">
                    <dt className="w-32 shrink-0 font-medium text-ink-700">Guarantors</dt>
                    <dd className="text-ink-500">{product.guarantors}</dd>
                  </div>
                  <div className="flex items-start gap-2">
                    <dt className="w-32 shrink-0 font-medium text-ink-700">Processing</dt>
                    <dd className="text-ink-500">{product.turnaround}</dd>
                  </div>
                </dl>
              </div>
            ))}
            <div className="flex flex-col justify-center gap-3 rounded-3xl bg-emerald-900 p-7 text-emerald-50">
              <Users size={22} className="text-gold-400" />
              <p className="font-display text-lg font-semibold">Not sure which loan fits?</p>
              <p className="text-sm leading-relaxed text-emerald-100/80">
                Speak with your Account Officer — they&rsquo;ll help match your need to the right product.
              </p>
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "gold", size: "sm", className: "mt-2 w-fit" }))}
              >
                Talk to an Officer <ArrowUpRight />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Application process */}
      <section className="bg-emerald-50/50 py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Application Process" title="From application to disbursement" align="center" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loanApplicationSteps.map((step, index) => (
              <div key={step.title} className="flex flex-col gap-3 rounded-2xl bg-white p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 font-ui text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <p className="font-display text-[15px] font-semibold text-ink-900">{step.title}</p>
                <p className="text-sm leading-relaxed text-ink-500">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Repayment info */}
      <section className="py-24">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Repayment"
              title="Clear repayment terms, from day one"
              description="Your loan offer shows the exact monthly instalment, tenor, and total repayable before you accept — no surprises later."
            />
          </div>
          <div className="lg:col-span-7">
            <ul className="flex flex-col gap-4">
              {[
                "Monthly instalment is fixed for the life of the loan",
                "First repayment is due 30 days after disbursement",
                "Repayments can be made via payment gateway, bank transfer, or payroll deduction",
                "Missed repayments trigger member and guarantor notifications, not immediate penalties",
              ].map((point) => (
                <li key={point} className="rounded-2xl border border-ink-100 p-5 text-sm leading-relaxed text-ink-700">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="bg-emerald-50/50 py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="FAQs" title="Common questions about loans" />
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion items={loanFaqs} />
          </div>
        </Container>
      </section>

      <CtaSection
        title="Confirmed members can apply for a loan today"
        description="Not yet a Confirmed Member? Membership grows into full loan eligibility within six months."
        primaryLabel="Become a Member"
        secondaryLabel="View Membership Categories"
        secondaryHref="/membership"
      />
    </>
  );
}
