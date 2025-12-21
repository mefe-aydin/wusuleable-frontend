export type AppEnv = "local" | "uat" | "prod";

export function getAppEnv(): AppEnv {
  // Prefer server-only env if present (safe to set in hosting config).
  const raw =
    process.env.APP_ENV ??
    process.env.NEXT_PUBLIC_APP_ENV ??
    (process.env.NODE_ENV === "development" ? "local" : "prod");

  if (raw === "local" || raw === "uat" || raw === "prod") return raw;
  return process.env.NODE_ENV === "development" ? "local" : "prod";
}


