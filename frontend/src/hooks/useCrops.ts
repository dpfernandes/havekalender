import { useState, useEffect, useMemo } from "react";
import { supabase } from "../lib/supabase";
import { getPlantCropsForMonth, getHarvestCropsForMonth } from "../utils/cropHelpers";
import type { Crop } from "../types";

export function useCrops(month: number) {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCrops() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('crops')
          .select('*')
          .order('name_da');

        if (error) throw error;
        setCrops((data as Crop[]) || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch crops');
      } finally {
        setLoading(false);
      }
    }

    fetchCrops();
  }, []);

  const plant   = useMemo(() => getPlantCropsForMonth(crops, month),   [crops, month]);
  const harvest = useMemo(() => getHarvestCropsForMonth(crops, month), [crops, month]);

  return { crops, plant, harvest, loading, error };
}
