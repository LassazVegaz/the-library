import jwt from "jsonwebtoken";
import usersService from "./users.service";
import { cookies } from "next/headers";
import JwtPayload from "@/types/jwt-payload.type";

class AuthService {
  private readonly cookieName: string;

  constructor() {
    const cookieName = process.env.JWT_COOKIE_NAME;
    if (!cookieName) throw new Error("JWT_COOKIE_NAME is not defined");
    this.cookieName = cookieName;
  }

  async signIn(email: string, password: string): Promise<boolean> {
    const verified = await usersService.verifyPassword(email, password);
    if (!verified) return false;

    const expiresIn = this.getExpiresInSeconds();

    const payload: JwtPayload = { id: verified.id, role: verified.role };
    const token = this.generateToken(payload, expiresIn);

    // Add a small buffer to ensure the cookie expires after the token
    await this.setCookie(token, expiresIn + 100);

    return true;
  }

  async getAuth(): Promise<JwtPayload | null> {
    const cookieStore = await cookies();

    const token = cookieStore.get(this.cookieName)?.value;
    if (!token) return null;

    const key = process.env.JWT_SECRET;
    if (!key) throw new Error("JWT_SECRET is not defined");

    return jwt.verify(token, key) as JwtPayload;
  }

  async signOut() {
    const cookieStore = await cookies();
    cookieStore.delete(this.cookieName);
  }

  private generateToken(payload: JwtPayload, expiresIn: number): string {
    const key = process.env.JWT_SECRET;
    if (!key) throw new Error("JWT_SECRET is not defined");

    return jwt.sign(payload, key, { expiresIn });
  }

  private async setCookie(token: string, expiresIn: number) {
    const cookieStore = await cookies();
    cookieStore.set(this.cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: expiresIn,
    });
  }

  private getExpiresInSeconds(): number {
    const expiresIn = process.env.JWT_EXPIRES_IN_DAYS;
    if (!expiresIn) throw new Error("JWT_EXPIRES_IN_DAYS is not defined");
    const expiresInDays = Number.parseInt(expiresIn);
    if (Number.isNaN(expiresInDays))
      throw new Error("Invalid JWT_EXPIRES_IN_DAYS value");

    return expiresInDays * 24 * 60 * 60; // Convert days to seconds
  }
}

const authService = new AuthService();

export default authService;
