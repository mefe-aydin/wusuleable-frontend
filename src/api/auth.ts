import { apiFetch } from "@/api/http";
import type { ApiResult, AuthUserItem } from "@/api/types";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = ApiResult<AuthUserItem>;

export async function postLogin(body: LoginRequest): Promise<LoginResponse> {
  return apiFetch<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}


