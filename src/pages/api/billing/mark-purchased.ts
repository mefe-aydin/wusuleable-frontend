import type { NextApiRequest, NextApiResponse } from "next";

import { proxyToBackend } from "@/pages/api/_proxy";

// Fake purchase endpoint (no payment for now).
// Backend should implement: POST /billing/mark-purchased
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return proxyToBackend(req, res, { backendPath: "/billing/mark-purchased" });
}


