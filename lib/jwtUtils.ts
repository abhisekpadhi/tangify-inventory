// lib/jwt.ts
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "notARealSecret");

// Create JWT
async function createJWT(payload: Record<string, unknown>, expiresIn = "6h"): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })  // algorithm
    .setIssuedAt()
    .setExpirationTime(expiresIn)          // e.g. "1h", "2d", "15m"
    .sign(secret);
}

// Verify JWT
async function verifyJWT<T = any>(token: string): Promise<T | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as T;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}

export const jwtUtils = { createJWT, verifyJWT}
