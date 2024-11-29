import { Router } from "express";
import { LabelController } from "../controllers/label.controller";
import { authenticateToken, authorizeRoles, validate } from "../middlewares";
import { labelNameValidation } from "../validations";

const router = Router();

router.get("/", LabelController.getLabels);
router.get("/:id", LabelController.getLabelById);
router.get("/name/:name", LabelController.getLabelByName);
router.get("/category/:categoryId", LabelController.getLabelsByCategory);
router.patch(
  "/:id",
  authenticateToken,
  authorizeRoles(["user", "moderator", "admin"]),
  validate(labelNameValidation),
  LabelController.updateLabel,
);
router.patch(
  "/:id/verify",
  authenticateToken,
  authorizeRoles(["moderator", "admin"]),
  LabelController.verifyLabel,
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles(["moderator", "admin"]),
  LabelController.deleteLabel,
);

export default router;
