import { useRouter } from "next/router";

export default function SeoScannerPage() {
  const router = useRouter();
  const isTr = router.locale === "tr";

  const title = "SEO Scanner";
  const subtitle = isTr
    ? "Sayfanın SEO ve erişilebilirlik temellerini hızlıca tarayıp uygulanabilir öneriler üretir."
    : "Quickly scans SEO and accessibility fundamentals and generates actionable recommendations.";

  const comingSoon = isTr ? "Yakında" : "Coming soon";

  return (
    <section className="mt-8">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-300">{subtitle}</p>
      <div className="mt-6 inline-flex items-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
        {comingSoon}
      </div>
    </section>
  );
}


