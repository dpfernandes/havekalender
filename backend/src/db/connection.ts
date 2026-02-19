import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host:     process.env.PGHOST     ?? "localhost",
  port:     Number(process.env.PGPORT ?? 5432),
  database: process.env.PGDATABASE ?? "havekalender",
  user:     process.env.PGUSER     ?? process.env.USER ?? "postgres",
  password: process.env.PGPASSWORD ?? "",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});
