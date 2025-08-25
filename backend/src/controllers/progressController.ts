import { Request, Response } from "express";
import { PrismaClient, Progress } from "@prisma/client";

const prisma = new PrismaClient();

// Criar andamento
export const createProgress = async (req: Request, res: Response) => {
  const processId = Number(req.params.processId);
  const { data, description }: { data: Date; description: string } = req.body;

  try {
    const created: Progress = await prisma.progress.create({
      data: { processId, data, description },
    });
    res.status(201).json({ data: created });
  } catch (e: any) {
    res
      .status(500)
      .json({ error: "Erro ao criar andamento", details: e.message });
  }
};

// Listar andamentos de um processo
export const listProgressByProcess = async (req: Request, res: Response) => {
  const processId = Number(req.params.processId);
  try {
    const list: Progress[] = await prisma.progress.findMany({
      where: { processId },
      orderBy: { data: "desc" },
    });
    res.json({ data: list });
  } catch (e: any) {
    res
      .status(500)
      .json({ error: "Erro ao listar andamentos", details: e.message });
  }
};

// Atualizar andamento
export const updateProgress = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const updated: Progress = await prisma.progress.update({
      where: { id },
      data: req.body,
    });
    res.json({ data: updated });
  } catch (e: any) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar andamento", details: e.message });
  }
};

// Excluir andamento
export const deleteProgress = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.progress.delete({ where: { id } });
    res.status(204).send();
  } catch (e: any) {
    res
      .status(500)
      .json({ error: "Erro ao excluir andamento", details: e.message });
  }
};
