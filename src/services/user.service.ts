import { User } from "../models";

export class UserService {
  static async getUsers() {
    return User.find();
  }

  static async getUserById(userId: string) {
    return User.findById;
  }

  static async createUser(user: any) {
    return User.create(user);
  }

  static async updateUser(userId: string, user: any) {
    return User.findByIdAndUpdate(userId, user, { new: true });
  }

  static async deleteUser(userId: string) {
    return User.findByIdAndDelete(userId);
  }
}
