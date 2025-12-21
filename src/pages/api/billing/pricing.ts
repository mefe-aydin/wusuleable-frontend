import type { NextApiRequest, NextApiResponse } from "next";

import { proxyToBackend } from "@/pages/api/_proxy";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return proxyToBackend(req, res, { backendPath: "/billing/pricing", forwardBody: false });
}


