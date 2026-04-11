import 'dotenv/config';

export const env = (key, defaultValue = undefined) => {
  const value = process.env[key];

  if (value === undefined || value === '') {
    if (defaultValue !== undefined) return defaultValue;

    throw new Error(`Missing env variable: ${key}`);
  }

  return value;
};
