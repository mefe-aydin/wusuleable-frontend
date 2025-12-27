import { getAppEnv, type AppEnv } from "@/config/env";

const BACKEND_BASE_URLS: Record<AppEnv, string> = {
  // Local backend default (can still be overridden by BACKEND_BASE_URL in hosting/env)
  local: "https://localhost:7013",
  uat: "https://uat-api.wusuleable.com",
  prod: "https://api.wusuleable.com",
};

/**
 * Server-only backend base URL.
 *
 * - Override with `BACKEND_BASE_URL` in hosting.
 * - Falls back to an environment mapping.
 */
export function getBackendBaseUrl(): string {
  return process.env.BACKEND_BASE_URL ?? BACKEND_BASE_URLS[getAppEnv()];
}


