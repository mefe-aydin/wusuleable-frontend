import Link from "next/link";

import styles from "./Home.module.scss";

type Props = {
  isTr: boolean;
};

export function HomeCompliance({ isTr }: Props) {
  const title = isTr ? "Uyumluluk / Standartlar" : "Compliance / Standards";
  const subtitle = isTr
    ? "WCAG 2.2 odaklı yaklaşımımızla, erişilebilirliği ölçülebilir ve sürdürülebilir hale getiriyoruz."
    : "With a WCAG 2.2-focused approach, we make accessibility measurable and maintainable.";

  const items = [
    {
      title: isTr ? "WCAG 2.2 Odaklı" : "WCAG 2.2 Focused",
      desc: isTr
        ? "Arayüz ve deneyim kararlarımızı güncel erişilebilirlik standartlarına göre şekillendiriyoruz."
        : "We shape UI/UX decisions around modern accessibility standards.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={styles.complianceIcon}
          aria-hidden="true"
        >
          <path d="M9 12l2 2 4-4" />
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: isTr ? "Şeffaflık" : "Transparency",
      desc: isTr
        ? "Hangi kapsamda destek verdiğimizi açıkça paylaşırız. Bu, güveni artırır."
        : "We clearly communicate scope and expectations to build trust.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={styles.complianceIcon}
          aria-hidden="true"
        >
          <path d="M12 3l10 6-10 6L2 9l10-6z" />
          <path d="M2 9v6l10 6 10-6V9" />
        </svg>
      ),
    },
    {
      title: isTr ? "Erişilebilirlik Bildirimi" : "Accessibility Statement",
      desc: isTr
        ? "Uyumluluk yaklaşımımızı ve gelişim planımızı tek bir sayfada topluyoruz."
        : "A single page describing our approach and improvement plan.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={styles.complianceIcon}
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M8 13h8" />
          <path d="M8 17h6" />
        </svg>
      ),
    },
  ];

  const linkLabel = isTr ? "Erişilebilirlik Bildirimi’ni oku" : "Read the accessibility statement";

  return (
    <section className={styles.compliance} aria-labelledby="compliance-title">
      <div className={styles.featuresHeader}>
        <h2 id="compliance-title" className={styles.featuresTitle}>
          {title}
        </h2>
        <p className={styles.featuresSubtitle}>{subtitle}</p>
      </div>

      <div className={styles.complianceGrid}>
        {items.map((it) => (
          <div key={it.title} className={styles.complianceCard}>
            {it.icon}
            <h3 className={styles.complianceTitle}>{it.title}</h3>
            <p className={styles.complianceDesc}>{it.desc}</p>
          </div>
        ))}
      </div>

      <div className={styles.complianceFooter}>
        <Link href="/accessibility-statement" className={styles.complianceLink}>
          {linkLabel}
        </Link>
      </div>
    </section>
  );
}


