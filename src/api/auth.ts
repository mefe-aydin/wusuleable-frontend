import { apiFetch } from "@/api/http";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  ok: true;
};

export async function postLogin(body: LoginRequest): Promise<LoginResponse> {
  return apiFetch<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}


