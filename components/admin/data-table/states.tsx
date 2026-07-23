import { AlertTriangle, Inbox } from "lucide-react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-ink-200 py-16 text-center">
      <Inbox size={28} className="text-ink-300" />
      <p className="font-display text-base font-semibold text-ink-900">{title}</p>
      {description && <p className="max-w-sm text-sm text-ink-500">{description}</p>}
      {action}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-red-100 bg-red-50 py-16 text-center">
      <AlertTriangle size={28} className="text-red-600" />
      <p className="font-display text-base font-semibold text-red-800">Something went wrong</p>
      <p className="max-w-sm text-sm text-red-700">{message}</p>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-2" role="status" aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-14 w-full animate-pulse rounded-xl bg-ink-100/70" />
      ))}
    </div>
  );
}
