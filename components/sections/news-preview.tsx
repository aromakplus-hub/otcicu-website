import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { newsItems } from "@/lib/data/news";
import { cn } from "@/lib/utils";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function NewsPreview() {
  return (
    <section className="py-24">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Stay Informed"
            title="News & Announcements"
            description="Updates from the cooperative — meetings, disbursements, and milestones."
          />
          <Link href="/news" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
            View All News <ArrowUpRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {newsItems.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="group flex flex-col gap-4 rounded-2xl border border-ink-100 p-6 transition-colors hover:border-emerald-200 hover:bg-emerald-50/40"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-emerald-800">
                  {item.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-ink-500">
                  <CalendarDays size={13} />
                  {formatDate(item.date)}
                </span>
              </div>
              <p className="font-display text-lg font-semibold leading-snug text-ink-900 group-hover:text-emerald-800">
                {item.title}
              </p>
              <p className="text-sm leading-relaxed text-ink-500">{item.excerpt}</p>
              <span className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                Read more <ArrowUpRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
