import { Request, Response, NextFunction } from "express";
import { ContentService } from "../services/content.service";

export class ContentController {
  static async getContents(_: Request, res: Response, next: NextFunction) {
    try {
      const contents = await ContentService.getContents();

      if (!contents) {
        throw new Error("No hay contenido");
      }

      res.json(contents);
    } catch (error) {
      next(error);
    }
  }

  static async getContentById(req: Request, res: Response, next: NextFunction) {
    try {
      const contentId = req.params.id;
      const content = await ContentService.getContentById(contentId);

      if (!content) {
        throw new Error("Contenido no encontrado");
      }

      res.json(content);
    } catch (error) {
      next(error);
    }
  }

  static async getContentsByLabel(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const labelId = req.params.labelId;
      const contents = await ContentService.getContentsByLabel(labelId);

      if (!contents) {
        throw new Error("Contenido no encontrado");
      }

      res.json(contents);
    } catch (error) {
      next(error);
    }
  }

  static async getUnverifiedContentsByLabel(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const labelId = req.params.labelId;
      const contents =
        await ContentService.getUnverifiedContentsByLabel(labelId);

      if (!contents) {
        throw new Error("Contenido no encontrado");
      }

      res.json(contents);
    } catch (error) {
      next(error);
    }
  }

  static async getContentsByContributor(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const contributorId = req.params.contributorId;
      const contents =
        await ContentService.getContentsByContributor(contributorId);

      if (!contents) {
        throw new Error("Contenido no encontrado");
      }

      res.json(contents);
    } catch (error) {
      next(error);
    }
  }

  static async createContent(req: Request, res: Response, next: NextFunction) {
    try {
      const { labelId, contributorId, labelName, categoryId } = req.body;

      const file = req.file;

      if (!file) {
        throw new Error("Archivo requerido");
      }

      const content = await ContentService.createContent({
        fileBuffer: file.buffer,
        labelId,
        labelName,
        contributorId,
        categoryId,
      });

      res.json(content);
    } catch (error) {
      next(error);
    }
  }

  static async verifyContent(req: Request, res: Response, next: NextFunction) {
    try {
      const contentId = req.params.id;
      const content = await ContentService.verifyContent(contentId);

      res.json(content);
    } catch (error) {
      next(error);
    }
  }

  static async deleteContent(req: Request, res: Response, next: NextFunction) {
    try {
      const contentId = req.params.id;
      const content = await ContentService.deleteContent(contentId);

      res.json(content);
    } catch (error) {
      next(error);
    }
  }
}
