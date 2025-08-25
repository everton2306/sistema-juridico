import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Criar processo
export const createProcess = async (req: Request, res: Response) => {
  const { number, openingdate, description, customer, advocate, uf } = req.body;

  const created = await prisma.process.create({
    data: { number, openingdate, description, customer, advocate, uf },
  });

  const message =
    uf === "MG"
      ? "Processo de MG criado com sucesso"
      : "Processo fora de MG criado com sucesso";

  return res.status(201).json({ data: created, message });
};

// Listar processos
export const listProcesses = async (req: Request, res: Response) => {
  const items = await prisma.process.findMany({
    orderBy: { id: "desc" },
    include: { progress: { orderBy: { data: "desc" } } },
  });
  res.json({ data: items });
};

// Obter processo por ID
export const getProcessById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const found = await prisma.process.findUnique({
    where: { id },
    include: { progress: { orderBy: { data: "desc" } } },
  });

  if (!found) return res.status(404).json({ error: "Processo não encontrado" });

  res.json({ data: found });
};

// Atualizar processo
export const updateProcess = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await prisma.process.update({
    where: { id },
    data: req.body,
  });
  res.json({ data: updated });
};

// Excluir processo
export const deleteProcess = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.process.delete({ where: { id } });
  res.status(204).send();
};
