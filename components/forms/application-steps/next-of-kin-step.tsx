import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import type { ApplicationFormValues, ApplicationFormErrors } from "@/lib/application-form";

export function NextOfKinStep({
  values,
  errors,
  onChange,
}: {
  values: ApplicationFormValues;
  errors: ApplicationFormErrors;
  onChange: <K extends keyof ApplicationFormValues>(key: K, value: ApplicationFormValues[K]) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <FormField id="nokName" label="Next of Kin — Full Name" required error={errors.nokName}>
        <Input id="nokName" value={values.nokName} onChange={(e) => onChange("nokName", e.target.value)} />
      </FormField>
      <FormField id="nokRelationship" label="Relationship" required error={errors.nokRelationship}>
        <Input
          id="nokRelationship"
          value={values.nokRelationship}
          onChange={(e) => onChange("nokRelationship", e.target.value)}
          placeholder="e.g. Spouse, Sibling, Parent"
        />
      </FormField>
      <FormField
        id="nokPhone"
        label="Next of Kin — Phone Number"
        required
        error={errors.nokPhone}
        hint="Must be different from your own phone number."
        className="sm:col-span-2"
      >
        <Input
          id="nokPhone"
          type="tel"
          value={values.nokPhone}
          onChange={(e) => onChange("nokPhone", e.target.value)}
          placeholder="+234"
        />
      </FormField>
    </div>
  );
}
