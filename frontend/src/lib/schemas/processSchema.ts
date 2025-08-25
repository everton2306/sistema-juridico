import { z } from "zod";

export const processSchema = z.object({
  number: z.string().min(1, "Número do processo é obrigatório"),
  openingdate: z.string().min(1, "Data de abertura é obrigatória"),
  description: z.string().min(1, "Descrição é obrigatória"),
  customer: z.string().min(1, "Nome do cliente é obrigatório"),
  advocate: z.string().min(1, "Nome do advogado é obrigatório"),
  uf: z
    .string()
    .length(2, "UF deve ter 2 letras")
    .transform((s) => s.toUpperCase()),
});

export type ProcessFormData = z.infer<typeof processSchema>;
