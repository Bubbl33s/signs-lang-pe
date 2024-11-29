import { z } from "zod";

export const labelNameValidation = z.object({
  name: z
    .string({
      required_error: "El nombre de la etiqueta es requerido",
      invalid_type_error:
        "El nombre de la etiqueta debe ser una cadena de texto",
    })
    .min(3, {
      message: "El nombre de la etiqueta debe tener como mínimo 3 caracteres",
    })
    .max(100, {
      message: "El nombre de la etiqueta debe tener como máximo 100 caracteres",
    }),
  categoryId: z.string({
    required_error: "El ID de la categoría es requerido",
    invalid_type_error: "El ID de la categoría debe ser una cadena de texto",
  }),
});
