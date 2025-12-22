import { Button } from "@/components/ui/Button";

import styles from "./Home.module.scss";

type Props = {
  isTr: boolean;
};

type FaqItem = {
  q: string;
  a: string;
};

export function HomeFaqContact({ isTr }: Props) {
  const title = isTr ? "SSS ve İletişim" : "FAQ & Contact";
  const subtitle = isTr
    ? "Sorularınız mı var? SSS’ye göz atın veya satın almadan önce bile bize yazın."
    : "Have questions? Check the FAQ or message us — even before purchasing.";

  const faqTitle = isTr ? "SSS" : "FAQ";
  const faqDesc = isTr
    ? "Kurulum, uyumluluk ve genel soruların cevaplarını burada topladık."
    : "We’ve collected answers about setup, compatibility, and common questions.";

  const contactTitle = isTr ? "İletişim" : "Contact";
  const contactDesc = isTr
    ? "Satın almadan da soru sorabilirsiniz. Size en doğru yönlendirmeyi yapalım."
    : "You can ask before buying. We’ll guide you to the best setup and plan.";

  // keep type referenced (no unused type lint in some setups)
  const _unused: FaqItem | null = null;
  void _unused;

  return (
    <section className={styles.faq} aria-labelledby="faq-title">
      <div className={styles.featuresHeader}>
        <h2 id="faq-title" className={styles.featuresTitle}>
          {title}
        </h2>
        <p className={styles.featuresSubtitle}>{subtitle}</p>
      </div>

      <div className={styles.faqSimpleGrid}>
        <div className={styles.faqSimpleCard}>
          <h3 className={styles.faqSimpleTitle}>{faqTitle}</h3>
          <p className={styles.faqSimpleDesc}>{faqDesc}</p>
          <div className={styles.faqSimpleActions}>
            <Button href="/faq" variant="secondary">
              {isTr ? "SSS’ye git" : "Go to FAQ"}
            </Button>
          </div>
        </div>

        <div className={styles.faqSimpleCardPrimary}>
          <h3 className={styles.faqSimpleTitle}>{contactTitle}</h3>
          <p className={styles.faqSimpleDesc}>{contactDesc}</p>
          <div className={styles.faqSimpleActions}>
            <Button href="/contact" variant="primary">
              {isTr ? "İletişim" : "Contact"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}


