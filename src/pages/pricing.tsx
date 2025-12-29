import { useRouter } from "next/router";
import { useMemo, useState } from "react";

import { ApiError } from "@/api/http";
import { postCreateCustomer, type BillingPeriod, type ProductCode } from "@/api/customers";
import { getAuthToken } from "@/lib/authToken";

type Plan = { code: string; titleTr: string; titleEn: string; priceLabelTr: string; priceLabelEn: string };

const PLANS: Plan[] = [
  { code: "Small", titleTr: "Small", titleEn: "Small", priceLabelTr: "Başlangıç", priceLabelEn: "Starter" },
  { code: "Medium", titleTr: "Medium", titleEn: "Medium", priceLabelTr: "Önerilen", priceLabelEn: "Recommended" },
  { code: "Large", titleTr: "Large", titleEn: "Large", priceLabelTr: "Kurumsal", priceLabelEn: "Business" },
];

export default function PricingPage() {
  const router = useRouter();
  const isTr = router.locale === "tr";

  const [planCode, setPlanCode] = useState<string>(PLANS[1]!.code);
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [customerType, setCustomerType] = useState<"B2B" | "B2C">("B2B");
  const [companyName, setCompanyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [products, setProducts] = useState<Record<ProductCode, boolean>>({
    ACCESSIBILITY_WIDGET: true,
    SEO_SCANNER: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedProducts = useMemo(() => {
    return (Object.keys(products) as ProductCode[]).filter((k) => products[k]);
  }, [products]);

  const onPurchase = async () => {
    setError(null);

    if (!getAuthToken()) {
      router.push("/login");
      return;
    }

    if (selectedProducts.length === 0) {
      setError(isTr ? "En az bir ürün seç." : "Select at least one product.");
      return;
    }

    try {
      setSubmitting(true);

      const productsPayload = selectedProducts.map((productCode) => ({ productCode }));

      if (customerType === "B2B") {
        if (!companyName.trim()) {
          setError(isTr ? "Şirket adı gerekli." : "Company name is required.");
          return;
        }
        await postCreateCustomer({
          companyName: companyName.trim(),
          planCode,
          billingPeriod,
          products: productsPayload,
        });
      } else {
        if (!firstName.trim() || !lastName.trim()) {
          setError(isTr ? "Ad ve soyad gerekli." : "First name and last name are required.");
          return;
        }
        await postCreateCustomer({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          planCode,
          billingPeriod,
          products: productsPayload,
        });
      }

      // Save draft for setup page.
      try {
        window.localStorage.setItem(
          "wusuleable.lastPurchaseDraft",
          JSON.stringify({ productCodes: selectedProducts, planCode, billingPeriod, customerType }),
        );
      } catch {
        // ignore
      }

      await router.push("/setup");
    } catch (e) {
      if (e instanceof ApiError) setError(e.message);
      else setError(isTr ? "İşlem başarısız. Tekrar dene." : "Action failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const title = isTr ? "Fiyatlandırma" : "Pricing";
  const subtitle = isTr
    ? "Ürünlerini seç, müşteri oluştur ve kurulumu başlat. (Ödeme adımı şimdilik kapalı)"
    : "Pick products, create a customer, and start setup. (Payment step is disabled for now)";

  return (
    <section className="mt-8">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-300">{subtitle}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
          <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            {isTr ? "Müşteri türü" : "Customer type"}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCustomerType("B2B")}
              className={[
                "rounded-full border px-4 py-2 text-sm font-semibold",
                customerType === "B2B" ? "border-blue-500 bg-blue-50" : "border-zinc-200",
                "dark:border-white/10 dark:bg-transparent",
              ].join(" ")}
            >
              {isTr ? "Şirket (B2B)" : "Company (B2B)"}
            </button>
            <button
              type="button"
              onClick={() => setCustomerType("B2C")}
              className={[
                "rounded-full border px-4 py-2 text-sm font-semibold",
                customerType === "B2C" ? "border-blue-500 bg-blue-50" : "border-zinc-200",
                "dark:border-white/10 dark:bg-transparent",
              ].join(" ")}
            >
              {isTr ? "Bireysel (B2C)" : "Individual (B2C)"}
            </button>
          </div>

          <div className="mt-4 grid gap-3">
            {customerType === "B2B" ? (
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                  {isTr ? "Şirket adı" : "Company name"}
                </span>
                <input
                  className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder={isTr ? "Örn. Acme Corporation" : "e.g. Acme Corporation"}
                />
              </label>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                    {isTr ? "Ad" : "First name"}
                  </span>
                  <input
                    className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={isTr ? "Ahmet" : "John"}
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                    {isTr ? "Soyad" : "Last name"}
                  </span>
                  <input
                    className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder={isTr ? "Yılmaz" : "Doe"}
                  />
                </label>
              </div>
            )}

            <div className="mt-1">
              <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                {isTr ? "Faturalama periyodu" : "Billing period"}
              </div>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setBillingPeriod("monthly")}
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-semibold",
                    billingPeriod === "monthly" ? "border-blue-500 bg-blue-50" : "border-zinc-200",
                    "dark:border-white/10 dark:bg-transparent",
                  ].join(" ")}
                >
                  {isTr ? "Aylık" : "Monthly"}
                </button>
                <button
                  type="button"
                  onClick={() => setBillingPeriod("yearly")}
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-semibold",
                    billingPeriod === "yearly" ? "border-blue-500 bg-blue-50" : "border-zinc-200",
                    "dark:border-white/10 dark:bg-transparent",
                  ].join(" ")}
                >
                  {isTr ? "Yıllık" : "Yearly"}
                </button>
              </div>
            </div>
          </div>

          <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            {isTr ? "Ürünler" : "Products"}
          </div>
          <div className="mt-4 grid gap-3">
            <label className="flex items-start gap-3 rounded-xl border border-zinc-200 p-4 dark:border-white/10">
              <input
                type="checkbox"
                checked={products.ACCESSIBILITY_WIDGET}
                onChange={(e) => setProducts((p) => ({ ...p, ACCESSIBILITY_WIDGET: e.target.checked }))}
              />
              <div>
                <div className="font-semibold">Accessibility Widget</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-300">
                  {isTr ? "Widget kurulumu + temel erişilebilirlik özellikleri." : "Installable widget + core accessibility features."}
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 rounded-xl border border-zinc-200 p-4 dark:border-white/10">
              <input
                type="checkbox"
                checked={products.SEO_SCANNER}
                onChange={(e) => setProducts((p) => ({ ...p, SEO_SCANNER: e.target.checked }))}
              />
              <div>
                <div className="font-semibold">SEO Scanner</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-300">
                  {isTr ? "SEO + erişilebilirlik denetimi ve aksiyon önerileri." : "SEO + accessibility checks and actionable recommendations."}
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
          <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">{isTr ? "Plan" : "Plan"}</div>
          <div className="mt-4 grid gap-3">
            {PLANS.map((p) => (
              <button
                key={p.code}
                type="button"
                onClick={() => setPlanCode(p.code)}
                className={[
                  "w-full rounded-xl border p-4 text-left transition",
                  planCode === p.code ? "border-blue-500 bg-blue-50" : "border-zinc-200 bg-transparent",
                  "dark:border-white/10 dark:bg-transparent dark:text-zinc-100",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold">{isTr ? p.titleTr : p.titleEn}</div>
                  <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                    {isTr ? p.priceLabelTr : p.priceLabelEn}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {error && <div className="mt-4 text-sm font-semibold text-red-600">{error}</div>}

          <button
            type="button"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 font-extrabold text-white disabled:opacity-80"
            onClick={onPurchase}
            disabled={submitting}
          >
            {submitting ? (isTr ? "İşleniyor..." : "Processing...") : isTr ? "Müşteri oluştur → Kuruluma git" : "Create customer → Go to setup"}
          </button>
        </div>
      </div>
    </section>
  );
}


