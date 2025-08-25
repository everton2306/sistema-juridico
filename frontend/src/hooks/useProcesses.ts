import { useEffect, useState } from "react";
import { Process } from "../types";
import { api } from "../lib/api";
import toast from "react-hot-toast";

// Hook customizado para gerenciar Processos
export function useProcesses() {
  // Lista de processos
  const [processes, setProcesses] = useState<Process[]>([]);
  // Estado de carregamento
  const [loading, setLoading] = useState(true);
  // Estado de erro
  const [error, setError] = useState<string | null>(null);

  // Carregar todos os processos da API
  async function fetchProcesses() {
    try {
      setLoading(true);
      const data = await api.listProcess();
      setProcesses(data);
    } catch (err: any) {
      setError(err.error || "Erro ao carregar processos");
    } finally {
      setLoading(false);
    }
  }

  // Adicionar novo processo
  async function createProcess(p: Omit<Process, "id" | "andamentos">) {
    const { data, message } = await api.createProcess(p);
    toast.success(message); // regra de negócio (ex.: MG / fora de MG)
    setProcesses((prev) => [...prev, data]);
  }

  // Atualizar processo existente
  async function updateProcess(
    id: number,
    p: Partial<Omit<Process, "id" | "andamentos">>
  ) {
    const { data } = await api.updateProcess(id, p);
    setProcesses((prev) => prev.map((proc) => (proc.id === id ? data : proc)));
  }

  // Excluir processo
  async function deleteProcess(id: number) {
    await api.deleteProcess(id);
    setProcesses((prev) => prev.filter((p) => p.id !== id));
  }

  // Carregar processos quando o hook é usado pela primeira vez
  useEffect(() => {
    fetchProcesses();
  }, []);

  // Retorno do hook com funções utilitárias
  return {
    processes,
    loading,
    error,
    createProcess,
    updateProcess,
    deleteProcess,
    reload: fetchProcesses,
  };
}
