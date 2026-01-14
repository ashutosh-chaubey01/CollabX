import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const AUTH_COOKIE_NAME =
  process.env.AUTH_COOKIE_NAME || "CollabX_token";

export type AuthTokenPayload = {
  userId: string;
  email: string;
  role: "user" | "admin";
};

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      "JWT_SECRET is not defined. Check .env.local and restart the server."
    );
  }
  return secret;
}

export function signAuthToken(payload: AuthTokenPayload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
}

export function verifyAuthToken(token: string): AuthTokenPayload | null {
  try {
    return jwt.verify(token, getJwtSecret()) as AuthTokenPayload;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: NextRequest) {
  const header = req.headers.get("authorization");
  if (header) {
    const [scheme, tokenFromHeader] = header.split(" ");
    if (scheme === "Bearer" && tokenFromHeader) {
      return tokenFromHeader;
    }
  }

  const cookieToken = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  return cookieToken ?? null;
}

export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export function clearAuthCookie(response: NextResponse) {
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
}

export async function getRequestUser(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return null;

  const payload = verifyAuthToken(token);
  if (!payload) return null;

  await connectToDatabase();
  const user = await User.findById(payload.userId);
  if (!user) return null;

  return { user, payload };
}

export async function requireRequestUser(req: NextRequest) {
  const auth = await getRequestUser(req);
  if (!auth) {
    throw new Error("Unauthorized request");
  }
  return auth;
}
