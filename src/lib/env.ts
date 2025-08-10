import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(10),
  NEXTAUTH_URL: z.string().url(),
  EMAIL_FROM: z.string().email(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  S3_ENDPOINT: z.string().optional(),
  S3_REGION: z.string().optional(),
  S3_BUCKET: z.string().optional(),
  S3_ACCESS_KEY_ID: z.string().optional(),
  S3_SECRET_ACCESS_KEY: z.string().optional(),
  REDIS_URL: z.string().optional(),
  NEXT_PUBLIC_APP_NAME: z.string().default("CampusConnect"),
  NEXT_PUBLIC_MAX_PHOTOS: z.coerce.number().default(4),
});

export const env = envSchema.parse({
  ...process.env,
});