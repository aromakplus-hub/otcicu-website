import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function StepIndicator({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) {
  return (
    <ol className="flex items-start gap-1 sm:gap-2" aria-label="Application progress">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isComplete = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <li key={label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full items-center">
              <span
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-ui text-xs font-semibold transition-colors",
                  isComplete && "bg-emerald-700 text-white",
                  isCurrent && "bg-emerald-700 text-white ring-4 ring-emerald-100",
                  !isComplete && !isCurrent && "bg-ink-100 text-ink-500"
                )}
              >
                {isComplete ? <Check size={14} /> : stepNumber}
              </span>
              {index < steps.length - 1 && (
                <span
                  className={cn(
                    "mx-1 h-0.5 flex-1 rounded-full",
                    isComplete ? "bg-emerald-700" : "bg-ink-100"
                  )}
                  aria-hidden
                />
              )}
            </div>
            <span
              className={cn(
                "hidden text-center text-[11px] font-medium leading-tight sm:block",
                isCurrent ? "text-emerald-800" : "text-ink-500"
              )}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
