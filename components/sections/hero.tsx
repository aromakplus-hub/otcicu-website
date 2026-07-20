import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ContributionRing } from "@/components/shared/contribution-ring";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-emerald-50/40">
      <div
        className="pointer-events-none absolute inset-x-0 -top-40 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,_var(--color-emerald-100),_transparent)]"
        aria-hidden
      />
      <Container className="relative grid grid-cols-1 items-center gap-14 py-20 md:py-28 lg:grid-cols-12">
        <div className="flex flex-col items-start gap-6 lg:col-span-7">
          <Badge>Registered Cooperative &middot; est. under NCSA</Badge>
          <h1 className="text-balance font-display text-4xl font-semibold leading-[1.08] text-ink-900 sm:text-5xl lg:text-[3.4rem]">
            One cooperative,{" "}
            <span className="text-emerald-700">many contributions</span>,
            shared prosperity.
          </h1>
          <p className="max-w-xl text-balance text-lg leading-relaxed text-ink-500">
            OTITOLOJU C.I.C.U helps members save consistently, borrow without
            interest, and build lasting financial security together —{" "}
            <em className="font-display not-italic text-ink-700">
              &ldquo;Fun Iserere Temi Tire&rdquo;
            </em>
            , for the benefit of mine and yours.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/apply" className={cn(buttonVariants({ size: "lg" }))}>
              Become a Member <ArrowUpRight />
            </Link>
            <Link
              href="/about"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Learn How It Works
            </Link>
          </div>
          <div className="flex items-center gap-2 pt-4 text-sm text-ink-500">
            <ShieldCheck size={18} className="text-emerald-700" />
            Regulated, member-owned, and fully transparent.
          </div>
        </div>

        <div className="relative flex items-center justify-center lg:col-span-5">
          <ContributionRing className="w-full max-w-[420px]" />
        </div>
      </Container>
    </section>
  );
}
