import { z } from "zod";

export const createCategoryValidation = z.object({
  name: z
    .string({
      required_error: "El nombre de la categoría es requerido",
      invalid_type_error:
        "El nombre de la etiqueta debe ser una cadena de texto",
    })
    .min(3, {
      message: "El nombre de la etiqueta debe tener como mínimo 3 caracteres",
    })
    .max(100, {
      message: "El nombre de la categoría debe tener como máximo 30 caracteres",
    }),
  description: z
    .string({
      required_error: "La descripción de la categoría es requerida",
      invalid_type_error:
        "La descripción de la categoría debe ser una cadena de texto",
    })
    .min(3, {
      message:
        "La descripción de la categoría debe tener como mínimo 3 caracteres",
    })
    .max(100, {
      message:
        "La descripción de la categoría debe tener como máximo 100 caracteres",
    }),
  icon: z
    .string({
      invalid_type_error:
        "El icono de la categoría debe ser una cadena de texto",
    })
    .optional(),
});

export const updateCategoryValidation = z.object({
  name: z
    .string({
      invalid_type_error:
        "El nombre de la etiqueta debe ser una cadena de texto",
    })
    .min(3, {
      message: "El nombre de la etiqueta debe tener como mínimo 3 caracteres",
    })
    .max(100, {
      message: "El nombre de la categoría debe tener como máximo 30 caracteres",
    })
    .optional(),
  description: z
    .string({
      invalid_type_error:
        "La descripción de la categoría debe ser una cadena de texto",
    })
    .min(3, {
      message:
        "La descripción de la categoría debe tener como mínimo 3 caracteres",
    })
    .max(100, {
      message:
        "La descripción de la categoría debe tener como máximo 100 caracteres",
    })
    .optional(),
  icon: z
    .string({
      invalid_type_error:
        "El icono de la categoría debe ser una cadena de texto",
    })
    .optional(),
});
