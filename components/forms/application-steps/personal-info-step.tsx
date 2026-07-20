import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { ApplicationFormValues, ApplicationFormErrors } from "@/lib/application-form";

export function PersonalInfoStep({
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
      <FormField id="firstName" label="First Name" required error={errors.firstName}>
        <Input
          id="firstName"
          value={values.firstName}
          onChange={(e) => onChange("firstName", e.target.value)}
          autoComplete="given-name"
        />
      </FormField>
      <FormField id="lastName" label="Last Name" required error={errors.lastName}>
        <Input
          id="lastName"
          value={values.lastName}
          onChange={(e) => onChange("lastName", e.target.value)}
          autoComplete="family-name"
        />
      </FormField>
      <FormField id="dateOfBirth" label="Date of Birth" required error={errors.dateOfBirth} hint="You must be at least 18 years old.">
        <Input
          id="dateOfBirth"
          type="date"
          value={values.dateOfBirth}
          onChange={(e) => onChange("dateOfBirth", e.target.value)}
        />
      </FormField>
      <FormField id="gender" label="Gender" required error={errors.gender}>
        <Select id="gender" value={values.gender} onChange={(e) => onChange("gender", e.target.value)}>
          <option value="">Select…</option>
          <option>Female</option>
          <option>Male</option>
          <option>Prefer not to say</option>
        </Select>
      </FormField>
    </div>
  );
}
