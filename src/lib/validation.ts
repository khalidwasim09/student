import { z } from "zod";

export const emailStartSchema = z.object({
  email: z.string().email(),
});

export const emailVerifySchema = z.object({
  token: z.string().min(10),
  code: z.string().regex(/^\d{6}$/),
});

export const profileSchema = z.object({
  firstName: z.string().min(1).max(50),
  birthdate: z.string().transform((v) => new Date(v)),
  gender: z.string().min(1),
  program: z.string().min(1),
  gradYear: z.number().int().min(1900).max(2100).optional(),
  bio: z.string().max(500).optional(),
  interests: z.array(z.string()).max(20),
});

export const preferencesSchema = z.object({
  gender: z.string().optional(),
  minAge: z.number().int().min(18).max(99).default(18),
  maxAge: z.number().int().min(18).max(99).default(45),
  maxDistanceKm: z.number().int().min(1).max(500).default(50),
  programFilter: z.array(z.string()).optional().default([]),
});