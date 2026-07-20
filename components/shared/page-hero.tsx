import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        tone === "dark" ? "bg-emerald-900" : "bg-emerald-50/40"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 -top-40 h-[420px]",
          tone === "dark"
            ? "bg-[radial-gradient(60%_60%_at_50%_0%,_rgba(201,162,39,0.12),_transparent)]"
            : "bg-[radial-gradient(60%_60%_at_50%_0%,_var(--color-emerald-100),_transparent)]"
        )}
        aria-hidden
      />
      <Container className="relative flex flex-col gap-5 py-16 md:py-20">
        <Badge tone={tone === "dark" ? "inverse" : "emerald"}>{eyebrow}</Badge>
        <h1
          className={cn(
            "max-w-2xl text-balance font-display text-4xl font-semibold leading-[1.1] md:text-5xl",
            tone === "dark" ? "text-white" : "text-ink-900"
          )}
        >
          {title}
        </h1>
        {description && (
          <p
            className={cn(
              "max-w-xl text-balance text-lg leading-relaxed",
              tone === "dark" ? "text-emerald-50/75" : "text-ink-500"
            )}
          >
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
