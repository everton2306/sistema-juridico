// src/routes/progress.ts
import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { body, param, validationResult } from "express-validator";

const router = Router();
const prisma = new PrismaClient();

// Middleware para validação dos dados
const handleValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Criar andamento
router.post(
  "/:processId",
  param("processId").isInt(),
  body("data").isISO8601().toDate(),
  body("description").isString().notEmpty(),
  handleValidation,
  async (req: Request, res: Response) => {
    const processId = Number(req.params.processId);
    const { data, description } = req.body;

    try {
      const created = await prisma.progress.create({
        data: { processId, data, description },
      });
      res.status(201).json({ data: created });
    } catch (e: any) {
      res
        .status(500)
        .json({ error: "Erro ao criar andamento", details: e.message });
    }
  }
);

// Listar andamentos de um processo
router.get(
  "/:processId",
  param("processId").isInt(),
  handleValidation,
  async (req: Request, res: Response) => {
    const processId = Number(req.params.processId);

    try {
      const list = await prisma.progress.findMany({
        where: { processId },
        orderBy: { data: "desc" },
      });
      res.json({ data: list });
    } catch (e: any) {
      res
        .status(500)
        .json({ error: "Erro ao listar andamentos", details: e.message });
    }
  }
);

// Atualizar andamento
router.put(
  "/:id",
  param("id").isInt(),
  body("data").optional().isISO8601().toDate(),
  body("description").optional().isString(),
  handleValidation,
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      const updated = await prisma.progress.update({
        where: { id },
        data: req.body,
      });
      res.json({ data: updated });
    } catch (e: any) {
      res
        .status(500)
        .json({ error: "Erro ao atualizar andamento", details: e.message });
    }
  }
);

// Excluir andamento
router.delete(
  "/:id",
  param("id").isInt(),
  handleValidation,
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      await prisma.progress.delete({ where: { id } });
      res.status(204).send();
    } catch (e: any) {
      res
        .status(500)
        .json({ error: "Erro ao excluir andamento", details: e.message });
    }
  }
);

export default router;
