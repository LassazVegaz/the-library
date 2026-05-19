import bcrypt from "bcrypt";
import { User } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { CreateUser, SafeUser, UpdateUser } from "@/types/user.type";

class UsersService {
  async create(user: CreateUser): Promise<SafeUser> {
    const saltRounds = Number.parseInt(process.env.SALT_ROUNDS || "10");
    if (Number.isNaN(saltRounds)) throw new Error("Invalid SALT_ROUNDS value");

    user.password = await bcrypt.hash(user.password, saltRounds);
    const createdUser = await prisma.user.create({ data: user });

    return this.toSafeUser(createdUser);
  }

  async findByEmail(email: string): Promise<SafeUser | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user ? this.toSafeUser(user) : null;
  }

  async findById(id: number): Promise<SafeUser | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? this.toSafeUser(user) : null;
  }

  async getAll(): Promise<SafeUser[]> {
    const users = await prisma.user.findMany();
    return users.map(this.toSafeUser);
  }

  async update(id: number, data: UpdateUser): Promise<SafeUser> {
    const updatedUser = await prisma.user.update({ where: { id }, data });
    return this.toSafeUser(updatedUser);
  }

  async delete(id: number): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }

  async verifyPassword(
    email: string,
    password: string,
  ): Promise<SafeUser | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? this.toSafeUser(user) : null;
  }

  private toSafeUser(user: User): SafeUser {
    const { password: _, ...safeUser } = user;
    return safeUser;
  }
}

const usersService = new UsersService();

export default usersService;
