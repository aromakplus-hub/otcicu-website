"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/ui/step-indicator";
import {
  applicationSteps,
  initialApplicationValues,
  validateStep,
  type ApplicationFormValues,
  type ApplicationFormErrors,
} from "@/lib/application-form";
import { PersonalInfoStep } from "@/components/forms/application-steps/personal-info-step";
import { ContactInfoStep } from "@/components/forms/application-steps/contact-info-step";
import { EmploymentInfoStep } from "@/components/forms/application-steps/employment-info-step";
import { NextOfKinStep } from "@/components/forms/application-steps/next-of-kin-step";
import { IdentificationStep } from "@/components/forms/application-steps/identification-step";
import { DeclarationStep } from "@/components/forms/application-steps/declaration-step";

const TOTAL_STEPS = applicationSteps.length;

/**
 * Save-ready architecture note:
 * `values` is a single flat object serializable as JSON. To wire up backend
 * persistence later, submit `values` to an API route (e.g. POST /api/v1/members/apply)
 * on final submit, and/or debounce-save it to localStorage or a draft endpoint
 * between steps — no restructuring needed.
 */
export function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<ApplicationFormValues>(initialApplicationValues);
  const [errors, setErrors] = useState<ApplicationFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function onChange<K extends keyof ApplicationFormValues>(key: K, value: ApplicationFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function goNext() {
    const stepErrors = validateStep(step, values);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;

    if (step === TOTAL_STEPS) {
      setSubmitted(true);
      return;
    }
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-emerald-50 p-12 text-center">
        <CheckCircle2 size={40} className="text-emerald-700" />
        <p className="font-display text-2xl font-semibold text-ink-900">Application submitted</p>
        <p className="max-w-md text-sm leading-relaxed text-ink-500">
          Thank you, {values.firstName || "there"}. Your application has been recorded. Our team
          will review your details and identification, and you&rsquo;ll be notified by SMS and
          email once a decision is made.
        </p>
        <p className="max-w-md text-xs text-ink-400">
          Note: this Phase 1 form does not yet submit to a live backend. Your entries were
          validated only — no data has been stored or sent.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <StepIndicator steps={applicationSteps} currentStep={step} />

      <div className="rounded-3xl border border-ink-100 p-6 sm:p-9">
        <p className="mb-6 font-display text-lg font-semibold text-ink-900">
          Step {step} of {TOTAL_STEPS} — {applicationSteps[step - 1]}
        </p>

        {step === 1 && <PersonalInfoStep values={values} errors={errors} onChange={onChange} />}
        {step === 2 && <ContactInfoStep values={values} errors={errors} onChange={onChange} />}
        {step === 3 && <EmploymentInfoStep values={values} errors={errors} onChange={onChange} />}
        {step === 4 && <NextOfKinStep values={values} errors={errors} onChange={onChange} />}
        {step === 5 && <IdentificationStep values={values} errors={errors} onChange={onChange} />}
        {step === 6 && <DeclarationStep values={values} errors={errors} onChange={onChange} />}

        <div className="mt-9 flex items-center justify-between border-t border-ink-100 pt-6">
          <Button type="button" variant="outline" onClick={goBack} disabled={step === 1}>
            <ArrowLeft size={16} /> Back
          </Button>
          <Button type="button" onClick={goNext}>
            {step === TOTAL_STEPS ? (
              <>
                Submit Application <Send size={16} />
              </>
            ) : (
              <>
                Continue <ArrowRight size={16} />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
