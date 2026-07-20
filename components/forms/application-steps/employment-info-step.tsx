import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { ApplicationFormValues, ApplicationFormErrors } from "@/lib/application-form";

export function EmploymentInfoStep({
  values,
  errors,
  onChange,
}: {
  values: ApplicationFormValues;
  errors: ApplicationFormErrors;
  onChange: <K extends keyof ApplicationFormValues>(key: K, value: ApplicationFormValues[K]) => void;
}) {
  const requiresEmployer =
    values.employmentStatus === "Employed" || values.employmentStatus === "Self-Employed";

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <FormField id="employmentStatus" label="Employment Status" required error={errors.employmentStatus}>
        <Select
          id="employmentStatus"
          value={values.employmentStatus}
          onChange={(e) => onChange("employmentStatus", e.target.value)}
        >
          <option value="">Select…</option>
          <option>Employed</option>
          <option>Self-Employed</option>
          <option>Student</option>
          <option>Retired</option>
        </Select>
      </FormField>
      {requiresEmployer && (
        <FormField id="employerName" label="Employer / Business Name" required error={errors.employerName}>
          <Input
            id="employerName"
            value={values.employerName}
            onChange={(e) => onChange("employerName", e.target.value)}
          />
        </FormField>
      )}
    </div>
  );
}
