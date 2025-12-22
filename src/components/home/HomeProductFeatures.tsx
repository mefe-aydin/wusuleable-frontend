import type { ReactNode } from "react";

import styles from "./Home.module.scss";

type Props = {
  isTr: boolean;
};

type FeatureItem = {
  title: string;
  desc: string;
  icon: ReactNode;
};

export function HomeProductFeatures({ isTr }: Props) {
  const title = isTr ? "Öne Çıkan Özellikler" : "Featured Modules";
  const subtitle = isTr
    ? "Ana paneller + en çok kullanılan araçlar. Detayları widget sayfasında anlatacağız."
    : "Main panels + most-used tools. Details live on the widget page.";

  const items: FeatureItem[] = [
    {
      title: isTr ? "Erişilebilirlik Profilleri" : "Accessibility Profiles",
      desc: isTr
        ? "Tek tıkla otomatik ayar: seçtiğiniz profile göre ilgili seçenekleri birlikte uygular."
        : "One-click presets: applies a smart combination of settings based on the selected profile.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={styles.featureIcon}
        >
          <path d="M16 11c1.7 0 3-1.3 3-3S17.7 5 16 5s-3 1.3-3 3 1.3 3 3 3z" />
          <path d="M8 13c1.7 0 3-1.3 3-3S9.7 7 8 7s-3 1.3-3 3 1.3 3 3 3z" />
          <path d="M16 11c-1.6 0-3 .8-4 2" />
          <path d="M8 13c-2.8 0-5 1.8-5 4v2h10v-2c0-2.2-2.2-4-5-4z" />
        </svg>
      ),
    },
    {
      title: isTr ? "Metin Ayarları" : "Text Settings",
      desc: isTr
        ? "Okunabilirlik için yazı boyutu, satır/harf aralığı ve hizalamayı kolayca değiştirin."
        : "Improve readability with quick controls for size, spacing, and alignment.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={styles.featureIcon}
        >
          <path d="M4 7V4h16v3M9 20h6M12 4v16" />
        </svg>
      ),
    },
    {
      title: isTr ? "Görsel Konfor" : "Visual Comfort",
      desc: isTr
        ? "Kontrast, renk filtreleri ve mavi ışık gibi seçeneklerle göz yorgunluğunu azaltın."
        : "Reduce eye strain with contrast, color filters, and blue-light options.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={styles.featureIcon}
        >
          <path d="M3 12c2.5-4 6-6 9-6s6.5 2 9 6c-2.5 4-6 6-9 6s-6.5-2-9-6z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      title: isTr ? "Okuma Maskesi & Rehber" : "Reading Mask & Guide",
      desc: isTr
        ? "Metni satır satır takip etmeyi kolaylaştırın, dikkat dağınıklığını azaltın."
        : "Follow text line-by-line and reduce distractions while reading.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={styles.featureIcon}
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M7 9h10M7 12h10M7 15h6" />
        </svg>
      ),
    },
    {
      title: isTr ? "Animasyonları Azalt" : "Reduce Motion",
      desc: isTr
        ? "Hareketli içerikleri azaltarak daha sakin ve konforlu bir deneyim sağlayın."
        : "Make the experience calmer by reducing motion and animations.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={styles.featureIcon}
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M10 8l6 4-6 4V8z" />
          <path d="M7 7l10 10" />
        </svg>
      ),
    },
    {
      title: isTr ? "Resimleri Gizle" : "Hide Images",
      desc: isTr
        ? "İçeriğe odaklanmak için görselleri tek tıkla devre dışı bırakın."
        : "Disable images with one click to focus on the content.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={styles.featureIcon}
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M8 11l2 2 4-4 5 5" />
          <path d="M3 3l18 18" />
        </svg>
      ),
    },
  ];

  return (
    <section className={styles.productFeatures} aria-labelledby="product-features-title">
      <div className={styles.featuresHeader}>
        <h2 id="product-features-title" className={styles.featuresTitle}>
          {title}
        </h2>
        <p className={styles.featuresSubtitle}>{subtitle}</p>
      </div>

      <div className={styles.featureGrid}>
        {items.map((f, i) => (
          <div key={i} className={styles.featureCard}>
            <div aria-hidden="true">{f.icon}</div>
            <h3 className={styles.featureTitle}>{f.title}</h3>
            <p className={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


