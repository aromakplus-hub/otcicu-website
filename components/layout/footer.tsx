import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { footerNav, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Lucide dropped brand/logo icons; small inline marks keep the footer dependency-free. */
function FacebookMark() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7c-.27-.04-1.2-.12-2.28-.12-2.25 0-3.8 1.37-3.8 3.9v2.4H8v3.1h2.62V21h2.88Z" />
    </svg>
  );
}
function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="16.85" cy="7.15" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function XMark() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M4 4h4.2l4 5.3L16.8 4H20l-6.1 7.6L20.4 20h-4.2l-4.4-5.8L6.1 20H3l6.5-8.1L4 4Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-50">
      <Container className="grid grid-cols-1 gap-12 py-16 md:grid-cols-12">
        <div className="flex flex-col gap-4 md:col-span-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500 font-display text-base font-bold text-emerald-950">
              OC
            </span>
            <span className="font-display text-lg font-semibold text-white">
              {siteConfig.name}
            </span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-emerald-100/70">
            {siteConfig.description}
          </p>
          <p className="font-display text-sm italic text-gold-400">
            &ldquo;{siteConfig.slogan}&rdquo;
          </p>
          <div className="flex gap-3 pt-2">
            {[
              { Mark: FacebookMark, href: siteConfig.social.facebook, label: "Facebook" },
              { Mark: InstagramMark, href: siteConfig.social.instagram, label: "Instagram" },
              { Mark: XMark, href: siteConfig.social.x, label: "X (Twitter)" },
            ].map(({ Mark, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-emerald-50 transition-colors hover:bg-gold-500 hover:text-emerald-950"
              >
                <Mark />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Cooperative" className="md:col-span-2">
          <h3 className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200/70">
            Cooperative
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {footerNav.cooperative.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-emerald-100/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services" className="md:col-span-2">
          <h3 className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200/70">
            Services
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {footerNav.services.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-emerald-100/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h3 className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200/70">
            Get in Touch
          </h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-emerald-100/80">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold-400" />
              {siteConfig.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="shrink-0 text-gold-400" />
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="shrink-0 text-gold-400" />
              {siteConfig.email ? (
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              ) : (
                <span className="text-emerald-100/50">Coming soon</span>
              )}
            </li>
          </ul>
          <Link
            href="/apply"
            className={cn(buttonVariants({ variant: "gold", size: "sm", className: "mt-5" }))}
          >
            Apply for Membership
          </Link>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-emerald-100/60 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.
          </p>
          <p>Registered under the Nigerian Cooperative Societies Act.</p>
        </Container>
      </div>
    </footer>
  );
}
