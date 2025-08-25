import { z } from "zod";

export const progressSchema = z.object({
  data: z.string().min(1, "Data do andamento é obrigatória"),
  description: z.string().min(1, "Descrição do andamento é obrigatória"),
});

export type ProgressFormData = z.infer<typeof progressSchema>;
