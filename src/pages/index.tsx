import { SiteLayout } from "@/layouts/SiteLayout";
import { useRouter } from "next/router";

import { HomeHero } from "@/components/home/HomeHero";
import { HomeHowItWorks } from "@/components/home/HomeHowItWorks";
import { HomeCompliance } from "@/components/home/HomeCompliance";
import { HomeIntegrations } from "@/components/home/HomeIntegrations";
import { HomePricingBridge } from "@/components/home/HomePricingBridge";
import { HomeProductFeatures } from "@/components/home/HomeProductFeatures";
import { HomeTrust } from "@/components/home/HomeTrust";
import { HomeWidgetCta } from "@/components/home/HomeWidgetCta";
import { HomeFaqContact } from "@/components/home/HomeFaqContact";

export default function Home() {
  const router = useRouter();
  const isTr = router.locale === "tr";

  return (
    <SiteLayout>
      <HomeHero isTr={isTr} />
      <HomeTrust isTr={isTr} />
      <HomeWidgetCta isTr={isTr} />
      <HomeProductFeatures isTr={isTr} />
      <HomeHowItWorks isTr={isTr} />
      <HomeCompliance isTr={isTr} />
      <HomeIntegrations isTr={isTr} />
      <HomePricingBridge isTr={isTr} />
      <HomeFaqContact isTr={isTr} />
    </SiteLayout>
  );
}
