import { User } from "../models";
import { hashPassword } from "../utilities/hashPassword";
import { CreateUser, UpdateUser } from "../types";

export class UserService {
  static async getUsers() {
    return User.find();
  }

  static async getUserById(userId: string) {
    return User.findById(userId);
  }

  static async getUserByEmail(email: string) {
    return User.findOne({ email });
  }

  static async createUser(user: CreateUser) {
    const userWithSameEmail = await this.getUserByEmail(user.email);

    if (userWithSameEmail) {
      throw new Error("Correo electrónico ya en uso");
    }

    const userWithSameUsername = await User.findOne({
      username: user.username,
    });

    if (userWithSameUsername) {
      throw new Error("Nombre de usuario ya en uso");
    }

    user.password = await hashPassword(user.password);

    return User.create(user);
  }

  static async updateUser(userId: string, user: UpdateUser) {
    const userExists = await this.getUserById(userId);

    if (!userExists) {
      throw new Error("Usuario no encontrado");
    }

    const userWithSameUsername = await User.findOne({
      username: user.username,
    });

    if (userWithSameUsername) {
      throw new Error("Nombre de usuario ya en uso");
    }

    return User.findByIdAndUpdate(userId, user, { new: true });
  }

  static async deleteUser(userId: string) {
    const userExists = await this.getUserById(userId);

    if (!userExists) {
      throw new Error("Usuario no encontrado");
    }

    return User.findByIdAndDelete(userId);
  }
}
