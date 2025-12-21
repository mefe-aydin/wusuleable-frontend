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

  const url = joinUrl(baseUrl, backendPath);
  const method = req.method ?? "GET";

  const shouldForwardBody =
    typeof forwardBody === "boolean" ? forwardBody : method !== "GET" && method !== "HEAD";

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  // Forward cookies to backend (useful for httpOnly auth cookies).
  if (req.headers.cookie) headers.Cookie = req.headers.cookie;

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


