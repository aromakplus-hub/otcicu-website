"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type ContactFormValues = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialValues: ContactFormValues = {
  fullName: "",
  email: "",
  phone: "",
  subject: "General Enquiry",
  message: "",
};

function validate(values: ContactFormValues) {
  const errors: Partial<Record<keyof ContactFormValues, string>> = {};

  if (!values.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.phone.trim()) errors.phone = "Please enter a phone number.";
  if (!values.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Please provide a little more detail (at least 10 characters).";
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // No backend wired up yet — Phase 1 is frontend-only.
      // Wire this to an API route or form service in a later phase.
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-emerald-50 p-10 text-center">
        <CheckCircle2 size={32} className="text-emerald-700" />
        <p className="font-display text-lg font-semibold text-ink-900">Message received</p>
        <p className="max-w-sm text-sm leading-relaxed text-ink-500">
          Thank you for reaching out. A member of our team will respond within 1–2 working days.
        </p>
        <Button variant="outline" size="sm" onClick={() => { setValues(initialValues); setSubmitted(false); }}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="fullName" label="Full Name" required error={errors.fullName}>
          <Input
            id="fullName"
            name="fullName"
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            autoComplete="name"
          />
        </FormField>
        <FormField id="phone" label="Phone Number" required error={errors.phone}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+234"
            autoComplete="tel"
          />
        </FormField>
      </div>

      <FormField id="email" label="Email Address" required error={errors.email}>
        <Input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          autoComplete="email"
        />
      </FormField>

      <FormField id="subject" label="Subject">
        <Select
          id="subject"
          name="subject"
          value={values.subject}
          onChange={(e) => update("subject", e.target.value)}
        >
          <option>General Enquiry</option>
          <option>Membership Question</option>
          <option>Loan Enquiry</option>
          <option>Savings Enquiry</option>
          <option>Complaint</option>
        </Select>
      </FormField>

      <FormField id="message" label="Message" required error={errors.message}>
        <Textarea
          id="message"
          name="message"
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="How can we help?"
        />
      </FormField>

      <Button type="submit" size="lg" className="w-fit">
        Send Message <Send size={16} />
      </Button>
    </form>
  );
}
