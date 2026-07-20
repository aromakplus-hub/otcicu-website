import { cn } from "@/lib/utils";

export function Label({
  htmlFor,
  children,
  required,
  className,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("font-ui text-sm font-medium text-ink-800", className)}
    >
      {children}
      {required && (
        <span className="ml-0.5 text-emerald-700" aria-hidden>
          *
        </span>
      )}
    </label>
  );
}
