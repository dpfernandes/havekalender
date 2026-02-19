import { Router, Request, Response } from "express";
import { pool } from "../db/connection";

export const cropsRouter = Router();

/** GET /api/crops/month/:month — plant + harvest lists for a given month (1–12) */
cropsRouter.get("/month/:month", async (req: Request, res: Response) => {
  const month = parseInt(req.params.month, 10);
  if (isNaN(month) || month < 1 || month > 12) {
    res.status(400).json({ error: "Month must be an integer between 1 and 12." });
    return;
  }
  try {
    const plant   = await pool.query("SELECT * FROM crops WHERE $1 = ANY(sow_indoor) OR $1 = ANY(sow_outdoor) OR $1 = ANY(transplant) ORDER BY name_da", [month]);
    const harvest = await pool.query("SELECT * FROM crops WHERE $1 = ANY(harvest) ORDER BY name_da", [month]);
    res.json({ month, plant: plant.rows, harvest: harvest.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
});

/** GET /api/crops — full list with optional ?category= filter */
cropsRouter.get("/", async (req: Request, res: Response) => {
  const { category } = req.query;
  try {
    const result = category
      ? await pool.query("SELECT * FROM crops WHERE category = $1 ORDER BY name_da", [category])
      : await pool.query("SELECT * FROM crops ORDER BY name_da");
    res.json({ crops: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
});

/** GET /api/crops/:id — full crop detail */
cropsRouter.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "ID must be an integer." }); return; }
  try {
    const result = await pool.query("SELECT * FROM crops WHERE id = $1", [id]);
    if (result.rows.length === 0) { res.status(404).json({ error: `Crop ${id} not found.` }); return; }
    res.json({ crop: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
});

/** POST /api/crops — create a new crop */
cropsRouter.post("/", async (req: Request, res: Response) => {
  const { name_da, name_en, category, icon, sow_indoor, sow_outdoor, transplant, harvest, difficulty, care_note_da, care_note_en } = req.body;
  if (!name_da || !name_en || !category || !difficulty) {
    res.status(400).json({ error: "name_da, name_en, category and difficulty are required." });
    return;
  }
  try {
    const result = await pool.query(
      `INSERT INTO crops (name_da,name_en,category,icon,sow_indoor,sow_outdoor,transplant,harvest,difficulty,care_note_da,care_note_en)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING *`,
      [name_da, name_en, category, icon ?? "", sow_indoor ?? [], sow_outdoor ?? [], transplant ?? [], harvest ?? [], difficulty, care_note_da ?? "", care_note_en ?? ""]
    );
    res.status(201).json({ crop: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
});

/** PUT /api/crops/:id — update an existing crop */
cropsRouter.put("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "ID must be an integer." }); return; }
  const { name_da, name_en, category, icon, sow_indoor, sow_outdoor, transplant, harvest, difficulty, care_note_da, care_note_en } = req.body;
  try {
    const result = await pool.query(
      `UPDATE crops SET
         name_da=$1, name_en=$2, category=$3, icon=$4,
         sow_indoor=$5, sow_outdoor=$6, transplant=$7, harvest=$8,
         difficulty=$9, care_note_da=$10, care_note_en=$11,
         updated_at=NOW()
       WHERE id=$12
       RETURNING *`,
      [name_da, name_en, category, icon, sow_indoor, sow_outdoor, transplant, harvest, difficulty, care_note_da, care_note_en, id]
    );
    if (result.rows.length === 0) { res.status(404).json({ error: `Crop ${id} not found.` }); return; }
    res.json({ crop: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
});

/** DELETE /api/crops/:id — delete a crop */
cropsRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "ID must be an integer." }); return; }
  try {
    const result = await pool.query("DELETE FROM crops WHERE id = $1 RETURNING id", [id]);
    if (result.rows.length === 0) { res.status(404).json({ error: `Crop ${id} not found.` }); return; }
    res.json({ deleted: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
});
