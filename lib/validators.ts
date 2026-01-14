import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z
    .string(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  jobTitle: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password is required"),
});

export const profileUpdateSchema = z.object({
  fullName: z.string().min(2).optional(),
  jobTitle: z.string().optional(),
  bio: z.string().optional(),
  headline: z.string().optional(),
  websiteUrl: z.string().url().optional(),
  phone: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  location: z
    .object({
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
      postalCode: z.string().optional(),
    })
    .optional(),
  socials: z
    .object({
      linkedin: z.string().url().optional(),
      twitter: z.string().url().optional(),
      personal: z.string().url().optional(),
      instagram: z.string().url().optional(),
    })
    .optional(),
});

export const cardUpsertSchema = z.object({
  templateId: z.number().int().min(0),
  frontColors: z.object({
    background: z.string(),
    text: z.string(),
  }),
  backColors: z.object({
    background: z.string(),
    text: z.string(),
  }),
  links: z
    .object({
      linkedin: z.string().url().optional(),
      twitter: z.string().url().optional(),
      personal: z.string().url().optional(),
      instagram: z.string().url().optional(),
    })
    .optional(),
  headline: z.string().optional(),
  subHeadline: z.string().optional(),
});

