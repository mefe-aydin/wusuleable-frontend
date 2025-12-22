import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import { toSupportedLocale, type SupportedLocale } from "@/lib/i18n";

import styles from "./LanguageDropdown.module.scss";

type LocaleOption = {
  locale: SupportedLocale;
  subLabel: string;
  flagSrc: string;
};

const OPTIONS: LocaleOption[] = [
  { locale: "tr", subLabel: "TR", flagSrc: "/flags/tr.svg" },
  { locale: "en", subLabel: "EN", flagSrc: "/flags/en.svg" },
];

export function LanguageDropdown() {
  const router = useRouter();
  const detailsRef = useRef<HTMLDetailsElement | null>(null);
  const currentLocale = toSupportedLocale(router.locale);
  const current = OPTIONS.find((o) => o.locale === currentLocale) ?? OPTIONS[0]!;

  useEffect(() => {
    function close() {
      if (detailsRef.current) detailsRef.current.open = false;
    }

    function onPointerDown(e: PointerEvent) {
      const root = detailsRef.current;
      if (!root || !root.open) return;
      const target = e.target as Node | null;
      if (target && root.contains(target)) return;
      close();
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      const root = detailsRef.current;
      if (!root || !root.open) return;
      e.preventDefault();
      close();
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <details ref={detailsRef} className={styles.root}>
      <summary className={styles.summary} aria-label="Language">
        <img className={styles.flag} src={current.flagSrc} alt="" />
        <span>{current.subLabel}</span>
        <svg
          className={styles.chev}
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 8l4 4 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>

      <div className={styles.menu} role="menu" aria-label="Select language">
        {OPTIONS.map((opt) => {
          const isActive = opt.locale === currentLocale;
          return (
            <Link
              key={opt.locale}
              href={router.asPath}
              locale={opt.locale}
              role="menuitem"
              aria-current={isActive ? "page" : undefined}
              className={[styles.item, isActive ? styles.itemActive : ""].join(" ")}
              onClick={() => {
                if (detailsRef.current) detailsRef.current.open = false;
              }}
            >
              <img className={styles.flag} src={opt.flagSrc} alt="" />
              <span>{opt.subLabel}</span>
            </Link>
          );
        })}
      </div>
    </details>
  );
}


