import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./Home.module.scss";

type Props = {
  isTr: boolean;
};

type Integration = {
  title: string;
  desc: string;
  badge?: string;
  icon: ReactNode;
};

export function HomeIntegrations({ isTr }: Props) {
  const title = isTr ? "Entegrasyonlar" : "Integrations";
  const subtitle = isTr
    ? "WordPress, Shopify veya özel geliştirilmiş siteler — hızlıca ekleyin ve yönetmeye başlayın."
    : "WordPress, Shopify, or custom websites — add it fast and start managing.";

  const items: Integration[] = [
    {
      title: "WordPress",
      desc: isTr
        ? "Kod ekleme veya basit kurulum adımlarıyla dakikalar içinde."
        : "Live in minutes with simple setup steps.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={styles.integrationIcon}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M8.5 9.5l3.5 10 3.5-10" />
          <path d="M8 9c0-1.2 1-2 2.2-2H12" />
        </svg>
      ),
    },
    {
      title: "Shopify",
      desc: isTr
        ? "Tema üzerinden ekleyin, mağazanızda anında aktif olsun."
        : "Add via theme settings and go live instantly.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={styles.integrationIcon}
          aria-hidden="true"
        >
          <path d="M7 7l2-3h6l2 3" />
          <path d="M6 7h12l-1 13H7L6 7z" />
          <path d="M9 10a3 3 0 0 0 6 0" />
        </svg>
      ),
    },
    {
      title: isTr ? "Özel Site" : "Custom Site",
      desc: isTr
        ? "Tek satırlık script ile React/Vue/.NET/özel altyapılarda sorunsuz entegrasyon."
        : "Works with any stack via a single script line (React/Vue/.NET/custom).",
      badge: isTr ? "En esnek" : "Most flexible",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={styles.integrationIcon}
          aria-hidden="true"
        >
          <path d="M8 9l-3 3 3 3" />
          <path d="M16 9l3 3-3 3" />
          <path d="M10 19l4-14" />
        </svg>
      ),
    },
  ];

  const cta = isTr ? "Entegrasyon detaylarını gör" : "See integration details";

  return (
    <section className={styles.integrations} aria-labelledby="integrations-title">
      <div className={styles.featuresHeader}>
        <h2 id="integrations-title" className={styles.featuresTitle}>
          {title}
        </h2>
        <p className={styles.featuresSubtitle}>{subtitle}</p>
      </div>

      <div className={styles.integrationGrid}>
        {items.map((it) => (
          <div key={it.title} className={styles.integrationCard}>
            <div className={styles.integrationTop}>
              <div className={styles.integrationIconBox}>{it.icon}</div>
              {it.badge ? <span className={styles.integrationBadge}>{it.badge}</span> : null}
            </div>
            <h3 className={styles.integrationTitle}>{it.title}</h3>
            <p className={styles.integrationDesc}>{it.desc}</p>
          </div>
        ))}
      </div>

      <div className={styles.integrationFooter}>
        <Link href="/widget" className={styles.integrationLink}>
          {cta}
        </Link>
      </div>
    </section>
  );
}


