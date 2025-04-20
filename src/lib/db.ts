import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/db/schema";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
});

const env = envSchema.parse(process.env);

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 20,
});

export const db = drizzle(pool, { schema });
