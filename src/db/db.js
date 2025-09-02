import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import * as schema from "../models/schema.js"; // import your tables from schema.js

const { Pool } = pkg;

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // from .env
});

// Create drizzle instance with schema
export const db = drizzle(pool, { schema });
