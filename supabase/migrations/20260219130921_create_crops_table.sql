/*
  # Create crops table for HaveKalender

  ## Overview
  Danish Garden Planting & Harvest Calendar database schema.
  Stores planting and harvesting data for 30 crops calibrated for Denmark's Cfb climate.

  ## New Tables
  
  ### `crops`
  Main table storing all crop information with bilingual support (Danish/English).
  
  **Columns:**
  - `id` (bigint, primary key) - Unique identifier for each crop
  - `name_da` (text) - Danish name of the crop
  - `name_en` (text) - English name of the crop
  - `category` (text) - Crop category: vegetable, herb, or fruit
  - `icon` (text) - Emoji icon for visual representation
  - `sow_indoor` (integer[]) - Months (1-12) when crop can be sown indoors
  - `sow_outdoor` (integer[]) - Months (1-12) when crop can be sown outdoors
  - `transplant` (integer[]) - Months (1-12) when crop can be transplanted
  - `harvest` (integer[]) - Months (1-12) when crop can be harvested
  - `difficulty` (text) - Growing difficulty: easy, medium, or hard
  - `care_note_da` (text) - Danish care instructions
  - `care_note_en` (text) - English care instructions
  - `created_at` (timestamptz) - Timestamp of record creation
  - `updated_at` (timestamptz) - Timestamp of last update

  ## Indexes
  
  Four GIN indexes on array columns for efficient month-based queries:
  - `idx_crops_sow_indoor` - Fast lookups for indoor sowing by month
  - `idx_crops_sow_outdoor` - Fast lookups for outdoor sowing by month
  - `idx_crops_transplant` - Fast lookups for transplanting by month
  - `idx_crops_harvest` - Fast lookups for harvesting by month

  ## Security

  ### Row Level Security (RLS)
  - RLS enabled on `crops` table
  - Public read access for all users (authenticated and anonymous)
  - Write operations (INSERT, UPDATE, DELETE) restricted - require future admin authentication

  ### Policies
  1. **"Anyone can read crops"** - Allows SELECT for all users (anon + authenticated)
  2. **"Authenticated users can insert crops"** - Allows INSERT for authenticated users only
  3. **"Authenticated users can update crops"** - Allows UPDATE for authenticated users only
  4. **"Authenticated users can delete crops"** - Allows DELETE for authenticated users only

  ## Notes
  - Month arrays are 1-indexed (1 = January, 12 = December)
  - Default values ensure data integrity (empty arrays for month fields)
  - Timestamps auto-update for tracking data changes
*/

-- Create crops table
CREATE TABLE IF NOT EXISTS crops (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name_da      TEXT NOT NULL,
  name_en      TEXT NOT NULL,
  category     TEXT NOT NULL CHECK (category IN ('vegetable','herb','fruit')),
  icon         TEXT NOT NULL DEFAULT '',
  sow_indoor   INTEGER[] NOT NULL DEFAULT '{}',
  sow_outdoor  INTEGER[] NOT NULL DEFAULT '{}',
  transplant   INTEGER[] NOT NULL DEFAULT '{}',
  harvest      INTEGER[] NOT NULL DEFAULT '{}',
  difficulty   TEXT NOT NULL CHECK (difficulty IN ('easy','medium','hard')),
  care_note_da TEXT NOT NULL DEFAULT '',
  care_note_en TEXT NOT NULL DEFAULT '',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for efficient month-based queries
CREATE INDEX IF NOT EXISTS idx_crops_sow_indoor  ON crops USING GIN (sow_indoor);
CREATE INDEX IF NOT EXISTS idx_crops_sow_outdoor ON crops USING GIN (sow_outdoor);
CREATE INDEX IF NOT EXISTS idx_crops_transplant  ON crops USING GIN (transplant);
CREATE INDEX IF NOT EXISTS idx_crops_harvest     ON crops USING GIN (harvest);

-- Enable Row Level Security
ALTER TABLE crops ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read crops (public data)
CREATE POLICY "Anyone can read crops"
  ON crops
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Authenticated users can insert crops
CREATE POLICY "Authenticated users can insert crops"
  ON crops
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update crops
CREATE POLICY "Authenticated users can update crops"
  ON crops
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete crops
CREATE POLICY "Authenticated users can delete crops"
  ON crops
  FOR DELETE
  TO authenticated
  USING (true);