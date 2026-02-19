CREATE TABLE IF NOT EXISTS crops (
  id           SERIAL PRIMARY KEY,
  name_da      VARCHAR(100) NOT NULL,
  name_en      VARCHAR(100) NOT NULL,
  category     VARCHAR(20)  NOT NULL CHECK (category IN ('vegetable','herb','fruit')),
  icon         VARCHAR(10)  NOT NULL,
  sow_indoor   INTEGER[]    NOT NULL DEFAULT '{}',
  sow_outdoor  INTEGER[]    NOT NULL DEFAULT '{}',
  transplant   INTEGER[]    NOT NULL DEFAULT '{}',
  harvest      INTEGER[]    NOT NULL DEFAULT '{}',
  difficulty   VARCHAR(10)  NOT NULL CHECK (difficulty IN ('easy','medium','hard')),
  care_note_da TEXT         NOT NULL,
  care_note_en TEXT         NOT NULL,
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_crops_sow_indoor  ON crops USING GIN (sow_indoor);
CREATE INDEX IF NOT EXISTS idx_crops_sow_outdoor ON crops USING GIN (sow_outdoor);
CREATE INDEX IF NOT EXISTS idx_crops_transplant  ON crops USING GIN (transplant);
CREATE INDEX IF NOT EXISTS idx_crops_harvest     ON crops USING GIN (harvest);
