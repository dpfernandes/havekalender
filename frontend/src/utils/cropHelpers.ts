import type { Crop, CropAction, ActionType } from "../types";
import { ACTION_META } from "./constants";

export function getActionsForCrop(crop: Crop, month: number): CropAction[] {
  const m = month + 1;
  const keys: ActionType[] = ["sow_indoor", "sow_outdoor", "transplant"];
  return keys
    .filter((k) => crop[k].includes(m))
    .map((k) => ({ type: k, ...ACTION_META[k] }));
}

export function getPlantCropsForMonth(crops: Crop[], month: number): Crop[] {
  const m = month + 1;
  return crops.filter((c) => c.sow_indoor.includes(m) || c.sow_outdoor.includes(m) || c.transplant.includes(m));
}

export function getHarvestCropsForMonth(crops: Crop[], month: number): Crop[] {
  const m = month + 1;
  return crops.filter((c) => c.harvest.includes(m));
}

export function shortMonth(labels: string[], month: number): string {
  return labels[month]?.slice(0, 3) ?? "";
}

export function timelineCellColor(crop: Crop, month: number): string {
  const m = month + 1;
  if (crop.sow_indoor.includes(m))  return ACTION_META.sow_indoor.color;
  if (crop.sow_outdoor.includes(m)) return ACTION_META.sow_outdoor.color;
  if (crop.transplant.includes(m))  return ACTION_META.transplant.color;
  if (crop.harvest.includes(m))     return ACTION_META.harvest.color;
  return "#1e2a1a";
}
