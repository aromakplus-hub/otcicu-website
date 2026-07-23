import Link from "next/link";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function SortableHeader({
  label,
  sortKey,
  currentSort,
  currentOrder,
  buildHref,
}: {
  label: string;
  sortKey: string;
  currentSort: string;
  currentOrder: "asc" | "desc";
  buildHref: (sort: string, order: "asc" | "desc") => string;
}) {
  const isActive = currentSort === sortKey;
  const nextOrder = isActive && currentOrder === "asc" ? "desc" : "asc";

  return (
    <Link
      href={buildHref(sortKey, nextOrder)}
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.06em] hover:text-emerald-700",
        isActive ? "text-emerald-700" : "text-ink-500"
      )}
    >
      {label}
      {isActive ? (
        currentOrder === "asc" ? <ArrowUp size={13} /> : <ArrowDown size={13} />
      ) : (
        <ArrowUpDown size={13} className="opacity-40" />
      )}
    </Link>
  );
}
