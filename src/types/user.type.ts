import ROLES from "@/constants/roles.constants";
import { User } from "@/generated/prisma/client";

type Role = (typeof ROLES)[keyof typeof ROLES];

export type SafeUser = Omit<User, "password" | "role"> & { role: Role };

export type CreateUser = Omit<User, "id" | "role">;

export type UpdateUser = Partial<Omit<User, "id" | "password" | "email">>;
