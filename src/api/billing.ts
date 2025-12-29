import { apiFetch } from "@/api/http";
import { getAuthToken } from "@/lib/authToken";

export type ProductCode = "ACCESSIBILITY_WIDGET" | "SEO_SCANNER";

export type MarkPurchasedRequest = {
  productCodes: ProductCode[];
  planCode?: string | null;
  customerId?: number | null;
};

export type MarkPurchasedResponse = {
  ok: boolean;
};

export async function postMarkPurchased(body: MarkPurchasedRequest): Promise<MarkPurchasedResponse> {
  const token = getAuthToken();
  return apiFetch<MarkPurchasedResponse>("/api/billing/mark-purchased", {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: JSON.stringify(body),
  });
}


