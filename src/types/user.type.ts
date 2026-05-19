import { User } from "@/generated/prisma/client";

export type SafeUser = Omit<User, "password">;

export type CreateUser = Omit<User, "id">;

export type UpdateUser = Partial<Omit<User, "id" | "password">>;
