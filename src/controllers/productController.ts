import { Request, Response } from "express";
import { ProductService } from "../services/productService";

export class ProductController {
  static async getProducts(_: Request, res: Response) {
    const products = await ProductService.getProducts();

    res.json(products);
  }

  static async getProductById(req: Request, res: Response) {
    const { id } = req.params;
    const product = await ProductService.getProductById(id);

    res.json(product);
  }
}
