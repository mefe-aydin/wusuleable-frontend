import { Button } from "@/components/ui/Button";

import styles from "./Home.module.scss";

type Props = {
  isTr: boolean;
};

export function HomeWidgetCta({ isTr }: Props) {
  const title = isTr ? "Widget’ı detaylı inceleyin" : "Explore the widget in detail";
  const desc = isTr
    ? "Tüm özellikleri, ekran görüntülerini ve kurulum adımlarını widget sayfasında görün."
    : "See features, screenshots, and setup steps on the widget page.";
  const cta = isTr ? "Detayları gör" : "See details";

  return (
    <section className={styles.widgetCta} aria-label={title}>
      <div className={styles.widgetCtaInner}>
        <div className={styles.widgetCtaText}>
          <h2 className={styles.widgetCtaTitle}>{title}</h2>
          <p className={styles.widgetCtaDesc}>{desc}</p>
        </div>
        <div className={styles.widgetCtaAction}>
          <Button href="/widget" variant="primary">
            {cta}
          </Button>
        </div>
      </div>
    </section>
  );
}


