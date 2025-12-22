import { Button } from "@/components/ui/Button";

import styles from "./Home.module.scss";

type Props = {
  isTr: boolean;
};

export function HomeHero({ isTr }: Props) {
  const badge = isTr ? "WCAG 2.2 odaklı" : "WCAG 2.2 focused";
  const title = isTr
    ? "Web sitenizi herkes için erişilebilir hale getirin."
    : "Make your website accessible for everyone.";
  const subtitle = isTr
    ? "Erişilebilirlik eklentimiz ile engelli bireylerin web sitelerinde daha rahat gezinmesini sağlayın. Hızlı kurulum, modern deneyim."
    : "Help people with disabilities navigate your site with ease. Fast setup, modern experience, built with accessibility in mind.";
  const primary = isTr ? "Ücretsiz dene" : "Start free trial";
  const secondary = isTr ? "Eklentiyi incele" : "Explore the widget";

  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.heroContent}>
        <div className={styles.badge}>{badge}</div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>

        <div className={styles.actions}>
          <Button href="/signup" variant="primary">
            {primary}
          </Button>
          <Button href="/widget" variant="secondary">
            {secondary}
          </Button>
        </div>
      </div>

      <div className={styles.heroIllustration}>
        <img
          src="/hero-illustration.svg"
          alt="Wusuleable Dashboard Mockup"
          className={styles.illustration}
        />
      </div>
    </section>
  );
}


