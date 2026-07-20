import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const panels = [
  {
    tone: "light" as const,
    label: "Savings",
    title: "Three accounts, one steady plan",
    description:
      "Every member holds a Share & Savings, Special Savings, and Investment account — each built for a different purpose.",
    points: [
      "Share & Savings — your core, protected balance",
      "Special Savings — flexible, everyday transactions",
      "Investment Account — grows once you're a Confirmed member",
    ],
    href: "/savings",
    cta: "Explore Savings Plans",
  },
  {
    tone: "dark" as const,
    label: "Loans",
    title: "Five loan products, zero interest",
    description:
      "From emergencies to education, borrow against your standing in the cooperative — with fees, not interest.",
    points: [
      "Interest-Free & Emergency Loans for immediate needs",
      "Development & Education Loans for long-term goals",
      "Salary Advance for payroll-registered members",
    ],
    href: "/loans",
    cta: "Explore Loan Products",
  },
];

export function SavingsLoansOverview() {
  return (
    <section className="py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="What We Offer"
          title="Save with discipline. Borrow without interest."
          align="center"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {panels.map((panel) => (
            <div
              key={panel.label}
              className={cn(
                "flex flex-col gap-6 rounded-3xl p-9",
                panel.tone === "dark"
                  ? "bg-emerald-900 text-emerald-50"
                  : "bg-emerald-50 text-ink-900"
              )}
            >
              <span
                className={cn(
                  "w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
                  panel.tone === "dark" ? "bg-gold-500 text-emerald-950" : "bg-emerald-700 text-white"
                )}
              >
                {panel.label}
              </span>
              <h3 className="font-display text-2xl font-semibold leading-tight">{panel.title}</h3>
              <p
                className={cn(
                  "text-base leading-relaxed",
                  panel.tone === "dark" ? "text-emerald-100/80" : "text-ink-500"
                )}
              >
                {panel.description}
              </p>
              <ul className="flex flex-col gap-3">
                {panel.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm">
                    <Check
                      size={16}
                      className={cn(
                        "mt-0.5 shrink-0",
                        panel.tone === "dark" ? "text-gold-400" : "text-emerald-700"
                      )}
                    />
                    <span className={panel.tone === "dark" ? "text-emerald-50/90" : "text-ink-700"}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href={panel.href}
                className={cn(
                  buttonVariants({
                    variant: panel.tone === "dark" ? "gold" : "primary",
                    className: "mt-2 w-fit",
                  })
                )}
              >
                {panel.cta} <ArrowUpRight />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
