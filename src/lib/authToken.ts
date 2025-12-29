import { userTypeFromId } from "@/lib/userType";

const TOKEN_KEY = "wusuleable.token";
const EVENT_NAME = "wusuleable:auth-token";

let inMemoryToken: string | null = null;

function emitAuthTokenChange() {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new Event(EVENT_NAME));
  } catch {
    // ignore
  }
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY) ?? inMemoryToken;
  } catch {
    return inMemoryToken;
  }
}

export function setAuthToken(token: string) {
  if (typeof window === "undefined") return;
  inMemoryToken = token;
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch (err) {
    // If localStorage is blocked (some privacy modes), we still keep in-memory token.
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.warn("[auth] Failed to persist token to localStorage:", err);
    }
  }
  emitAuthTokenChange();
}

export function clearAuthToken() {
  if (typeof window === "undefined") return;
  inMemoryToken = null;
  try {
    window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
  emitAuthTokenChange();
}

type JwtPayload = {
  userId?: string;
  userTypeId?: string;
  userType?: string;
  email?: string;
  languageCode?: string;
  iat?: number;
  nbf?: number;
  exp?: number;
  iss?: string;
  aud?: string;
  [key: string]: unknown;
};

/**
 * Decode JWT token payload (client-side only, no verification).
 * Returns null if token is invalid or malformed.
 */
export function decodeJwtPayload(token: string | null): JwtPayload | null {
  if (!token || typeof token !== "string") return null;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded) as JwtPayload;
  } catch {
    return null;
  }
}

/**
 * Get user info from current auth token.
 * Returns null if no token or token is invalid.
 */
export function getUserFromToken(): {
  userId: string | null;
  userType: string | null;
  userTypeId: string | null;
  email: string | null;
  languageCode: string | null;
} | null {
  const token = getAuthToken();
  if (!token) return null;

  const payload = decodeJwtPayload(token);
  if (!payload) return null;

  return {
    userId: payload.userId ?? null,
    userType: payload.userType ?? userTypeFromId(payload.userTypeId) ?? null,
    userTypeId: payload.userTypeId ?? null,
    email: payload.email ?? null,
    languageCode: typeof payload.languageCode === "string" ? payload.languageCode : null,
  };
}


