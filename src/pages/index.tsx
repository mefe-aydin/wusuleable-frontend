import Link from "next/link";
import { useRouter } from "next/router";

import { getHomeCopy } from "@/content/home";
import { toSupportedLocale } from "@/lib/i18n";
import { SiteLayout } from "@/layouts/SiteLayout";

export default function Home() {
  const router = useRouter();
  const locale = toSupportedLocale(router.locale);
  const copy = getHomeCopy(locale);

  return (
    <SiteLayout>
      <section className="mt-8 max-w-2xl">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight">
          {copy.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          {copy.subtitle}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-black px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            {copy.ctaPrimary}
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex h-12 items-center justify-center rounded-full border border-black/[.10] px-5 text-sm font-medium text-zinc-950 transition-colors hover:bg-black/[.04] dark:border-white/[.18] dark:text-zinc-50 dark:hover:bg-white/[.08]"
          >
            {copy.ctaSecondary}
          </Link>
        </div>

        <div className="mt-10 rounded-2xl border border-black/[.08] bg-white p-6 text-sm text-zinc-600 dark:border-white/[.12] dark:bg-black dark:text-zinc-300">
          <p className="font-medium text-zinc-900 dark:text-zinc-50">
            Locale debug
          </p>
          <p className="mt-2">
            router.locale: <span className="font-mono">{String(router.locale)}</span>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
