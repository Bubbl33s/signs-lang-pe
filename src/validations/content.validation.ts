import { z } from "zod";

export const createContentValidation = z.object({
  labelName: z
    .string({
      invalid_type_error:
        "El nombre de la etiqueta debe ser una cadena de texto",
    })
    .max(100, {
      message: "El nombre de la etiqueta debe tener como máximo 100 caracteres",
    })
    .optional(),
});
