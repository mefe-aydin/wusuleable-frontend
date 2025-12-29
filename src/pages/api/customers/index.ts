import type { NextApiRequest, NextApiResponse } from "next";

import { proxyToBackend } from "@/pages/api/_proxy";

// Create customer (B2B/B2C): POST /customers
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return proxyToBackend(req, res, { backendPath: "/customers" });
}


