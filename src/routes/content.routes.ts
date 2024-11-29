import { Router } from "express";
import { ContentController } from "../controllers/content.controller";
import { createContentValidation } from "../validations/content.validation";
import {
  authenticateToken,
  authorizeRoles,
  validate,
  upload,
} from "../middlewares";

const router = Router();

router.get("/", ContentController.getContents);
router.get("/:id", ContentController.getContentById);
router.get("/label/:labelId", ContentController.getContentsByLabel);
router.get(
  "/contributor/:contributorId",
  ContentController.getContentsByContributor,
);
router.post(
  "/",
  authenticateToken,
  authorizeRoles(["user", "moderator", "admin"]),
  validate(createContentValidation),
  upload.single("file"),
  ContentController.createContent,
);
router.patch(
  "/:id/verify",
  authenticateToken,
  authorizeRoles(["moderator", "admin"]),
  ContentController.verifyContent,
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles(["moderator", "admin"]),
  ContentController.deleteContent,
);

export default router;
