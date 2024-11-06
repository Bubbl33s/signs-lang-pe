import { comparePassword } from "../utilities/hashPassword";
import jwt from "jsonwebtoken";
import { UserService } from "./user.service";

const secretKey = process.env.JWT_SECRET_KEY as string;

export class AuthService {
  static async loginUser(email: string, password: string) {
    const user = await UserService.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, {
      expiresIn: "2h",
    });

    return { token, user };
  }

  static async verifyToken(token: string) {
    return jwt.verify(token, secretKey);
  }
}
