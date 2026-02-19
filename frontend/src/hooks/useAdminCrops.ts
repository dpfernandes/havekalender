import { useState, useEffect, useCallback } from "react";
import type { Crop } from "../types";

const API = "/api/crops";

export function useAdminCrops() {
  const [crops, setCrops]     = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch(API);
      const data = await res.json();
      setCrops(data.crops);
    } catch {
      setError("Failed to load crops.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const createCrop = async (body: Omit<Crop, "id">): Promise<Crop> => {
    const res  = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Create failed.");
    await fetchAll();
    return data.crop;
  };

  const updateCrop = async (id: number, body: Omit<Crop, "id">): Promise<Crop> => {
    const res  = await fetch(`${API}/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Update failed.");
    await fetchAll();
    return data.crop;
  };

  const deleteCrop = async (id: number): Promise<void> => {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (!res.ok) { const data = await res.json(); throw new Error(data.error ?? "Delete failed."); }
    await fetchAll();
  };

  return { crops, loading, error, createCrop, updateCrop, deleteCrop, refresh: fetchAll };
}
