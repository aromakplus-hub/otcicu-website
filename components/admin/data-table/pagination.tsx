import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pagination({
  page,
  totalPages,
  buildHref,
}: {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-between border-t border-ink-100 px-1 pt-4">
      <p className="text-sm text-ink-500">
        Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <Link
          href={buildHref(Math.max(1, page - 1))}
          aria-disabled={page <= 1}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-700 hover:bg-emerald-50",
            page <= 1 && "pointer-events-none opacity-40"
          )}
        >
          <ChevronLeft size={16} />
        </Link>
        <Link
          href={buildHref(Math.min(totalPages, page + 1))}
          aria-disabled={page >= totalPages}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-700 hover:bg-emerald-50",
            page >= totalPages && "pointer-events-none opacity-40"
          )}
        >
          <ChevronRight size={16} />
        </Link>
      </div>
    </nav>
  );
}
