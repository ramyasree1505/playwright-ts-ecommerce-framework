import dotenv from 'dotenv';

dotenv.config({ path: './config/env.qa' });

const parseNumber = (
  value: string | undefined,
  fallback: number
) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export const BROWSER = process.env.BROWSER || 'chrome';

export const RETRIES =parseNumber(process.env.RETRIES, 0);

export const PARALLEL_THREAD = parseNumber(process.env.PARALLEL_THREAD, 3);

export const BASE_URL = process.env.BASE_URL!;

export const Timeout = parseNumber(process.env.Timeout, 30000);

export const REST_API_BASE_URL = process.env.REST_API_BASE_URL!;

export const env = {
  BROWSER,
  RETRIES,
  PARALLEL_THREAD,
  BASE_URL,
  REST_API_BASE_URL,
  Timeout,
};