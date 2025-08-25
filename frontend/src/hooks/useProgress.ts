import { useEffect, useState } from "react";
import { Progress } from "../types";
import { api } from "../lib/api";

export function useProgress(processId: number) {
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(false);

  // Buscar todos os progressos do processo
  const fetchProgress = async () => {
    setLoading(true);
    try {
      const data = await api.listProgress(processId);
      setProgress(data);
    } catch (error) {
      console.error("Erro ao buscar progressos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (processId) {
      fetchProgress();
    }
  }, [processId]);

  async function create(a: { data: string; description: string }) {
    const { data } = await api.createProgress(processId, a);
    setProgress((prev) => [...prev, data]);
  }

  async function update(
    id: number,
    a: Partial<Pick<Progress, "data" | "description">>
  ) {
    const { data } = await api.updateProgress(id, a);
    setProgress((prev) => prev.map((pro) => (pro.id === id ? data : pro)));
  }

  async function deleteProgress(id: number) {
    await api.deleteProgress(id);
    setProgress((prev) => prev.filter((pro) => pro.id !== id));
  }

  return {
    progress,
    loading,
    fetchProgress,
    create,
    update,
    deleteProgress,
    setProgress,
  };
}
