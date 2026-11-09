import dotenv from "dotenv";
import { z } from "zod";

// Load environment variables from .env file
dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("5000").transform((val) => parseInt(val, 10)),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_ACCESS_EXPIRY: z.string().default("15m"),
  JWT_REFRESH_EXPIRY: z.string().default("7d"),
  CORS_ORIGIN: z.string().default("*"),
  SMS_PROVIDER: z.string().default("mock"),
  SMS_API_KEY: z.string().default("mock_sms_api_key_placeholder"),
  GOOGLE_CLIENT_ID: z.string().default("mock_google_client_id"),
  GOOGLE_CLIENT_SECRET: z.string().default("mock_google_client_secret"),
  GITHUB_CLIENT_ID: z.string().default("mock_github_client_id"),
  GITHUB_CLIENT_SECRET: z.string().default("mock_github_client_secret"),
  SMTP_HOST: z.string().default("smtp.mailtrap.io"),
  SMTP_PORT: z.string().default("2525").transform((val) => parseInt(val, 10)),
  SMTP_USER: z.string().default("mock_smtp_user"),
  SMTP_PASS: z.string().default("mock_smtp_pass"),
  EMAIL_FROM: z.string().default("CarBoom <noreply@carboom.com>"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.format());
  process.exit(1);
}

export const config = parsedEnv.data;
