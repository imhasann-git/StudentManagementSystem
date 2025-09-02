import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";

const { Pool } = pkg;

// Create a connection pool
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres.tuehokwiztyyztnnleva:admin%402005@aws-1-ap-south-1.pooler.supabase.com:6543/postgres",
  ssl: {
    rejectUnauthorized: false,
  }, // from .env
});

// Create drizzle instance with schema
export const db = drizzle(pool);
