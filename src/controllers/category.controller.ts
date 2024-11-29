import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  static async getCategories(_: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getCategories();

      if (!categories) {
        throw new Error("No se encontraron categorías");
      }

      res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { categoryId } = req.params;
      const category = await CategoryService.getCategoryById(categoryId);

      if (!category) {
        throw new Error("Categoría no encontrada");
      }

      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryByName(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { name } = req.params;
      const category = await CategoryService.getCategoryByName(name);

      if (!category) {
        throw new Error("Categoría no encontrada");
      }

      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.createCategory(req.body);

      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;
      const category = await CategoryService.updateCategory(
        categoryId,
        req.body,
      );

      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;
      const category = await CategoryService.deleteCategory(categoryId);

      res.json(category);
    } catch (error) {
      next(error);
    }
  }
}
