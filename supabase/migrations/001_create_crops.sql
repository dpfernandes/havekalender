-- HaveKalender crops table (Supabase/PostgreSQL)
-- Run this in Supabase SQL Editor or via Supabase CLI

CREATE TABLE IF NOT EXISTS public.crops (
  id           BIGSERIAL PRIMARY KEY,
  name_da      VARCHAR(100) NOT NULL,
  name_en      VARCHAR(100) NOT NULL,
  category     VARCHAR(20)  NOT NULL CHECK (category IN ('vegetable','herb','fruit')),
  icon         VARCHAR(10)  NOT NULL DEFAULT '',
  sow_indoor   INTEGER[]    NOT NULL DEFAULT '{}',
  sow_outdoor  INTEGER[]    NOT NULL DEFAULT '{}',
  transplant   INTEGER[]    NOT NULL DEFAULT '{}',
  harvest      INTEGER[]    NOT NULL DEFAULT '{}',
  difficulty   VARCHAR(10)  NOT NULL CHECK (difficulty IN ('easy','medium','hard')),
  care_note_da TEXT         NOT NULL DEFAULT '',
  care_note_en TEXT         NOT NULL DEFAULT '',
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_crops_sow_indoor  ON public.crops USING GIN (sow_indoor);
CREATE INDEX IF NOT EXISTS idx_crops_sow_outdoor ON public.crops USING GIN (sow_outdoor);
CREATE INDEX IF NOT EXISTS idx_crops_transplant  ON public.crops USING GIN (transplant);
CREATE INDEX IF NOT EXISTS idx_crops_harvest     ON public.crops USING GIN (harvest);

-- RLS: allow public read and write for development (tighten in production)
ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON public.crops FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public.crops FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON public.crops FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON public.crops FOR DELETE USING (true);
