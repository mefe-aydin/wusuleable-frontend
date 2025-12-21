import { apiFetch } from "@/api/http";

export type PricingPlan = {
  id: string;
  name: string;
  monthlyPrice: number;
  currency: string;
};

export type PricingResponse = {
  plans: PricingPlan[];
};

export async function getPricing(): Promise<PricingResponse> {
  return apiFetch<PricingResponse>("/api/billing/pricing");
}


