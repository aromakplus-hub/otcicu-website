import { z } from "zod";

export const executiveSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(120, "Full name is too long."),
  position: z
    .string()
    .trim()
    .min(2, "Position is required.")
    .max(120, "Position is too long."),
  biography: z
    .string()
    .trim()
    .max(2000, "Biography must be under 2000 characters.")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .optional()
    .or(z.literal("")),
  phone: z.string().trim().max(30, "Phone number is too long.").optional().or(z.literal("")),
  photo_url: z.string().trim().url().optional().or(z.literal("")),
  display_order: z.coerce.number().int().min(0).max(9999).default(0),
  status: z.enum(["draft", "published", "hidden"]),
});

export type ExecutiveFormValues = z.infer<typeof executiveSchema>;
