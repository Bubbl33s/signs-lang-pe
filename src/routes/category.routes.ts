import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { authenticateToken, authorizeRoles, validate } from "../middlewares";
import {
  createCategoryValidation,
  updateCategoryValidation,
} from "../validations";

const router = Router();

router.get("/", CategoryController.getCategories);
router.get("/:id", CategoryController.getCategoryById);
router.get("/name/:name", CategoryController.getCategoryByName);
router.post(
  "/",
  authenticateToken,
  authorizeRoles(["admin"]),
  validate(createCategoryValidation),
  CategoryController.createCategory,
);
router.patch(
  "/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  validate(updateCategoryValidation),
  CategoryController.updateCategory,
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  CategoryController.deleteCategory,
);

export default router;
