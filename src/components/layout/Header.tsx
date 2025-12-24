import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useId, useMemo, useState } from "react";

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
  const menuLabel = isTr ? "Menü" : "Menu";

  const mobileMenuId = useId();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { href: "/widget", label: widgetLabel },
      { href: "/pricing", label: pricingLabel },
      { href: "/faq", label: faqLabel },
      { href: "/contact", label: contactLabel },
    ],
    [widgetLabel, pricingLabel, faqLabel, contactLabel]
  );

  useEffect(() => {
    // Close menu on route change
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link href="/" className={styles.brand} aria-label="Wusuleable Ana Sayfa">
            <img
              src="/accessability_logo.svg"
              alt=""
              className={styles.logo}
            />
            <div className={styles.brandNameWrapper}>
              <span className={styles.brandWusul}>Wusul</span>
              <span className={styles.brandAble}>eable</span>
            </div>
          </Link>

          <nav aria-label="Primary" className={styles.desktopNav}>
            <ul className={styles.navList}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={[
                      styles.navLink,
                      pathname === item.href ? styles.navLinkActive : "",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
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

        <button
          type="button"
          className={styles.menuButton}
          aria-label={menuLabel}
          aria-expanded={mobileOpen}
          aria-controls={mobileMenuId}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className={styles.menuIcon} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        className={[styles.mobileOverlay, mobileOpen ? styles.mobileOverlayOpen : ""].join(" ")}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className={styles.mobileBackdrop}
          aria-label={isTr ? "Menüyü kapat" : "Close menu"}
          onClick={() => setMobileOpen(false)}
          tabIndex={mobileOpen ? 0 : -1}
        />
        <div
          className={styles.mobilePanel}
          id={mobileMenuId}
          role="dialog"
          aria-label={menuLabel}
          aria-modal="true"
        >
          <div className={styles.mobileHeader}>
            <Link
              href="/"
              className={styles.mobileBrand}
              aria-label={isTr ? "Wusuleable Ana Sayfa" : "Wusuleable Home"}
              onClick={() => setMobileOpen(false)}
              tabIndex={mobileOpen ? 0 : -1}
            >
              <img src="/accessability_logo.svg" alt="" className={styles.mobileLogo} />
              <div className={styles.mobileBrandName}>
                <span className={styles.brandWusul}>Wusul</span>
                <span className={styles.brandAble}>eable</span>
              </div>
            </Link>
          </div>

          <nav aria-label="Mobile">
            <ul className={styles.mobileNavList}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={styles.mobileNavLink}
                    onClick={() => setMobileOpen(false)}
                    tabIndex={mobileOpen ? 0 : -1}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.mobileActions}>
            <Button href="/login" variant="primary" className={styles.mobileActionBtn} tabIndex={mobileOpen ? 0 : -1}>
              {loginLabel}
            </Button>
            <Button href="/signup" variant="secondary" className={styles.mobileActionBtn} tabIndex={mobileOpen ? 0 : -1}>
              {signupLabel}
            </Button>
            <div className={styles.mobileLang}>
              <LanguageDropdown />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


