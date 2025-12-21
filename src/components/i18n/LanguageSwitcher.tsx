import Link from "next/link";
import { useRouter } from "next/router";

import { toSupportedLocale, type SupportedLocale } from "@/lib/i18n";

type Props = {
  className?: string;
};

const LABELS: Record<SupportedLocale, string> = {
  en: "EN",
  tr: "TR",
};

export function LanguageSwitcher({ className }: Props) {
  const router = useRouter();
  const currentLocale = toSupportedLocale(router.locale);

  return (
    <nav aria-label="Language" className={className}>
      <ul className="flex items-center gap-2 text-sm">
        {(["en", "tr"] as const).map((locale) => {
          const isActive = currentLocale === locale;

          return (
            <li key={locale}>
              <Link
                href={router.asPath}
                locale={locale}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "rounded-full px-3 py-1 transition-colors",
                  isActive
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-zinc-600 hover:bg-black/[.06] dark:text-zinc-300 dark:hover:bg-white/[.10]",
                ].join(" ")}
              >
                {LABELS[locale]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}


