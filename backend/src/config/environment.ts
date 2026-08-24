import 'dotenv/config';
const required = (name: string, fallback?: string) => {
  const value = process.env[name] ?? fallback;
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};
export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: required(
    'DATABASE_URL',
    'postgresql://postgres:postgres@localhost:5432/rural_tourism',
  ),
  jwtSecret: required(
    'JWT_SECRET',
    process.env.NODE_ENV === 'production'
      ? undefined
      : 'development-only-secret-change-me',
  ),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '2h',
  webOrigin: process.env.WEB_ORIGIN ?? 'http://localhost:3000',
  cookieSecure: process.env.COOKIE_SECURE === 'true',
};
