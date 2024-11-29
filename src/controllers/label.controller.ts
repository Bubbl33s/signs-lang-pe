import { Request, Response, NextFunction } from "express";
import { LabelService } from "../services/label.service";

export class LabelController {
  static async getLabels(_: Request, res: Response, next: NextFunction) {
    try {
      const labels = await LabelService.getLabels();

      if (!labels) {
        throw new Error("No hay etiquetas");
      }

      res.json(labels);
    } catch (error) {
      next(error);
    }
  }

  static async getLabelById(req: Request, res: Response, next: NextFunction) {
    try {
      const labelId = req.params.id;
      const label = await LabelService.getLabelById(labelId);

      if (!label) {
        throw new Error("Etiqueta no encontrada");
      }

      res.json(label);
    } catch (error) {
      next(error);
    }
  }

  static async getLabelByName(req: Request, res: Response, next: NextFunction) {
    try {
      const name = req.params.name;
      const label = await LabelService.getLabelByName(name);

      if (!label) {
        throw new Error("Etiqueta no encontrada");
      }

      res.json(label);
    } catch (error) {
      next(error);
    }
  }

  static async getLabelsByCategory(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const categoryId = req.params.categoryId;
      const labels = await LabelService.getLabelsByCategory(categoryId);

      if (!labels) {
        throw new Error("No hay etiquetas");
      }

      res.json(labels);
    } catch (error) {
      next(error);
    }
  }

  static async updateLabel(req: Request, res: Response, next: NextFunction) {
    try {
      const labelId = req.params.id;
      const { name } = req.body;
      const label = await LabelService.updateLabel(labelId, name);

      res.json(label);
    } catch (error) {
      next(error);
    }
  }

  static async verifyLabel(req: Request, res: Response, next: NextFunction) {
    try {
      const labelId = req.params.id;
      const label = await LabelService.verifyLabel(labelId);

      res.json(label);
    } catch (error) {
      next(error);
    }
  }

  static async deleteLabel(req: Request, res: Response, next: NextFunction) {
    try {
      const labelId = req.params.id;
      await LabelService.deleteLabel(labelId);

      res.json({ message: "Etiqueta eliminada" });
    } catch (error) {
      next(error);
    }
  }
}
