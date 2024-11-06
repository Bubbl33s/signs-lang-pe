import { User } from "../models";
import { hashPassword } from "../utilities/hashPassword";

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

  static async createUser(user: any) {
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

  static async updateUser(userId: string, user: any) {
    return User.findByIdAndUpdate(userId, user, { new: true });
  }

  static async deleteUser(userId: string) {
    return User.findByIdAndDelete(userId);
  }
}
