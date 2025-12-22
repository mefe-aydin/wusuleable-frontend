import styles from "./Home.module.scss";

type Props = {
  isTr: boolean;
};

type Step = {
  number: string;
  title: string;
  desc: string;
};

export function HomeHowItWorks({ isTr }: Props) {
  const title = isTr ? "Sadece 3 Adımda Hazır" : "Ready in Just 3 Steps";

  const steps: Step[] = [
    {
      number: "1",
      title: isTr ? "Script Ekle" : "Add Script",
      desc: isTr
        ? "Tek satırlık kodu web sitenizin <head> etiketine yapıştırın."
        : "Paste the one-line code into your website's <head> tag.",
    },
    {
      number: "2",
      title: isTr ? "Panelden Ayarla" : "Configure Panel",
      desc: isTr
        ? "Müşteri panelinden renkleri ve widget özelliklerini seçin."
        : "Select colors and widget features from the customer panel.",
    },
    {
      number: "3",
      title: isTr ? "Widget Yayında" : "Widget is Live",
      desc: isTr
        ? "Erişilebilirlik eklentiniz anında sitenizde görünür olsun."
        : "Your accessibility widget is instantly visible on your site.",
    },
  ];

  return (
    <section className={styles.howItWorks} aria-labelledby="how-it-works-title">
      <div className={styles.featuresHeader}>
        <h2 id="how-it-works-title" className={styles.featuresTitle}>
          {title}
        </h2>
      </div>

      <div className={styles.steps}>
        {steps.map((s, i) => (
          <div key={i} className={styles.step}>
            <div className={styles.stepNumber}>{s.number}</div>
            <h3 className={styles.stepTitle}>{s.title}</h3>
            <p className={styles.stepDesc}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


