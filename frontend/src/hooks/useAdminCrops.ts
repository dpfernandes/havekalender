import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import type { Crop } from "../types";

export function useAdminCrops() {
  const [crops, setCrops]     = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('crops')
        .select('*')
        .order('name_da');

      if (error) throw error;
      setCrops((data as Crop[]) || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load crops.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const createCrop = async (body: Omit<Crop, "id">): Promise<Crop> => {
    const { data, error } = await (supabase as any)
      .from('crops')
      .insert({
        name_da: body.name_da,
        name_en: body.name_en,
        category: body.category,
        icon: body.icon,
        sow_indoor: body.sow_indoor,
        sow_outdoor: body.sow_outdoor,
        transplant: body.transplant,
        harvest: body.harvest,
        difficulty: body.difficulty,
        care_note_da: body.care_note_da,
        care_note_en: body.care_note_en,
      })
      .select()
      .single();

    if (error) throw new Error(error.message ?? "Create failed.");
    await fetchAll();
    return data as Crop;
  };

  const updateCrop = async (id: number, body: Omit<Crop, "id">): Promise<Crop> => {
    const { data, error } = await (supabase as any)
      .from('crops')
      .update({
        name_da: body.name_da,
        name_en: body.name_en,
        category: body.category,
        icon: body.icon,
        sow_indoor: body.sow_indoor,
        sow_outdoor: body.sow_outdoor,
        transplant: body.transplant,
        harvest: body.harvest,
        difficulty: body.difficulty,
        care_note_da: body.care_note_da,
        care_note_en: body.care_note_en,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message ?? "Update failed.");
    await fetchAll();
    return data as Crop;
  };

  const deleteCrop = async (id: number): Promise<void> => {
    const { error } = await supabase
      .from('crops')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message ?? "Delete failed.");
    await fetchAll();
  };

  return { crops, loading, error, createCrop, updateCrop, deleteCrop, refresh: fetchAll };
}
