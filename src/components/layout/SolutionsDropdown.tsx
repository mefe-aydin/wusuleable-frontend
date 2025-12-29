import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import styles from "./SolutionsDropdown.module.scss";

type Item = { href: string; label: string };

export function SolutionsDropdown() {
  const router = useRouter();
  const isTr = router.locale === "tr";
  const pathname = router.pathname;
  const detailsRef = useRef<HTMLDetailsElement | null>(null);

  const label = isTr ? "Çözümler" : "Solutions";
  const items: Item[] = [
    { href: "/widget", label: isTr ? "Erişilebilirlik Widget’ı" : "Accessibility Widget" },
    { href: "/seo-scanner", label: "SEO Scanner" },
  ];

  const isActive = items.some((i) => i.href === pathname);

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
      <summary
        className={[styles.summary, isActive ? styles.summaryActive : ""].join(" ")}
        aria-label={label}
      >
        <span>{label}</span>
        <svg className={styles.chev} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M6 8l4 4 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>

      <div className={styles.menu} role="menu" aria-label={label}>
        {items.map((item) => {
          const active = item.href === pathname;
          return (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              aria-current={active ? "page" : undefined}
              className={[styles.item, active ? styles.itemActive : ""].join(" ")}
              onClick={() => {
                if (detailsRef.current) detailsRef.current.open = false;
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </details>
  );
}


