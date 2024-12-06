import { z } from "zod";

export const updateUserValidation = z.object({
  username: z
    .string({
      required_error: "El nombre de usuario es requerido",
      invalid_type_error: "El nombre de usuario debe ser una cadena de texto",
    })
    .min(8, {
      message: "El nombre de usuario debe tener al menos 3 caracteres",
    })
    .max(20, {
      message: "El nombre de usuario debe tener como máximo 255 caracteres",
    }),
  fullName: z
    .string({
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser una cadena de texto",
    })
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres",
    })
    .max(255, {
      message: "El nombre debe tener como máximo 255 caracteres",
    }),
  isDeafMute: z
    .boolean({
      invalid_type_error: "El campo debe ser un booleano",
    })
    .optional(),
  knowsSignLanguage: z
    .boolean({
      invalid_type_error: "El campo debe ser un booleano",
    })
    .optional(),
  role: z
    .enum(["user", "moderator", "admin"], {
      message: "El rol debe ser 'user', 'moderator' o 'admin'",
    })
    .optional(),
});

export const createUserValidation = z.object({
  ...updateUserValidation.shape,
  email: z
    .string({
      required_error: "El correo es requerido",
      invalid_type_error: "El correo debe ser una cadena de texto",
    })
    .email({
      message: "Dirección de correo inválida",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
      invalid_type_error: "La contraseña debe ser una cadena de texto",
    })
    .min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    })
    .max(25, {
      message: "La contraseña debe tener como máximo 25 caracteres",
    })
    .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])/, {
      message:
        "La contraseña debe tener al menos una letra mayúscula, un número y un caracter especial",
    }),
});
