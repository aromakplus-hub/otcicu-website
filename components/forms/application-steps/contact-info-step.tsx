import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ApplicationFormValues, ApplicationFormErrors } from "@/lib/application-form";

export function ContactInfoStep({
  values,
  errors,
  onChange,
}: {
  values: ApplicationFormValues;
  errors: ApplicationFormErrors;
  onChange: <K extends keyof ApplicationFormValues>(key: K, value: ApplicationFormValues[K]) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="phone" label="Phone Number" required error={errors.phone} hint="Format: +234XXXXXXXXXX">
          <Input
            id="phone"
            type="tel"
            value={values.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+234"
            autoComplete="tel"
          />
        </FormField>
        <FormField id="email" label="Email Address" required error={errors.email}>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => onChange("email", e.target.value)}
            autoComplete="email"
          />
        </FormField>
      </div>
      <FormField
        id="address"
        label="Residential Address"
        required
        error={errors.address}
        hint="Include house number, street, LGA, and state."
      >
        <Textarea
          id="address"
          value={values.address}
          onChange={(e) => onChange("address", e.target.value)}
          autoComplete="street-address"
        />
      </FormField>
    </div>
  );
}
