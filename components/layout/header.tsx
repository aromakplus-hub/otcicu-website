"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { mainNav, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-white/90 backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-emerald-700 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-700 font-display text-base font-bold text-white">
            OC
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-[15px] font-semibold text-ink-900">
              {siteConfig.name}
            </span>
            <span className="font-ui text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">
              Cooperative Union
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-ui rounded-full px-4 py-2 text-[14px] font-medium text-ink-700 transition-colors hover:bg-emerald-50 hover:text-emerald-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/contact" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
            Contact Us
          </Link>
          <Link href="/apply" className={cn(buttonVariants({ size: "sm" }))}>
            Apply for Membership <ArrowUpRight />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink-900 lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      <div
        className={cn(
          "grid overflow-hidden border-t border-ink-100 bg-white transition-[grid-template-rows] duration-300 lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0">
          <Container className="flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-ui rounded-xl px-4 py-3 text-[15px] font-medium text-ink-800 hover:bg-emerald-50"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/apply" onClick={() => setOpen(false)} className={cn(buttonVariants({ className: "mt-2 w-full" }))}>
              Apply for Membership
            </Link>
          </Container>
        </div>
      </div>
    </header>
  );
}
