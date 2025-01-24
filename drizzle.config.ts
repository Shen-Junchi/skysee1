import { config } from 'dotenv';
import { Config, defineConfig } from 'drizzle-kit';
import * as dotenv from "dotenv";

dotenv.config({
  path: '.env.local',
});

export default ({
  schema: './lib/db/schema.ts',
  dialect: 'postgresql',
  out: './lib/db/migrations',
  dbCredentials: {
    // biome-ignore lint: Forbidden non-null assertion.
    connectionString: process.env.POSTGRES_URL!,
  },
}) as Config;


