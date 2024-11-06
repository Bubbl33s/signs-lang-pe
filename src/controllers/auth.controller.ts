import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async userLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const { user, token } = await AuthService.userLogin(email, password);
      res.json({ user, token });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}
