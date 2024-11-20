import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { CreateUser, UpdateUser } from "../types";

export class UserController {
  static async getUsers(_: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getUsers();

      if (users.length === 0) {
        throw new Error("No se encontraron usuarios");
      }

      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const user = await UserService.getUserById(userId);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;

      const user = await UserService.getUserByEmail(email);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body as CreateUser;
      const newUser = await UserService.createUser(user);

      res.json(newUser);
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const user = req.body as UpdateUser;

      const updatedUser = await UserService.updateUser(userId, user);

      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      await UserService.deleteUser(userId);

      res.json({ message: "Userio eliminado correctamente" });
    } catch (error) {
      next(error);
    }
  }
}
