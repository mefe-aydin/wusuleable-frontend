import { apiFetch } from "@/api/http";
import { getAuthToken } from "@/lib/authToken";

export type LoginRequest = {
  email: string;
  password: string;
};

// Backend response (Swagger / actual):
// { ok: true, token: string, userId: number, userTypeId: number }
export type LoginResponse = {
  ok: boolean;
  token: string;
  userId: number;
  userTypeId: number;
};

export async function postLogin(body: LoginRequest): Promise<LoginResponse> {
  return apiFetch<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export type LogoutResponse = {
  ok: boolean;
};

export async function postLogout(): Promise<LogoutResponse> {
  const token = getAuthToken();
  return apiFetch<LogoutResponse>("/api/auth/logout", {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}


