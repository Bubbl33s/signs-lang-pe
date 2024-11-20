import { comparePassword } from "../utilities/hashPassword";
import jwt from "jsonwebtoken";
import { UserService } from "./user.service";
import dotenv from "dotenv";

dotenv.config();

export class AuthService {
  static secretKey = process.env.JWT_SECRET_KEY as string;

  static async userLogin(email: string, password: string) {
    if (!this.secretKey) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }

    const user = await UserService.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      this.secretKey,
      {
        expiresIn: "2h",
      },
    );

    return { token, user };
  }

  static async verifyToken(token: string) {
    return jwt.verify(token, this.secretKey);
  }
}
