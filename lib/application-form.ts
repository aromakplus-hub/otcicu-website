export type ApplicationFormValues = {
  // Step 1 — Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  // Step 2 — Contact Information
  phone: string;
  email: string;
  address: string;
  // Step 3 — Employment Information
  employmentStatus: string;
  employerName: string;
  // Step 4 — Next of Kin
  nokName: string;
  nokRelationship: string;
  nokPhone: string;
  // Step 5 — Identification Details
  nin: string;
  bvn: string;
  // Step 6 — Declaration
  declarationAccepted: boolean;
};

export type ApplicationFormErrors = Partial<Record<keyof ApplicationFormValues, string>>;

export const initialApplicationValues: ApplicationFormValues = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  phone: "",
  email: "",
  address: "",
  employmentStatus: "",
  employerName: "",
  nokName: "",
  nokRelationship: "",
  nokPhone: "",
  nin: "",
  bvn: "",
  declarationAccepted: false,
};

export const applicationSteps = [
  "Personal Information",
  "Contact Information",
  "Employment Information",
  "Next of Kin",
  "Identification",
  "Declaration",
];

function isAtLeast18(dateOfBirth: string) {
  const dob = new Date(dateOfBirth);
  if (Number.isNaN(dob.getTime())) return false;
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  return dob <= eighteenYearsAgo;
}

export function validateStep(
  step: number,
  values: ApplicationFormValues
): ApplicationFormErrors {
  const errors: ApplicationFormErrors = {};

  if (step === 1) {
    if (!values.firstName.trim()) errors.firstName = "First name is required.";
    if (!values.lastName.trim()) errors.lastName = "Last name is required.";
    if (!values.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required.";
    } else if (!isAtLeast18(values.dateOfBirth)) {
      errors.dateOfBirth = "You must be at least 18 years old to apply.";
    }
    if (!values.gender) errors.gender = "Please select a gender.";
  }

  if (step === 2) {
    if (!values.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!/^\+?\d{10,14}$/.test(values.phone.replace(/\s/g, ""))) {
      errors.phone = "Enter a valid phone number, e.g. +234XXXXXXXXXX.";
    }
    if (!values.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!values.address.trim()) errors.address = "Residential address is required.";
  }

  if (step === 3) {
    if (!values.employmentStatus) errors.employmentStatus = "Please select an employment status.";
    if (
      (values.employmentStatus === "Employed" || values.employmentStatus === "Self-Employed") &&
      !values.employerName.trim()
    ) {
      errors.employerName = "Employer or business name is required.";
    }
  }

  if (step === 4) {
    if (!values.nokName.trim()) errors.nokName = "Next of kin name is required.";
    if (!values.nokRelationship.trim()) errors.nokRelationship = "Relationship is required.";
    if (!values.nokPhone.trim()) {
      errors.nokPhone = "Next of kin phone number is required.";
    } else if (values.nokPhone.replace(/\s/g, "") === values.phone.replace(/\s/g, "")) {
      errors.nokPhone = "Next of kin phone must differ from your own.";
    }
  }

  if (step === 5) {
    if (!/^\d{11}$/.test(values.nin.trim())) errors.nin = "NIN must be exactly 11 digits.";
    if (!/^\d{11}$/.test(values.bvn.trim())) errors.bvn = "BVN must be exactly 11 digits.";
  }

  if (step === 6) {
    if (!values.declarationAccepted) {
      errors.declarationAccepted = "You must confirm the declaration to submit your application.";
    }
  }

  return errors;
}
