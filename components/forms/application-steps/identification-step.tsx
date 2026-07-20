import { UploadCloud } from "lucide-react";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import type { ApplicationFormValues, ApplicationFormErrors } from "@/lib/application-form";

function UploadPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-ui text-sm font-medium text-ink-800">{label}</span>
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink-200 px-4 py-8 text-center">
        <UploadCloud size={22} className="text-ink-300" aria-hidden />
        <p className="text-xs text-ink-500">
          Document upload will be enabled once backend storage is connected
        </p>
      </div>
    </div>
  );
}

export function IdentificationStep({
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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="nin" label="National Identification Number (NIN)" required error={errors.nin} hint="11 digits">
          <Input
            id="nin"
            inputMode="numeric"
            maxLength={11}
            value={values.nin}
            onChange={(e) => onChange("nin", e.target.value.replace(/\D/g, ""))}
          />
        </FormField>
        <FormField id="bvn" label="Bank Verification Number (BVN)" required error={errors.bvn} hint="11 digits">
          <Input
            id="bvn"
            inputMode="numeric"
            maxLength={11}
            value={values.bvn}
            onChange={(e) => onChange("bvn", e.target.value.replace(/\D/g, ""))}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <UploadPlaceholder label="National ID Upload" />
        <UploadPlaceholder label="Utility Bill Upload" />
        <UploadPlaceholder label="Passport Photograph" />
      </div>
      <p className="text-xs text-ink-500">
        Your NIN and BVN will be verified in real time against NIMC and NIBSS once backend
        integration is complete. For now, entries are validated for format only.
      </p>
    </div>
  );
}
