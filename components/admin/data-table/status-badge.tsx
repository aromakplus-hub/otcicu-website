import { cn } from "@/lib/utils";
import type { ContentStatus } from "@/types/database.types";

const styles: Record<ContentStatus, string> = {
  draft: "bg-ink-100 text-ink-700",
  published: "bg-emerald-100 text-emerald-800",
  hidden: "bg-gold-100 text-gold-700",
  archived: "bg-red-50 text-red-700",
};

export function StatusBadge({ status }: { status: ContentStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
        styles[status]
      )}
    >
      {status}
    </span>
  );
}
