import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { ApiError } from "@/api/http";
import { getCustomersContext, type CustomerSummary } from "@/api/customers";
import { getAuthToken } from "@/lib/authToken";

export default function DashboardPage() {
  const router = useRouter();
  const isTr = router.locale === "tr";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCustomerId, setActiveCustomerId] = useState<number | null>(null);
  const [customers, setCustomers] = useState<CustomerSummary[]>([]);

  useEffect(() => {
    // Guard: if not logged in, go to login.
    if (!getAuthToken()) {
      router.push("/login");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await getCustomersContext();
        if (cancelled) return;
        setActiveCustomerId(res.activeCustomerId);
        setCustomers(res.customers ?? []);
        setError(null);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof ApiError ? e.message : isTr ? "Veriler alınamadı." : "Failed to load data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeCustomer = useMemo(
    () => customers.find((c) => c.customerId === activeCustomerId) ?? customers[0] ?? null,
    [customers, activeCustomerId],
  );

  const hasAnyEntitlements = useMemo(
    () => customers.some((c) => (c.entitlements?.length ?? 0) > 0),
    [customers],
  );

  const title = isTr ? "Dashboard" : "Dashboard";

  return (
    <section className="mt-8">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>

      {loading && (
        <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-300">
          {isTr ? "Yükleniyor..." : "Loading..."}
        </p>
      )}

      {!loading && error && (
        <p className="mt-4 max-w-2xl font-semibold text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && activeCustomer && (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {!hasAnyEntitlements && (
            <div className="lg:col-span-2 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
              <div className="text-sm font-extrabold">
                {isTr ? "Henüz ürünün yok" : "No products yet"}
              </div>
              <div className="mt-1 text-sm font-semibold opacity-90">
                {isTr
                  ? "Bu hesap için aktif ürün bulunamadı. Ürün seçip müşteri oluşturman gerekiyor."
                  : "No active products found for this account. Pick products and create a customer to continue."}
              </div>
              <div className="mt-4">
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-sm font-extrabold text-white"
                >
                  {isTr ? "Ürün seç → Fiyatlandırma" : "Choose products → Pricing"}
                </Link>
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
            <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
              {isTr ? "Aktif Müşteri" : "Active customer"}
            </div>
            <div className="mt-2 text-xl font-extrabold">{activeCustomer.name}</div>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              {isTr ? "PaymentStatus:" : "PaymentStatus:"} {activeCustomer.paymentStatus}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
            <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
              {isTr ? "Ürünler" : "Entitlements"}
            </div>
            {(activeCustomer.entitlements?.length ?? 0) === 0 ? (
              <div className="mt-3 rounded-xl border border-zinc-200 p-4 text-sm text-zinc-600 dark:border-white/10 dark:text-zinc-300">
                {isTr ? "Bu müşteri için ürün bulunamadı." : "No products found for this customer."}
              </div>
            ) : (
              <ul className="mt-3 grid gap-3">
                {activeCustomer.entitlements.map((e) => (
                  <li key={e.productCode} className="rounded-xl border border-zinc-200 p-4 text-sm dark:border-white/10">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-semibold">{e.productCode}</div>
                      <div className="text-xs font-bold text-zinc-600 dark:text-zinc-300">{e.status}</div>
                    </div>
                    <div className="mt-1 text-zinc-600 dark:text-zinc-300">
                      Plan: {e.planCode}
                    </div>
                    {e.trialEndsAt && (
                      <div className="mt-1 text-zinc-600 dark:text-zinc-300">TrialEndsAt: {e.trialEndsAt}</div>
                    )}
                    {e.currentPeriodEndsAt && (
                      <div className="mt-1 text-zinc-600 dark:text-zinc-300">PeriodEndsAt: {e.currentPeriodEndsAt}</div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
}


