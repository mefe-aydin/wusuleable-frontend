import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./Footer.module.scss";

export function Footer() {
  const router = useRouter();
  const isTr = router.locale === "tr";

  const product = isTr ? "Widget" : "Widget";
  const pricing = isTr ? "Fiyatlandırma" : "Pricing";
  const faq = isTr ? "SSS" : "FAQ";
  const contact = isTr ? "İletişim" : "Contact";
  const statement = isTr ? "Erişilebilirlik Bildirimi" : "Accessibility Statement";

  const headline = isTr ? "Erişilebilirlik, doğru şekilde." : "Accessibility, done right.";
  const subline = isTr
    ? "Modern widget, hızlı kurulum, şeffaf yaklaşım."
    : "Modern widget, fast setup, transparent approach.";

  return (
    <footer className={styles.footer} aria-label="Footer">
      <div className={styles.gradientTop} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <div className={styles.brandTitle}>Wusuleable</div>
          <div className={styles.brandHeadline}>{headline}</div>
          <div className={styles.brandSubline}>{subline}</div>
        </div>

        <nav className={styles.nav} aria-label={isTr ? "Alt menü" : "Footer"}>
          <Link className={styles.link} href="/widget">
            {product}
          </Link>
          <Link className={styles.link} href="/pricing">
            {pricing}
          </Link>
          <Link className={styles.link} href="/faq">
            {faq}
          </Link>
          <Link className={styles.link} href="/contact">
            {contact}
          </Link>
          <Link className={styles.link} href="/accessibility-statement">
            {statement}
          </Link>
        </nav>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span>© {new Date().getFullYear()} Wusuleable</span>
          <span className={styles.sep} aria-hidden="true">
            ·
          </span>
          <span className={styles.muted}>
            {isTr ? "Tüm hakları saklıdır." : "All rights reserved."}
          </span>
        </div>
      </div>
    </footer>
  );
}


