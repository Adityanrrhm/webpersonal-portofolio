import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { getPrisma } from "./prisma";

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET environment variable is required");
}
const SECRET: string = secret;

export interface JwtPayload {
  userId: number;
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 12);
}

export function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function signToken(userId: number): string {
  return jwt.sign({ userId } satisfies JwtPayload, SECRET, { expiresIn: "24h" });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export async function verifyAuth(request: NextRequest) {
  const prisma = getPrisma();
  const header = request.headers.get("Authorization");
  if (!header?.startsWith("Bearer ")) return null;

  const payload = verifyToken(header.slice(7));
  if (!payload) return null;

  const user = await prisma.users.findUnique({ where: { id: payload.userId } });
  return user ?? null;
}
