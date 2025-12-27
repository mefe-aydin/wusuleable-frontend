import type { NextApiRequest, NextApiResponse } from "next";

import { getBackendBaseUrl } from "@/config/urls.server";

type ProxyOptions = {
  backendPath: string;
  /**
   * If true, forward the request body (default true for non-GET).
   * Useful for GET routes that should ignore incoming bodies.
   */
  forwardBody?: boolean;
};

function joinUrl(base: string, path: string): string {
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

function isLocalhostUrl(url: string): boolean {
  try {
    const u = new URL(url);
    const host = u.hostname;
    return host === "localhost" || host === "127.0.0.1" || host === "::1";
  } catch {
    return false;
  }
}

export async function proxyToBackend(
  req: NextApiRequest,
  res: NextApiResponse,
  { backendPath, forwardBody }: ProxyOptions,
) {
  const baseUrl = getBackendBaseUrl();
  if (!baseUrl) {
    res.status(500).json({ message: "BACKEND_BASE_URL is not configured." });
    return;
  }

  // Local dev escape hatch for self-signed HTTPS certs.
  // Prefer trusting your dev certificate instead of using this.
  // Enable with BACKEND_INSECURE_TLS=true (server-only).
  if (
    process.env.BACKEND_INSECURE_TLS === "true" ||
    process.env.BACKEND_INSECURE_TLS === "1" ||
    (process.env.NODE_ENV === "development" && baseUrl.startsWith("https://") && isLocalhostUrl(baseUrl))
  ) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  const url = joinUrl(baseUrl, backendPath);
  const method = req.method ?? "GET";

  const shouldForwardBody =
    typeof forwardBody === "boolean" ? forwardBody : method !== "GET" && method !== "HEAD";

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  // Forward cookies to backend (useful for httpOnly auth cookies).
  if (req.headers.cookie) headers.Cookie = req.headers.cookie;

  // Forward bearer auth if provided by the client.
  if (typeof req.headers.authorization === "string") {
    headers.Authorization = req.headers.authorization;
  }

  // Forward content-type if present.
  if (typeof req.headers["content-type"] === "string") {
    headers["Content-Type"] = req.headers["content-type"];
  }

  const body =
    shouldForwardBody && req.body !== undefined
      ? typeof req.body === "string"
        ? req.body
        : JSON.stringify(req.body)
      : undefined;

  const upstream = await fetch(url, {
    method,
    headers,
    body,
  });

  // Forward set-cookie from backend so browser stores session/refresh cookies.
  const setCookie = upstream.headers.get("set-cookie");
  if (setCookie) res.setHeader("set-cookie", setCookie);

  const text = await upstream.text();
  res.status(upstream.status);

  // Keep response content-type if backend sets it, else default to JSON.
  const ct = upstream.headers.get("content-type") ?? "application/json; charset=utf-8";
  res.setHeader("content-type", ct);

  res.send(text);
}


