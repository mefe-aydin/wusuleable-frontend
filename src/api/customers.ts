import { apiFetch } from "@/api/http";
import { getAuthToken } from "@/lib/authToken";

export type BillingPeriod = "monthly" | "yearly";
export type ProductCode = "ACCESSIBILITY_WIDGET" | "SEO_SCANNER";

export type CustomerProductInput = { productCode: ProductCode };

export type CreateCustomerB2BRequest = {
  companyName: string;
  planCode: string;
  billingPeriod: BillingPeriod;
  products: CustomerProductInput[];
};

export type CreateCustomerB2CRequest = {
  firstName: string;
  lastName: string;
  planCode: string;
  billingPeriod: BillingPeriod;
  products: CustomerProductInput[];
};

export type CreateCustomerRequest = CreateCustomerB2BRequest | CreateCustomerB2CRequest;

// Keep flexible until backend response is finalized (could return created customerId, etc.)
export type CreateCustomerResponse = unknown;

export async function postCreateCustomer(body: CreateCustomerRequest): Promise<CreateCustomerResponse> {
  const token = getAuthToken();
  return apiFetch<CreateCustomerResponse>("/api/customers", {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: JSON.stringify(body),
  });
}

export type PaymentStatus = "Paid" | "Unpaid" | "TrialVersion" | "Initialized";
export type EntitlementStatus = "Paid" | "Trial" | "Pending" | "Active" | "Inactive";

export type CustomerEntitlement = {
  productCode: ProductCode;
  status: EntitlementStatus;
  planCode: string;
  trialEndsAt: string | null;
  currentPeriodEndsAt: string | null;
};

export type CustomerSummary = {
  customerId: number;
  name: string;
  // Backend may temporarily return empty string for new customers.
  paymentStatus: PaymentStatus | "";
  entitlements: CustomerEntitlement[];
};

export type GetCustomersResponse = {
  activeCustomerId: number;
  customers: CustomerSummary[];
};

export async function getCustomersContext(): Promise<GetCustomersResponse> {
  const token = getAuthToken();
  return apiFetch<GetCustomersResponse>("/api/customers/getcustomers", {
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}


