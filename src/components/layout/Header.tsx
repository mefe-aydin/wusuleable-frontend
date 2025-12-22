import Link from "next/link";
import { useRouter } from "next/router";

import { LanguageDropdown } from "@/components/i18n/LanguageDropdown";
import { Button } from "@/components/ui/Button";

import styles from "./Header.module.scss";

export function Header() {
  const router = useRouter();
  const pathname = router.pathname;
  const locale = router.locale;
  const isTr = locale === "tr";
  const widgetLabel = isTr ? "Erişilebilirlik Eklentisi" : "Accessibility Widget";
  const pricingLabel = isTr ? "Fiyatlandırma" : "Pricing";
  const faqLabel = isTr ? "SSS" : "FAQ";
  const contactLabel = isTr ? "İletişim" : "Contact";
  const loginLabel = isTr ? "Oturum Aç" : "Sign in";
  const signupLabel = isTr ? "Kayıt Ol" : "Sign up";

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
                  {pricingLabel}
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
                  {faqLabel}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  aria-current={pathname === "/contact" ? "page" : undefined}
                  className={[
                    styles.navLink,
                    pathname === "/contact" ? styles.navLinkActive : "",
                  ].join(" ")}
                >
                  {contactLabel}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.right}>
          <Button href="/login" variant="primary">
            {loginLabel}
          </Button>
          <Button href="/signup" variant="secondary">
            {signupLabel}
          </Button>
          <LanguageDropdown />
        </div>
      </div>
    </header>
  );
}


