import { ValidateUser } from "./schemas/users.js";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";

export class UserRepository {
  static async create({ user }) {
    const result = ValidateUser(user);

    if (!result.success)
      return { state: false, prompt: result.error.issues[0].message };

    const password = user.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const dbResult = await prisma.users.create({
        data: {
          user_name: user.username,
          password: hashedPassword,
        },
      });
      return { state: true, prompt: "User successfully created" };
    } catch (e) {
      if (e.code === "P2002")
        return {
          state: false,
          prompt: "Duplication type error, username already exists",
        };
      return { state: false, prompt: e };
    }
  }

  static async login({ user }) {
    const result = ValidateUser(user);

    if (!result.success)
      return { state: false, prompt: result.error.issues[0].message };

    try {
      const userVal = await prisma.users.findUnique({
        where: {
          user_name: user.username,
        },
      });

      if (!userVal) return { state: false, prompt: "User does not exist" };

      const passwordVal = await bcrypt.compare(user.password, userVal.password);

      if (!passwordVal) return { state: false, prompt: "Incorrect password" };

      return { state: true, prompt: "Successfull login" };
    } catch (e) {
      return { state: false, prompt: e };
    }
  }
}
