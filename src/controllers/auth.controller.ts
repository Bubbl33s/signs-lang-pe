import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async userLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const { user, token } = await AuthService.userLogin(email, password);
      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  }
}
