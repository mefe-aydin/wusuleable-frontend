import Link from "next/link";
import { useRouter } from "next/router";

import { LanguageDropdown } from "@/components/i18n/LanguageDropdown";

import styles from "./Header.module.scss";

export function Header() {
  const router = useRouter();
  const pathname = router.pathname;
  const locale = router.locale;
  const widgetLabel =
    locale === "tr" ? "Erişilebilirlik Eklentisi" : "Accessibility Widget";

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link href="/" className={styles.brand} aria-label="Wusuleable Ana Sayfa">
            <img
              src="/accessability_logo.png"
              alt="Wusuleable"
              className={styles.logo}
            />
          </Link>

          <nav aria-label="Primary">
            <ul className={styles.navList}>
              <li>
                <Link
                  href="/widget"
                  aria-current={pathname === "/widget" ? "page" : undefined}
                  className={[
                    styles.navLink,
                    pathname === "/widget" ? styles.navLinkActive : "",
                  ].join(" ")}
                >
                  {widgetLabel}
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  aria-current={pathname === "/pricing" ? "page" : undefined}
                  className={[
                    styles.navLink,
                    pathname === "/pricing" ? styles.navLinkActive : "",
                  ].join(" ")}
                >
                  Fiyatlandırma
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  aria-current={pathname === "/faq" ? "page" : undefined}
                  className={[
                    styles.navLink,
                    pathname === "/faq" ? styles.navLinkActive : "",
                  ].join(" ")}
                >
                  SSS
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.right}>
          <LanguageDropdown />
        </div>
      </div>
    </header>
  );
}


