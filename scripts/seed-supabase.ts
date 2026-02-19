/**
 * Seed Supabase crops table from assets/crops.ts
 * Run: SUPABASE_SERVICE_ROLE_KEY=xxx npx tsx scripts/seed-supabase.ts
 * Or with VITE_ vars: uses anon key (requires RLS to allow insert).
 */
import { createClient } from "@supabase/supabase-js";
import { CROPS } from "../assets/crops.js";

const url = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or VITE_SUPABASE_ANON_KEY)");
  process.exit(1);
}

const supabase = createClient(url, key);

type CropRow = {
  id?: number;
  name_da: string;
  name_en: string;
  category: string;
  icon: string;
  sow_indoor: number[];
  sow_outdoor: number[];
  transplant: number[];
  harvest: number[];
  difficulty: string;
  care_note_da: string;
  care_note_en: string;
};

async function seed() {
  const rows: CropRow[] = CROPS.map((c) => ({
    name_da: c.name_da,
    name_en: c.name_en,
    category: c.category,
    icon: c.icon,
    sow_indoor: c.sow_indoor,
    sow_outdoor: c.sow_outdoor,
    transplant: c.transplant,
    harvest: c.harvest,
    difficulty: c.difficulty,
    care_note_da: c.care_note_da,
    care_note_en: c.care_note_en,
  }));

  const { error } = await supabase.from("crops").upsert(rows, { onConflict: "id" });
  if (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
  console.log(`Seeded ${rows.length} crops.`);
}

seed();
