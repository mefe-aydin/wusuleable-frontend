import { apiFetch } from "@/api/http";
import type { ApiResult, AuthUserItem } from "@/api/types";

export type CreateUserRequest = {
  email: string;
  password: string;
  passwordConfirmation: string;
  websiteUrl?: string | null;
};

export type CreateUserResponse = ApiResult<AuthUserItem>;

export async function postCreateUser(body: CreateUserRequest): Promise<CreateUserResponse> {
  return apiFetch<CreateUserResponse>("/api/users/createuser", {
    method: "POST",
    body: JSON.stringify(body),
  });
}


