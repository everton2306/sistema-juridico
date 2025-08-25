import { Process, Progress } from "../types";

const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) throw await res.json().catch(() => ({ error: res.statusText }));
  return res.json();
}

export const api = {
  // Processos
  listProcess: () =>
    http<{ data: Process[] }>("/processes").then((r) => r.data),

  createProcess: (p: Omit<Process, "id" | "progress">) =>
    http<{ data: Process; message: string }>("/processes", {
      method: "POST",
      body: JSON.stringify(p),
    }),

  updateProcess: (id: number, p: Partial<Omit<Process, "id" | "progress">>) =>
    http<{ data: Process }>(`/processes/${id}`, {
      method: "PUT",
      body: JSON.stringify(p),
    }),

  deleteProcess: (id: number) =>
    fetch(`${BASE}/processes/${id}`, { method: "DELETE" }).then((r) => {
      if (!r.ok) throw new Error("Falha ao excluir processo");
    }),

  // Andamentos
  createProgress: (
    id: number,
    a: { data: string; description: string }
  ) =>
    http<{ data: Progress }>(`/progress/${id}`, {
      method: "POST",
      body: JSON.stringify(a),
    }),

  updateProgress: (
    id: number,
    a: Partial<Pick<Progress, "data" | "description">>
  ) =>
    http<{ data: Progress }>(`/progress/${id}`, {
      method: "PUT",
      body: JSON.stringify(a),
    }),

  listProgress: (id: number) =>
    http<{ data: Progress[] }>(`/progress/${id}`).then((r) => r.data),

  deleteProgress: (id: number) =>
    fetch(`${BASE}/progress/${id}`, { method: "DELETE" }).then((r) => {
      if (!r.ok) throw new Error("Falha ao excluir andamento");
    }),
};
