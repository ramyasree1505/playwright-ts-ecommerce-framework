import dotenv from 'dotenv';
import path from 'path';

const environment =
  process.env.TEST_ENV || 'qa';

if (!process.env.CI) {
  const envPath = path.resolve(
    __dirname,
    '../../config/.env.' + environment
  );

  console.log('Loading env from:', envPath);

  dotenv.config({
    path: envPath
  });

  console.log('USERNAME:', process.env.APP_USERNAME);
  console.log(
    'PASSWORD exists:',
    !!process.env.APP_PASSWORD
  );
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
  readonly username = process.env.APP_USERNAME!;
  readonly password = process.env.APP_PASSWORD!;
  readonly browser = process.env.BROWSER || 'chromium';
}

export const env = new Environment();