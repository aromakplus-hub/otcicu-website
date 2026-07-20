import Link from "next/link";
import { PiggyBank, HandCoins, Smartphone, Users2, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const benefits = [
  {
    icon: PiggyBank,
    title: "Disciplined Savings",
    description: "Automatic monthly contributions build your Share & Savings balance steadily over time.",
  },
  {
    icon: HandCoins,
    title: "Interest-Free Loans",
    description: "Access five loan products with no interest — only a transparent processing fee.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Access",
    description: "View balances, apply for loans, and track contributions from your phone, anytime.",
  },
  {
    icon: Users2,
    title: "A Voice That Counts",
    description: "Confirmed members vote at the AGM and shape the cooperative's direction.",
  },
];

export function MembershipBenefits() {
  return (
    <section className="bg-emerald-50/50 py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Membership"
          title="Why members choose Otitoloju C.I.C.U"
          description="Membership opens with Guest status and, within six months of steady contributions, grows into full Confirmed status with every privilege unlocked."
          align="center"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(16,24,20,0.04),0_8px_24px_-12px_rgba(16,24,20,0.08)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-700 text-white">
                <Icon size={20} />
              </span>
              <p className="font-display text-base font-semibold text-ink-900">{title}</p>
              <p className="text-sm leading-relaxed text-ink-500">{description}</p>
            </div>
          ))}
        </div>

        <Link href="/apply" className={cn(buttonVariants({ size: "lg", className: "mx-auto" }))}>
          Start Your Application <ArrowUpRight />
        </Link>
      </Container>
    </section>
  );
}
