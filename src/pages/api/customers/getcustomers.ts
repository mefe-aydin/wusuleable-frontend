import type { NextApiRequest, NextApiResponse } from "next";

import { proxyToBackend } from "@/pages/api/_proxy";

// Backend: GET /customer/getcustomers
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return proxyToBackend(req, res, { backendPath: "/customer/getcustomers", forwardBody: false });
}


