import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "emerald",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "emerald" | "gold" | "inverse";
}) {
  const tones = {
    emerald: "bg-emerald-50 text-emerald-800",
    gold: "bg-gold-100 text-gold-700",
    inverse: "bg-white/10 text-emerald-50",
  };

  return (
    <span
      className={cn(
        "font-ui inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
