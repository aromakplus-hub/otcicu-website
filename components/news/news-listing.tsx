"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { newsItems, newsCategories, type NewsItem } from "@/lib/data/news";

const PAGE_SIZE = 6;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link
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
  );
}

export function NewsListing() {
  const [category, setCategory] = useState<(typeof newsCategories)[number]>("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const featured = newsItems.find((item) => item.featured);

  const filtered = useMemo(() => {
    return newsItems
      .filter((item) => (category === "All" ? true : item.category === category))
      .filter((item) =>
        query.trim() ? item.title.toLowerCase().includes(query.trim().toLowerCase()) : true
      );
  }, [category, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-14">
      {featured && category === "All" && !query && (
        <Link
          href={`/news/${featured.id}`}
          className="group flex flex-col gap-6 overflow-hidden rounded-3xl bg-emerald-900 p-8 text-emerald-50 md:flex-row md:items-center md:p-10"
        >
          <div className="flex flex-1 flex-col gap-4">
            <span className="w-fit rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-emerald-950">
              Featured &middot; {featured.category}
            </span>
            <p className="font-display text-2xl font-semibold leading-snug md:text-3xl">
              {featured.title}
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-emerald-100/80">
              {featured.excerpt}
            </p>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-gold-400">
              Read the full announcement <ArrowUpRight size={15} />
            </span>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-emerald-100/60 md:self-start">
            <CalendarDays size={13} />
            {formatDate(featured.date)}
          </span>
        </Link>
      )}

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {newsCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
              className={cn(
                "font-ui rounded-full px-4 py-2 text-sm font-medium transition-colors",
                category === cat
                  ? "bg-emerald-700 text-white"
                  : "bg-emerald-50 text-ink-700 hover:bg-emerald-100"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <label className="relative w-full sm:w-64">
          <span className="sr-only">Search news</span>
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search news…"
            className="font-ui h-11 w-full rounded-full border border-ink-300/70 bg-white pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-300 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
          />
        </label>
      </div>

      {paginated.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {paginated.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-ink-200 p-10 text-center text-sm text-ink-500">
          No announcements match your search. Try a different category or keyword.
        </p>
      )}

      {totalPages > 1 && (
        <nav aria-label="News pagination" className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : undefined}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full font-ui text-sm font-medium",
                page === i + 1 ? "bg-emerald-700 text-white" : "bg-emerald-50 text-ink-700 hover:bg-emerald-100"
              )}
            >
              {i + 1}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
