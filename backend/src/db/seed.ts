import fs from "fs";
import path from "path";
import pg, { Pool } from "pg";
import { pool } from "./connection";
import { CROPS } from "../data/crops";

async function ensureDatabase() {
  if (process.env.DATABASE_URL) return; // managed env handles this

  const dbName = process.env.PGDATABASE ?? "havekalender";
  const adminPool = new Pool({
    host:     process.env.PGHOST     ?? "localhost",
    port:     Number(process.env.PGPORT ?? 5432),
    database: "postgres",
    user:     process.env.PGUSER     ?? process.env.USER ?? "postgres",
    password: process.env.PGPASSWORD ?? "",
  });

  try {
    const res = await adminPool.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbName]
    );
    if (res.rowCount === 0) {
      await adminPool.query(`CREATE DATABASE ${pg.escapeIdentifier(dbName)}`);
      console.log(`✅ Created database "${dbName}".`);
    }
  } finally {
    await adminPool.end();
  }
}

async function applySchema() {
  const schemaPath = path.join(__dirname, "schema.sql");
  const sql = fs.readFileSync(schemaPath, "utf-8");
  await pool.query(sql);
}

async function seed() {
  await ensureDatabase();
  await applySchema();

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("TRUNCATE crops RESTART IDENTITY CASCADE");
    for (const crop of CROPS) {
      await client.query(
        `INSERT INTO crops (id,name_da,name_en,category,icon,sow_indoor,sow_outdoor,transplant,harvest,difficulty,care_note_da,care_note_en)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
        [crop.id, crop.name_da, crop.name_en, crop.category, crop.icon,
         crop.sow_indoor, crop.sow_outdoor, crop.transplant, crop.harvest,
         crop.difficulty, crop.care_note_da, crop.care_note_en]
      );
    }
    await client.query("COMMIT");
    console.log(`✅ Seeded ${CROPS.length} crops.`);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Seed failed:", err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
