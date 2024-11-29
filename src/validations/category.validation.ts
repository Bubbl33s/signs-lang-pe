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
  icon: z
    .string({
      invalid_type_error:
        "El icono de la categoría debe ser una cadena de texto",
    })
    .optional(),
});
