import * as z from "zod";
import { CreateUser } from "@/types/user.type";

export const createUserSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters long"),
    email: z
      .string("Email is required")
      .trim()
      .min(1, "Email is required")
      .pipe(z.email("Invalid email address")),
    password: z
      .string("Password is required")
      .trim()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()+-])[A-Za-z\d!@#$%^&*()+-]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and a special character",
      ),
    confirmPassword: z.string("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .transform<CreateUser>(({ confirmPassword: _, ...rest }) => rest);

export const updateUserSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters long"),
});
