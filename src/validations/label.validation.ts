import { z } from "zod";

export const labelNameValidation = z.object({
  name: z
    .string({
      required_error: "El nombre de la etiqueta es requerido",
      invalid_type_error:
        "El nombre de la etiqueta debe ser una cadena de texto",
    })
    .max(100, {
      message: "El nombre de la etiqueta debe tener como máximo 100 caracteres",
    }),
});
