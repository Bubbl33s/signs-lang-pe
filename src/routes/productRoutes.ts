import { Router } from "express";
import { ProductController } from "../controllers/productController";

const router = Router();
const PREFIX = "/products";

router.get(PREFIX, ProductController.getProducts);
router.get(`${PREFIX}/id/:id`, ProductController.getProductById);
export default router;
