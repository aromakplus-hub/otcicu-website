import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Container } from "@/components/ui/container";
import { CtaSection } from "@/components/shared/cta-section";
import { newsItems } from "@/lib/data/news";

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = newsItems.find((n) => n.id === slug);
  return {
    title: item?.title ?? "News",
    description: item?.excerpt,
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = newsItems.find((n) => n.id === slug);

  if (!item) notFound();

  return (
    <>
      <article className="py-20">
        <Container className="mx-auto max-w-3xl">
          <Link
            href="/news"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            <ArrowLeft size={16} /> Back to News
          </Link>

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-emerald-800">
            {item.category}
          </span>

          <h1 className="mt-5 text-balance font-display text-3xl font-semibold leading-tight text-ink-900 md:text-4xl">
            {item.title}
          </h1>

          <div className="mt-4 flex items-center gap-1.5 text-sm text-ink-500">
            <CalendarDays size={15} />
            {formatDate(item.date)}
          </div>

          <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-ink-700">
            {item.body ? (
              <p>{item.body}</p>
            ) : (
              <>
                <p>{item.excerpt}</p>
                <p className="text-sm italic text-ink-500">
                  Placeholder article body — replace with the full announcement text once available.
                  Full articles will support rich text, embedded images, and downloadable notices (e.g.
                  AGM agendas) in a future content update.
                </p>
              </>
            )}
          </div>
        </Container>
      </article>

      <CtaSection
        title="Have a question about this announcement?"
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="View All News"
        secondaryHref="/news"
      />
    </>
  );
}
