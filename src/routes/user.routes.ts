import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { AuthController } from "../controllers/auth.controller";
import { authenticateToken, authorizeRoles, validate } from "../middlewares";
import { updateUserValidation, createUserValidation } from "../validations";

const router = Router();

router.get("", UserController.getUsers);
router.get(`/:userId`, UserController.getUserById);
router.get(`/email/:email`, UserController.getUserByEmail);
router.post("", validate(createUserValidation), UserController.createUser);
router.put(
  `/:userId`,
  authenticateToken,
  validate(updateUserValidation),
  UserController.updateUser,
);
router.delete(`/:userId`, authenticateToken, UserController.deleteUser);

router.post("/login", AuthController.userLogin);

export default router;
