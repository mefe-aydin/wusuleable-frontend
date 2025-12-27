import type { NextApiRequest, NextApiResponse } from "next";

import { proxyToBackend } from "@/pages/api/_proxy";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Backend endpoint (Swagger): POST https://localhost:7013/users
  return proxyToBackend(req, res, { backendPath: "/users" });
}


