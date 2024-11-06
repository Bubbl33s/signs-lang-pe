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
      throw new Error("Email already in use");
    }

    const userWithSameUsername = await User.findOne({
      username: user.username,
    });

    if (userWithSameUsername) {
      throw new Error("Username already in use");
    }

    user.password = await hashPassword(user.password);

    return User.create(user);
  }

  static async updateUser(userId: string, user: UpdateUser) {
    const userExists = await this.getUserById(userId);

    if (!userExists) {
      throw new Error("User not found");
    }

    const userWithSameUsername = await User.findOne({
      username: user.username,
    });

    if (userWithSameUsername) {
      throw new Error("Username already in use");
    }

    return User.findByIdAndUpdate(userId, user, { new: true });
  }

  static async deleteUser(userId: string) {
    const userExists = await this.getUserById(userId);

    if (!userExists) {
      throw new Error("User not found");
    }

    return User.findByIdAndDelete(userId);
  }
}
