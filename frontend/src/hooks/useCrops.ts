import { useMemo } from "react";
import { CROPS } from "../data/crops";
import { getPlantCropsForMonth, getHarvestCropsForMonth } from "../utils/cropHelpers";
import type { Crop } from "../types";

/**
 * Returns filtered plant/harvest lists for the given month.
 *
 * To switch to live API, replace the static import with:
 *   useEffect(() => {
 *     fetch(`/api/crops/month/${month + 1}`).then(r => r.json()).then(setData);
 *   }, [month]);
 */
export function useCrops(month: number) {
  const crops = CROPS as Crop[];
  const plant   = useMemo(() => getPlantCropsForMonth(crops, month),   [month]);
  const harvest = useMemo(() => getHarvestCropsForMonth(crops, month), [month]);
  return { crops, plant, harvest };
}
