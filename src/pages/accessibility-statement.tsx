import { SiteLayout } from "@/layouts/SiteLayout";
import { useRouter } from "next/router";

export default function AccessibilityStatementPage() {
  const router = useRouter();
  const isTr = router.locale === "tr";

  const title = isTr ? "Erişilebilirlik Bildirimi" : "Accessibility Statement";
  const intro = isTr
    ? "Wusuleable olarak erişilebilirliği bir \"ekstra\" değil, ürün kalitesi olarak görüyoruz. Bu sayfa yaklaşımımızı özetler."
    : "At Wusuleable, we treat accessibility as product quality. This page summarizes our approach.";
  const scopeTitle = isTr ? "Kapsam" : "Scope";
  const scopeBody = isTr
    ? "Bu marketing sitesinde ve widget arayüzünde WCAG 2.2 odaklı iyileştirmeler hedeflenir. Her web sitesi farklı olduğu için sonuçlar entegrasyona ve sitenin mevcut durumuna bağlı olabilir."
    : "We aim for WCAG 2.2-focused improvements across this marketing site and the widget UI. Outcomes may vary depending on integration and the current state of the target site.";
  const feedbackTitle = isTr ? "Geri Bildirim" : "Feedback";
  const feedbackBody = isTr
    ? "Bir erişilebilirlik problemi fark ederseniz bizimle iletişime geçebilirsiniz. Geri bildirimleri ciddiye alır ve önceliklendiririz."
    : "If you find an accessibility issue, you can contact us. We take feedback seriously and prioritize improvements.";

  return (
    <SiteLayout>
      <section aria-label={title} style={{ padding: "4rem 0" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.02em" }}>{title}</h1>
        <p style={{ marginTop: "1rem", lineHeight: 1.8, color: "#52525b" }}>{intro}</p>

        <h2 style={{ marginTop: "2rem", fontSize: "1.5rem", fontWeight: 800 }}>{scopeTitle}</h2>
        <p style={{ marginTop: "0.75rem", lineHeight: 1.8, color: "#52525b" }}>{scopeBody}</p>

        <h2 style={{ marginTop: "2rem", fontSize: "1.5rem", fontWeight: 800 }}>{feedbackTitle}</h2>
        <p style={{ marginTop: "0.75rem", lineHeight: 1.8, color: "#52525b" }}>{feedbackBody}</p>
      </section>
    </SiteLayout>
  );
}


