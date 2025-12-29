import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { getAuthToken } from "@/lib/authToken";

type PurchaseDraft = {
  productCodes: string[];
  planCode?: string | null;
  customerId?: number | null;
};

function readDraft(): PurchaseDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem("wusuleable.lastPurchaseDraft");
    return raw ? (JSON.parse(raw) as PurchaseDraft) : null;
  } catch {
    return null;
  }
}

export default function SetupPage() {
  const router = useRouter();
  const isTr = router.locale === "tr";
  const [draft, setDraft] = useState<PurchaseDraft | null>(null);

  useEffect(() => {
    // Basic guard: if not logged in, push to login.
    if (!getAuthToken()) {
      router.push("/login");
      return;
    }
    setDraft(readDraft());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const title = isTr ? "Kurulum" : "Setup";
  const subtitle = isTr
    ? "Ürünlerini etkinleştirmek için aşağıdaki adımları tamamla."
    : "Complete the steps below to activate your products.";

  const items = useMemo(() => {
    const codes = draft?.productCodes ?? [];
    return codes.length ? codes : ["ACCESSIBILITY_WIDGET"];
  }, [draft?.productCodes]);

  return (
    <section className="mt-8">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-300">{subtitle}</p>

      <div className="mt-6 max-w-2xl rounded-2xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
        <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
          {isTr ? "Seçilen ürünler" : "Selected products"}
        </div>
        <ul className="mt-3 list-disc pl-6 text-sm text-zinc-600 dark:text-zinc-300">
          {items.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>

        <div className="mt-6 grid gap-3">
          <div className="rounded-xl border border-zinc-200 p-4 text-sm dark:border-white/10">
            <div className="font-semibold">{isTr ? "1) Domain ekle" : "1) Add domain"}</div>
            <div className="mt-1 text-zinc-600 dark:text-zinc-300">
              {isTr
                ? "Sitenin domain’ini ekle, doğrulama adımlarını tamamla."
                : "Add your website domain and complete verification steps."}
            </div>
          </div>
          <div className="rounded-xl border border-zinc-200 p-4 text-sm dark:border-white/10">
            <div className="font-semibold">{isTr ? "2) Script’i ekle" : "2) Install script"}</div>
            <div className="mt-1 text-zinc-600 dark:text-zinc-300">
              {isTr
                ? "Widget/script tag’ini sitene ekle ve çalıştığını kontrol et."
                : "Add the widget/script tag to your site and verify it works."}
            </div>
          </div>
          <div className="rounded-xl border border-zinc-200 p-4 text-sm dark:border-white/10">
            <div className="font-semibold">{isTr ? "3) Kontrol & rapor" : "3) Verify & report"}</div>
            <div className="mt-1 text-zinc-600 dark:text-zinc-300">
              {isTr
                ? "Kurulum tamamlanınca dashboard’dan durum ve raporları görebilirsin."
                : "Once installed, you can view status and reports on the dashboard."}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


