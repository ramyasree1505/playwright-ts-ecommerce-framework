import dotenv from 'dotenv';

const environment =
  process.env.TEST_ENV || 'qa';

if (!process.env.CI) {
  dotenv.config({
    path: `./config/.env.${environment}`
  });
}

const parseNumber = (
  value: string | undefined,
  fallback: number
) => {
  const parsed = Number(value);
  return Number.isNaN(parsed)
    ? fallback
    : parsed;
};

class Environment {
  readonly parallelThread =
    parseNumber(
      process.env.PARALLEL_THREAD,
      2
    );
  readonly timeout = parseNumber(process.env.Timeout, 30000);
  readonly retries = parseNumber(process.env.RETRIES, 0);
  readonly baseURL = process.env.BASE_URL!;
  readonly username = process.env.USERNAME!;
  readonly password = process.env.PASSWORD!;
  readonly browser = process.env.BROWSER || 'chromium';
}

export const env = new Environment();