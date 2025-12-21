import { apiFetch } from "@/api/http";

export type MainPageResponse = {
  heroTitle: string;
  heroSubtitle: string;
};

export async function getMainPage(): Promise<MainPageResponse> {
  return apiFetch<MainPageResponse>("/api/marketing/main");
}


