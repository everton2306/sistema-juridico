// src/routes/processes.ts
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

// --- CRUD de Processos ---

// Criar processo
router.post(
  "/",
  body("number").isString().notEmpty(),
  body("openingdate").isISO8601().toDate(),
  body("description").isString().notEmpty(),
  body("customer").isString().notEmpty(),
  body("advocate").isString().notEmpty(),
  body("uf").isString().isLength({ min: 2, max: 2 }).toUpperCase(),
  handleValidation,
  async (req: Request, res: Response) => {
    const { number, openingdate, description, customer, advocate, uf } =
      req.body;

    try {
      const created = await prisma.process.create({
        data: { number, openingdate, description, customer, advocate, uf },
      });

      const message =
        uf === "MG"
          ? "Processo de MG criado com sucesso"
          : "Processo fora de MG criado com sucesso";

      res.status(201).json({ data: created, message });
    } catch (e: any) {
      if (e.code === "P2002") {
        return res.status(409).json({ error: "Número de processo já existe." });
      }
      res
        .status(500)
        .json({ error: "Erro ao criar processo", details: e.message });
    }
  }
);

// Listar todos os processos
router.get("/", async (req: Request, res: Response) => {
  const items = await prisma.process.findMany({
    orderBy: { id: "desc" },
    include: { progress: { orderBy: { data: "desc" } } },
  });
  res.json({ data: items });
});

// Obter processo por ID
router.get(
  "/:id",
  param("id").isInt(),
  handleValidation,
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const found = await prisma.process.findUnique({
      where: { id },
      include: { progress: { orderBy: { data: "desc" } } },
    });

    if (!found)
      return res.status(404).json({ error: "Processo não encontrado" });

    res.json({ data: found });
  }
);

// Atualizar processo
router.put(
  "/:id",
  param("id").isInt(),
  body("number").optional().isString().notEmpty(),
  body("openingdate").optional().isISO8601().toDate(),
  body("description").optional().isString().notEmpty(),
  body("customer").optional().isString().notEmpty(),
  body("advocate").optional().isString().notEmpty(),
  body("uf").optional().isString().isLength({ min: 2, max: 2 }).toUpperCase(),
  handleValidation,
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      const updated = await prisma.process.update({
        where: { id },
        data: req.body,
      });
      res.json({ data: updated });
    } catch (e: any) {
      res
        .status(500)
        .json({ error: "Erro ao atualizar processo", details: e.message });
    }
  }
);

// Excluir processo
router.delete(
  "/:id",
  param("id").isInt(),
  handleValidation,
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      await prisma.process.delete({ where: { id } });
      res.status(204).send();
    } catch (e: any) {
      res
        .status(500)
        .json({ error: "Erro ao excluir processo", details: e.message });
    }
  }
);

export default router;
