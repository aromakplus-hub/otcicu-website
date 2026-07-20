import Link from "next/link";
import { ArrowUpRight, Handshake, Vote, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const principles = [
  {
    icon: Vote,
    title: "One Member, One Vote",
    description: "Every member has an equal voice in cooperative decisions at the AGM.",
  },
  {
    icon: Handshake,
    title: "Mutual Benefit",
    description: "Surplus is shared fairly, so growth benefits every contributing member.",
  },
  {
    icon: ShieldCheck,
    title: "Full Transparency",
    description: "Every contribution and disbursement is recorded and independently audited.",
  },
];

export function AboutPreview() {
  return (
    <section className="py-24">
      <Container className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-900">
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <p className="font-display text-2xl font-semibold text-white">
                14 years of collective growth
              </p>
              <p className="mt-2 text-sm text-emerald-100/80">
                Built by members, for members — one contribution at a time.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:col-span-7">
          <SectionHeading
            eyebrow="About the Cooperative"
            title="A financial home owned by the people who use it"
            description="Otitoloju C.I.C.U pools member resources into collective savings and interest-free credit, guided by cooperative principles of voluntary membership, democratic control, and community wellbeing."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {principles.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex flex-col gap-3 rounded-2xl border border-ink-100 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  <Icon size={18} />
                </span>
                <p className="font-display text-[15px] font-semibold text-ink-900">{title}</p>
                <p className="text-sm leading-relaxed text-ink-500">{description}</p>
              </div>
            ))}
          </div>

          <Link href="/about" className={cn(buttonVariants({ variant: "outline", className: "w-fit" }))}>
            Read Our Full Story <ArrowUpRight />
          </Link>
        </div>
      </Container>
    </section>
  );
}
