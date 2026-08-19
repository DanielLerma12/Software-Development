import z from "zod";

const baseUsersSchema = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters long")
    .max(15, "Username cannot surpass 15 characters long")
    .regex(
      /^[a-zA-Z0-9_.-]+$/,
      "Just letters, numbers and some characters (_, -, .) are allowed",
    ),
  password: z
    .string()
    .min(5, "Password must be at least 8 characters long")
    .max(50, "Password cannot surpass 50 characters long")
    .regex(/[A-Z]/, "Password must contain at least one Uppercase")
    .regex(/[a-z]/, "Password must contain at least one Lowercase")
    .regex(/[0-9]/, "Password must contain at least a number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
});

export function ValidateUser(object) {
  return baseUsersSchema.safeParse(object);
}
