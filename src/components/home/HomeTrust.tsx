import type { ReactNode } from "react";

import styles from "./Home.module.scss";

type Props = {
  isTr: boolean;
};

type TrustItem = {
  title: string;
  desc: string;
  icon: ReactNode;
};

export function HomeTrust({ isTr }: Props) {
  const featuresTitle = isTr ? "Neden Wusuleable?" : "Why Wusuleable?";
  const featuresSubtitle = isTr
    ? "Modern teknoloji, tam uyumluluk ve güvenli altyapı ile yanınızdayız."
    : "Modern tech, full compliance, and secure infrastructure.";

  const items: TrustItem[] = [
    {
      title: isTr ? "Hızlı Kurulum" : "Quick Setup",
      desc: isTr
        ? "Tek bir script satırı ile tüm sitenizi erişilebilir kılın."
        : "Make your whole site accessible with a single line of script.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
    },
    {
      title: "WCAG 2.2 Ready",
      desc: isTr
        ? "En güncel dünya standartlarına tam uyumluluk garantisi."
        : "Full compliance with the latest global standards.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: isTr ? "Yüksek Güvenlik" : "High Security",
      desc: isTr
        ? "Verileriniz bizimle güvende, gizlilik en büyük önceliğimiz."
        : "Your data is safe with us, privacy is our top priority.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
  ];

  return (
    <section className={styles.features} aria-labelledby="features-title">
      <div className={styles.featuresHeader}>
        <h2 id="features-title" className={styles.featuresTitle}>
          {featuresTitle}
        </h2>
        <p className={styles.featuresSubtitle}>{featuresSubtitle}</p>
      </div>

      <div className={styles.grid}>
        {items.map((f, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.iconBox} aria-hidden="true">
              {f.icon}
            </div>
            <h3 className={styles.cardTitle}>{f.title}</h3>
            <p className={styles.cardDesc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


