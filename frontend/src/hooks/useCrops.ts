import { useMemo } from "react";
import { CROPS } from "../../../assets/crops";
import { getPlantCropsForMonth, getHarvestCropsForMonth } from "../utils/cropHelpers";

/**
 * Returns filtered plant/harvest lists for the given month.
 *
 * To switch to live API, replace the static import with:
 *   useEffect(() => {
 *     fetch(`/api/crops/month/${month + 1}`).then(r => r.json()).then(setData);
 *   }, [month]);
 */
export function useCrops(month: number) {
  const plant   = useMemo(() => getPlantCropsForMonth(CROPS, month),   [month]);
  const harvest = useMemo(() => getHarvestCropsForMonth(CROPS, month), [month]);
  return { crops: CROPS, plant, harvest };
}
