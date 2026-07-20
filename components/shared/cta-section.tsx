import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function CtaSection({
  title = "Ready to save with a community that saves with you?",
  description = "Applications take a few minutes. KYC verification and account setup are handled for you once approved.",
  primaryLabel = "Apply for Membership",
  primaryHref = "/apply",
  secondaryLabel = "Talk to Us",
  secondaryHref = "/contact",
  showSlogan = true,
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  showSlogan?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-emerald-700 py-20">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl"
        aria-hidden
      />
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <h2 className="text-balance font-display text-3xl font-semibold text-white md:text-4xl">
          {title}
        </h2>
        <p className="max-w-lg text-balance text-emerald-50/80">{description}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href={primaryHref} className={cn(buttonVariants({ variant: "inverse", size: "lg" }))}>
            {primaryLabel} <ArrowUpRight />
          </Link>
          <Link
            href={secondaryHref}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "border-white/40 text-white hover:border-white hover:text-white hover:bg-white/10",
              })
            )}
          >
            {secondaryLabel}
          </Link>
        </div>
        {showSlogan && (
          <p className="pt-2 text-xs text-emerald-100/70">
            {siteConfig.slogan} — {siteConfig.sloganTranslation}
          </p>
        )}
      </Container>
    </section>
  );
}
