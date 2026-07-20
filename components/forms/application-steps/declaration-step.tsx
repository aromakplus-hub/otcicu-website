import type { ApplicationFormValues, ApplicationFormErrors } from "@/lib/application-form";

const summaryRows: { label: string; key: keyof ApplicationFormValues }[] = [
  { label: "Full Name", key: "firstName" },
  { label: "Email", key: "email" },
  { label: "Phone", key: "phone" },
  { label: "Employment Status", key: "employmentStatus" },
  { label: "Next of Kin", key: "nokName" },
];

export function DeclarationStep({
  values,
  errors,
  onChange,
}: {
  values: ApplicationFormValues;
  errors: ApplicationFormErrors;
  onChange: <K extends keyof ApplicationFormValues>(key: K, value: ApplicationFormValues[K]) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-ink-100 p-5">
        <p className="mb-3 font-display text-sm font-semibold text-ink-900">Review your details</p>
        <dl className="flex flex-col gap-2 text-sm">
          {summaryRows.map((row) => (
            <div key={row.key} className="flex justify-between gap-4 border-b border-ink-100 pb-2 last:border-0">
              <dt className="text-ink-500">{row.label}</dt>
              <dd className="text-right font-medium text-ink-800">
                {row.key === "firstName" ? `${values.firstName} ${values.lastName}` : String(values[row.key] || "—")}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <label className="flex items-start gap-3 rounded-2xl bg-emerald-50 p-5">
        <input
          type="checkbox"
          checked={values.declarationAccepted}
          onChange={(e) => onChange("declarationAccepted", e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-ink-300 text-emerald-700 focus:ring-2 focus:ring-emerald-600/30"
          aria-invalid={!!errors.declarationAccepted}
        />
        <span className="text-sm leading-relaxed text-ink-700">
          I declare that the information provided in this application is accurate and complete to
          the best of my knowledge, and I accept the cooperative&rsquo;s membership terms and
          conditions.
        </span>
      </label>
      {errors.declarationAccepted && (
        <p role="alert" className="-mt-3 text-xs font-medium text-red-600">
          {errors.declarationAccepted}
        </p>
      )}
    </div>
  );
}
