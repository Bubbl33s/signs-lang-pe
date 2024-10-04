// src/routes/userRoutes.ts
import { Router, Request, Response } from "express";

const router = Router();

// Definimos una ruta simple
router.get("/users", (_: Request, res: Response) => {
  res.json({ message: "Aquí están los usuarios" });
});

// Otra ruta para obtener un usuario por su ID
router.get("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Detalles del usuario con ID ${id}` });
});

export default router;
