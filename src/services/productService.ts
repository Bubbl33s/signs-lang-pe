import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductService {
  static async getProducts() {
    return prisma.product.findMany();
  }

  static async getProductById(id: string) {
    return prisma.product.findUnique({
      where: { id },
    });
  }
}
