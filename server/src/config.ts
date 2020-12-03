import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '..', '.env') });

function getEnv<T>(name: string, defaultValue?: T) {
  const value = process.env[name];

  if (!(value ?? defaultValue)) {
    throw new Error(`Not anought env:${name} values`);
  }

  return value ?? defaultValue;
}

export const config = {
  port: getEnv('PORT', 4000),
  database: {
    url: getEnv<string>('DATABASE_URL'),
  },
};
export type Config = typeof config;
