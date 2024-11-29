import { Category } from "../models";
import { CreateCategory, UpdateCategory } from "../types/category.types";

export class CategoryService {
  static async getCategories() {
    return Category.find();
  }

  static async getCategoryById(categoryId: string) {
    return Category.findById(categoryId);
  }

  static async getCategoryByName(name: string) {
    return Category.findOne({ name });
  }

  static async createCategory(category: CreateCategory) {
    const categoryExists = await this.getCategoryByName(category.name);

    if (categoryExists) {
      throw new Error("Categoría ya existe");
    }

    return Category.create(category);
  }

  static async updateCategory(categoryId: string, category: UpdateCategory) {
    const categoryExists = await this.getCategoryById(categoryId);

    if (!categoryExists) {
      throw new Error("Categoría no encontrada");
    }

    return Category.findByIdAndUpdate(categoryId, category, { new: true });
  }

  static async deleteCategory(categoryId: string) {
    const categoryExists = await this.getCategoryById(categoryId);

    if (!categoryExists) {
      throw new Error("Categoría no encontrada");
    }

    return Category.findByIdAndDelete(categoryId);
  }
}
