import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { AuthController } from "../controllers/auth.controller";
import { authenticateToken, authorizeRoles, validate } from "../middlewares";
import { updateUserValidation, createUserValidation } from "../validations";

const router = Router();
const PREFIX = "/users";

router.get(PREFIX, UserController.getUsers);
router.get(`${PREFIX}/:userId`, UserController.getUserById);
router.get(`${PREFIX}/email/:email`, UserController.getUserByEmail);
router.post(PREFIX, validate(createUserValidation), UserController.createUser);
router.put(
  `${PREFIX}/:userId`,
  authenticateToken,
  validate(updateUserValidation),
  UserController.updateUser,
);
router.delete(
  `${PREFIX}/:userId`,
  authenticateToken,
  UserController.deleteUser,
);

router.post("/login", AuthController.userLogin);

export default router;
