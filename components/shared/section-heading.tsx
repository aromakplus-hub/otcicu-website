import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "emerald",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "emerald" | "gold" | "inverse";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      {eyebrow && <Badge tone={tone}>{eyebrow}</Badge>}
      <h2 className="text-balance text-3xl font-semibold leading-[1.15] text-ink-900 md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-balance text-base leading-relaxed text-ink-500 md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
