import Link from "next/link";
import { useMemo, useState } from "react";

import styles from "./Home.module.scss";

type Props = {
  isTr: boolean;
};

type Billing = "monthly" | "yearly";

type Plan = {
  name: string;
  priceLabel: string;
  usageLabel: string;
  perks: string[];
  isPopular?: boolean;
};

export function HomePricingBridge({ isTr }: Props) {
  const [billing, setBilling] = useState<Billing>("yearly");

  const title = isTr ? "Paketler" : "Plans";
  const subtitle = isTr
    ? "İhtiyacınıza göre ölçeklenin. Fiyatlandırma detayları için sayfayı inceleyin."
    : "Scale with your needs. See the pricing page for full details.";

  const { monthlyPlans, yearlyPlans } = useMemo(() => {
    const common = {
      starter: {
        name: isTr ? "Başlangıç" : "Starter",
        perks: isTr
          ? ["Temel profiller ve ayarlar", "Dashboard ile yönetim", "E-posta destek"]
          : ["Core profiles & settings", "Managed via dashboard", "Email support"],
      },
      pro: {
        name: isTr ? "Pro" : "Pro",
        perks: isTr
          ? ["Tüm profiller ve araçlar", "Öncelikli destek", "Gelişmiş ayarlar"]
          : ["All profiles & tools", "Priority support", "Advanced settings"],
      },
      business: {
        name: isTr ? "Kurumsal" : "Business",
        perks: isTr
          ? ["Özel SLA", "Kurulum desteği", "Çoklu site / ekip"]
          : ["Custom SLA", "Onboarding help", "Multi-site / team"],
      },
    };

    const monthlyPlans: Plan[] = [
      {
        ...common.starter,
        usageLabel: isTr ? "10K / ay" : "10K / month",
        priceLabel: isTr ? "X / ay" : "X / month",
        perks: isTr
          ? ["Temel profiller ve ayarlar", "Dashboard ile yönetim", "E-posta destek"]
          : ["Core profiles & settings", "Managed via dashboard", "Email support"],
      },
      {
        ...common.pro,
        usageLabel: isTr ? "100K / ay" : "100K / month",
        priceLabel: isTr ? "X / ay" : "X / month",
        isPopular: true,
        perks: isTr
          ? ["Tüm profiller ve araçlar", "Öncelikli destek", "Gelişmiş ayarlar"]
          : ["All profiles & tools", "Priority support", "Advanced settings"],
      },
      {
        ...common.business,
        usageLabel: isTr ? "1M+ / ay" : "1M+ / month",
        priceLabel: isTr ? "X / ay" : "X / month",
        perks: isTr
          ? ["Özel SLA", "Kurulum desteği", "Çoklu site / ekip"]
          : ["Custom SLA", "Onboarding help", "Multi-site / team"],
      },
    ];

    const yearlyPlans: Plan[] = [
      {
        ...common.starter,
        usageLabel: isTr ? "10K / ay" : "10K / month",
        priceLabel: isTr ? "X / yıl" : "X / year",
        perks: isTr
          ? ["Yıllık avantajlı ödeme", "Temel profiller ve ayarlar", "Dashboard ile yönetim"]
          : ["Best value yearly billing", "Core profiles & settings", "Managed via dashboard"],
      },
      {
        ...common.pro,
        usageLabel: isTr ? "100K / ay" : "100K / month",
        priceLabel: isTr ? "X / yıl" : "X / year",
        isPopular: true,
        perks: isTr
          ? ["Yıllık avantajlı ödeme", "Tüm profiller ve araçlar", "Öncelikli destek"]
          : ["Best value yearly billing", "All profiles & tools", "Priority support"],
      },
      {
        ...common.business,
        usageLabel: isTr ? "1M+ / ay" : "1M+ / month",
        priceLabel: isTr ? "X / yıl" : "X / year",
        perks: isTr
          ? ["Yıllık özel koşullar", "Özel SLA", "Kurulum desteği"]
          : ["Custom yearly terms", "Custom SLA", "Onboarding help"],
      },
    ];

    return { monthlyPlans, yearlyPlans };
  }, [isTr]);

  const plans = billing === "monthly" ? monthlyPlans : yearlyPlans;

  const monthlyLabel = isTr ? "Aylık" : "Monthly";
  const yearlyLabel = isTr ? "Yıllık" : "Yearly";
  const cta = isTr ? "Fiyatlandırmayı gör" : "View pricing";
  const yearlyHint = isTr ? "En avantajlı" : "Best value";

  return (
    <section className={styles.pricingBridge} aria-labelledby="pricing-bridge-title">
      <div className={styles.featuresHeader}>
        <h2 id="pricing-bridge-title" className={styles.featuresTitle}>
          {title}
        </h2>
        <p className={styles.featuresSubtitle}>{subtitle}</p>
      </div>

      <div className={styles.billingToggle} role="group" aria-label={isTr ? "Faturalama" : "Billing"}>
        <button
          type="button"
          className={[styles.billingBtn, billing === "monthly" ? styles.billingBtnActive : ""].join(" ")}
          aria-pressed={billing === "monthly"}
          onClick={() => setBilling("monthly")}
        >
          {monthlyLabel}
        </button>
        <button
          type="button"
          className={[styles.billingBtn, billing === "yearly" ? styles.billingBtnActive : ""].join(" ")}
          aria-pressed={billing === "yearly"}
          onClick={() => setBilling("yearly")}
        >
          <span className={styles.billingBtnLabel}>{yearlyLabel}</span>
          <span className={styles.billingBtnPill}>{yearlyHint}</span>
        </button>
      </div>

      <div className={styles.planGrid}>
        {plans.map((p) => (
          <div
            key={`${billing}-${p.name}`}
            className={[styles.planCard, p.isPopular ? styles.planCardPopular : ""].join(" ")}
          >
            {p.isPopular ? (
              <div className={styles.planBadge}>{isTr ? "Popüler" : "Popular"}</div>
            ) : null}
            <div className={styles.planUsage}>{p.usageLabel}</div>
            <h3 className={styles.planName}>{p.name}</h3>
            <div className={styles.planPrice}>{p.priceLabel}</div>
            <ul className={styles.planPerks}>
              {p.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.pricingBridgeFooter}>
        <Link href="/pricing" className={styles.pricingBridgeLink}>
          {cta}
        </Link>
      </div>
    </section>
  );
}


