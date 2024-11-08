import { Router } from "express";
import { ContentController } from "../controllers/content.controller";
import { authenticateToken, authorizeRoles, upload } from "../middlewares";

const router = Router();

router.get("/", ContentController.getContents);
router.get("/:id", ContentController.getContentById);
router.get("/label/:labelId", ContentController.getContentsByLabel);
router.post(
  "/",
  authenticateToken,
  authorizeRoles(["user", "moderator"]),
  upload.single("file"),
  ContentController.createContent,
);
router.patch(
  "/:id/verify",
  authenticateToken,
  authorizeRoles(["moderator"]),
  ContentController.verifyContent,
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles(["moderator"]),
  ContentController.deleteContent,
);

export default router;
