import { body, param } from "express-validator";

export const validateCreateProgress = [
  param("processId")
    .isInt()
    .withMessage("ID do processo deve ser um número inteiro"),
  body("data")
    .isISO8601()
    .toDate()
    .withMessage("Data deve ser uma data válida"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("Descrição é obrigatória"),
];

export const validateUpdateProgress = [
  param("id").isInt().withMessage("ID do andamento deve ser um número inteiro"),
  body("data")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Data deve ser válida"),
  body("description")
    .optional()
    .isString()
    .withMessage("Descrição deve ser uma string"),
];

export const validateProgressId = [
  param("id").isInt().withMessage("ID do andamento deve ser um número inteiro"),
];

export const validateProcessId = [
  param("processId")
    .isInt()
    .withMessage("ID do processo deve ser um número inteiro"),
];
