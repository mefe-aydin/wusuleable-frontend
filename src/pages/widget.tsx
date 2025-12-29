import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./widget.module.scss";

export default function WidgetPage() {
  const router = useRouter();
  const isTr = router.locale === "tr";

  // Demo States
  const [textSize, setTextSize] = useState(100);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [textAlign, setTextAlign] = useState<"left" | "center" | "justify">("left");

  const profiles = [
    {
      key: "vision",
      title: isTr ? "Görme Desteği" : "Vision Support",
      desc: isTr
        ? "Okunabilirliği artırmak için kontrast ve metin ayarlarını akıllıca uygular."
        : "Applies a smart set of contrast and text settings to improve readability.",
      chips: isTr
        ? ["Yüksek kontrast", "Yazı büyütme", "Odak vurgusu", "Linkleri belirginleştir"]
        : ["High contrast", "Bigger text", "Focus highlight", "Emphasize links"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M3 12c2.5-4 6-6 9-6s6.5 2 9 6c-2.5 4-6 6-9 6s-6.5-2-9-6z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      key: "dyslexia",
      title: isTr ? "Okuma Kolaylığı" : "Reading Ease",
      desc: isTr
        ? "Metni daha akıcı yapmak için satır/harf aralığı ve hizalamayı optimize eder."
        : "Optimizes spacing and alignment to make reading smoother.",
      chips: isTr
        ? ["Satır aralığı", "Harf aralığı", "Sola hizala", "Okuma rehberi"]
        : ["Line spacing", "Letter spacing", "Left align", "Reading guide"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M7 9h10M7 12h10M7 15h6" />
        </svg>
      ),
    },
    {
      key: "focus",
      title: isTr ? "Odak & Dikkat" : "Focus & Attention",
      desc: isTr
        ? "Dikkat dağıtıcı etkileri azaltır, okumayı adım adım takip etmeyi kolaylaştırır."
        : "Reduces distractions and makes it easier to follow content step by step.",
      chips: isTr ? ["Okuma maskesi", "Animasyon azalt", "İçerik odağı"] : ["Reading mask", "Reduce motion", "Content focus"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 7V4h3M20 7V4h-3M4 17v3h3M20 17v3h-3" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      key: "calm",
      title: isTr ? "Sakin Mod" : "Calm Mode",
      desc: isTr
        ? "Hareket ve görselleri azaltarak daha sakin bir deneyim sağlar."
        : "Creates a calmer experience by reducing motion and imagery.",
      chips: isTr ? ["Animasyon azalt", "Resimleri gizle", "Yumuşak kontrast"] : ["Reduce motion", "Hide images", "Soft contrast"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
  ] as const;

  const t = {
    badge: isTr ? "Yeni Nesil Erişilebilirlik" : "Next-Gen Accessibility",
    title: isTr
      ? "Web Sitenizi Herkes İçin Kusursuz Yapın"
      : "Make Your Website Flawless for Everyone",
    description: isTr
      ? "Wusuleable widget, yapay zeka destekli modülleri ve kullanıcı dostu arayüzü ile engelli bireylerin dijital dünyada hiçbir engele takılmadan gezinmesini sağlar. Modern, hızlı ve tam uyumlu."
      : "Wusuleable widget enables people with disabilities to navigate the digital world without barriers, thanks to AI-powered modules and a user-friendly interface. Modern, fast, and fully compliant.",
    profilesTitle: isTr ? "Erişilebilirlik Profilleri" : "Accessibility Profiles",
    profilesSubtitle: isTr
      ? "Tek tıkla, en sık kullanılan ayar kombinasyonlarını uygular. Dilersen profili seçtikten sonra tüm ayarları tek tek özelleştirebilirsin."
      : "One click applies the most common combinations of settings. You can still customize every option afterward.",
    profilesNote: isTr ? "Not: Profiller, kullanıcı ihtiyacına göre önerilen ayar setleridir." : "Note: Profiles are recommended presets based on user needs.",
    textTitle: isTr ? "Metin Ayarları" : "Text Settings",
    textSubtitle: isTr
      ? "Boyut, satır/harf aralığı ve hizalama kontrolleriyle içerikleri herkes için daha okunabilir hale getirin."
      : "Make content more readable for everyone with size, spacing, and alignment controls.",
    textPreviewTitle: isTr ? "Önizleme" : "Preview",
    textPreviewBody: isTr
      ? "Okunabilirlik, erişilebilirliğin temelidir. Metin ayarlarını kişiselleştirerek göz yorgunluğunu azaltabilir ve içeriği daha hızlı takip edebilirsiniz."
      : "Readability is the foundation of accessibility. Personalize text settings to reduce eye strain and follow content faster.",
    textControlsTitle: isTr ? "Kontroller" : "Controls",
    sizeLabel: isTr ? "Yazı Boyutu" : "Font Size",
    lineLabel: isTr ? "Satır Aralığı" : "Line Spacing",
    letterLabel: isTr ? "Harf Aralığı" : "Letter Spacing",
    alignLabel: isTr ? "Hizalama" : "Alignment",
    alignLeft: isTr ? "Sola" : "Left",
    alignCenter: isTr ? "Ortala" : "Center",
    alignJustify: isTr ? "Yasla" : "Justify",
    readingTitle: isTr ? "Okuma Maskesi & Rehber" : "Reading Mask & Guide",
    readingSubtitle: isTr
      ? "Dikkat dağıtıcı unsurları azaltan maske ve satır takibi sağlayan rehber ile odaklanmayı kolaylaştırın."
      : "Improve focus with a mask that reduces distractions and a guide for line-by-line tracking.",
    maskLabel: isTr ? "Okuma Maskesi" : "Reading Mask",
    guideLabel: isTr ? "Okuma Rehberi" : "Reading Guide",
    maskPosLabel: isTr ? "Maske Pozisyonu" : "Mask Position",
    guidePosLabel: isTr ? "Rehber Pozisyonu" : "Guide Position",
    readingPreviewBody: isTr
      ? "Okuma maskesi ve rehberi, özellikle disleksi veya odaklanma güçlüğü çeken kullanıcılar için tasarlanmıştır. Bu araçlar sayesinde uzun metinleri okumak çok daha konforlu hale gelir."
      : "The reading mask and guide are designed specifically for users with dyslexia or focus difficulties. These tools make reading long texts much more comfortable.",
    ctaTitle: isTr ? "Erişilebilirliği Hemen Bugün Başlatın" : "Start Accessibility Today",
    ctaSubtitle: isTr
      ? "Wusuleable ile web sitenizi dakikalar içinde herkes için kapsayıcı hale getirin. Ücretsiz denemeye başlayın veya uzmanımızdan demo isteyin."
      : "Make your website inclusive for everyone in minutes with Wusuleable. Start your free trial or request a demo from our expert.",
    ctaPrimary: isTr ? "Kayıt Ol" : "Sign Up",
    ctaSecondary: isTr ? "Demo Talebi Oluştur" : "Request a Demo",
  };

  return (
    <div className={styles.page}>
        <div className={styles.container}>
          <section className={styles.hero}>
            <div className={styles.heroContent}>
              <span className={styles.badge}>{t.badge}</span>
              <h1 className={styles.title}>{t.title}</h1>
              <p className={styles.description}>{t.description}</p>
            </div>
            
            <div className={styles.heroImageWrapper}>
              <img
                src="/images/widget/widget-hero.svg"
                alt={isTr ? "Wusuleable widget arayüz illüstrasyonu" : "Wusuleable widget interface illustration"}
                className={styles.heroImage}
              />
            </div>
          </section>

          <section className={styles.ctaSection}>
            <div className={styles.ctaCard}>
              <div className={styles.ctaGlow} aria-hidden="true" />
              <div className={styles.ctaInner}>
                <h2 className={styles.ctaTitle}>{t.ctaTitle}</h2>
                <p className={styles.ctaSubtitle}>{t.ctaSubtitle}</p>
                <div className={styles.ctaActions}>
                  <Button href="/signup" variant="primary" className={styles.ctaBtn}>
                    {t.ctaPrimary}
                  </Button>
                  <Button href="/request-demo" variant="secondary" className={styles.ctaBtn}>
                    {t.ctaSecondary}
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="profiles-title">
            <header className={styles.sectionHeader}>
              <h2 id="profiles-title" className={styles.sectionTitle}>
                {t.profilesTitle}
              </h2>
              <p className={styles.sectionSubtitle}>{t.profilesSubtitle}</p>
            </header>

            <div className={styles.profileGrid}>
              {profiles.map((p) => (
                <article key={p.key} className={styles.profileCard}>
                  <div className={styles.profileTop}>
                    <div className={styles.profileIcon} aria-hidden="true">
                      {p.icon}
                    </div>
                    <div>
                      <h3 className={styles.profileTitle}>{p.title}</h3>
                      <p className={styles.profileDesc}>{p.desc}</p>
                    </div>
                  </div>

                  <div className={styles.profileChips} aria-label={isTr ? "Uygulanan ayarlar" : "Applied settings"}>
                    {p.chips.map((c) => (
                      <span key={c} className={styles.chip}>
                        {c}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <p className={styles.note}>{t.profilesNote}</p>
          </section>

          <section className={styles.section} aria-labelledby="text-settings-title">
            <header className={styles.sectionHeader}>
              <h2 id="text-settings-title" className={styles.sectionTitle}>
                {t.textTitle}
              </h2>
              <p className={styles.sectionSubtitle}>{t.textSubtitle}</p>
            </header>

            <div className={styles.twoCol}>
              <div className={styles.previewCard}>
                <div className={styles.previewHeader}>
                  <span className={styles.previewLabel}>{t.textPreviewTitle}</span>
                  <div className={styles.previewBadges} aria-hidden="true">
                    <span className={styles.previewBadge} style={{ opacity: textSize > 120 ? 1 : 0.4 }}>A</span>
                    <span className={styles.previewBadge} style={{ opacity: textSize > 100 && textSize <= 120 ? 1 : 0.4 }}>A</span>
                    <span className={styles.previewBadge} style={{ opacity: textSize <= 100 ? 1 : 0.4 }}>A</span>
                  </div>
                </div>

                <p 
                  className={styles.previewText}
                  style={{
                    fontSize: `${textSize / 100}rem`,
                    lineHeight: lineHeight,
                    letterSpacing: `${letterSpacing}em`,
                    textAlign: textAlign
                  }}
                >
                  {t.textPreviewBody}
                </p>
                <div className={styles.previewLines} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className={styles.controlsCard}>
                <span className={styles.controlsLabel}>{t.textControlsTitle}</span>

                <div className={styles.controlRow}>
                  <div className={styles.controlMeta}>
                    <label htmlFor="size-slider" className={styles.controlName}>{t.sizeLabel}</label>
                    <span className={styles.controlValue}> %{textSize}</span>
                  </div>
                  <input
                    id="size-slider"
                    type="range"
                    min="80"
                    max="200"
                    value={textSize}
                    onChange={(e) => setTextSize(Number(e.target.value))}
                    className={styles.rangeInput}
                  />
                </div>

                <div className={styles.controlRow}>
                  <div className={styles.controlMeta}>
                    <label htmlFor="line-slider" className={styles.controlName}> {t.lineLabel}</label>
                    <span className={styles.controlValue}> {lineHeight}</span>
                  </div>
                  <input
                    id="line-slider"
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={lineHeight}
                    onChange={(e) => setLineHeight(Number(e.target.value))}
                    className={styles.rangeInput}
                  />
                </div>

                <div className={styles.controlRow}>
                  <div className={styles.controlMeta}>
                    <label htmlFor="letter-slider" className={styles.controlName}> {t.letterLabel}</label>
                    <span className={styles.controlValue}> {letterSpacing} em</span>
                  </div>
                  <input
                    id="letter-slider"
                    type="range"
                    min="-0.05"
                    max="0.5"
                    step="0.01"
                    value={letterSpacing}
                    onChange={(e) => setLetterSpacing(Number(e.target.value))}
                    className={styles.rangeInput}
                  />
                </div>

                <div className={styles.controlRow}>
                  <div className={styles.controlMeta}>
                    <span className={styles.controlName}>{t.alignLabel}</span>
                  </div>
                  <div className={styles.pillGroup} role="group" aria-label={t.alignLabel}>
                    <button 
                      type="button"
                      className={[styles.pill, textAlign === "left" ? styles.pillActive : ""].join(" ")}
                      onClick={() => setTextAlign("left")}
                    >
                      {t.alignLeft}
                    </button>
                    <button 
                      type="button"
                      className={[styles.pill, textAlign === "center" ? styles.pillActive : ""].join(" ")}
                      onClick={() => setTextAlign("center")}
                    >
                      {t.alignCenter}
                    </button>
                    <button 
                      type="button"
                      className={[styles.pill, textAlign === "justify" ? styles.pillActive : ""].join(" ")}
                      onClick={() => setTextAlign("justify")}
                    >
                      {t.alignJustify}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="reading-tools-title">
            <header className={styles.sectionHeader}>
              <h2 id="reading-tools-title" className={styles.sectionTitle}>
                {t.readingTitle}
              </h2>
              <p className={styles.sectionSubtitle}>{t.readingSubtitle}</p>
            </header>

            <div className={styles.showcaseGrid}>
              <div className={styles.showcaseInfo}>
                <div className={styles.featureItem}>
                  <div className={styles.featureItemIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className={styles.featureItemTitle}>{t.maskLabel}</h3>
                    <p className={styles.featureItemDesc}>
                      {isTr 
                        ? "Odaklanmak istediğiniz alan dışındaki her şeyi karartarak dikkatin dağılmasını önler."
                        : "Dims everything except the area you want to focus on, preventing distractions."}
                    </p>
                  </div>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.featureItemIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className={styles.featureItemTitle}>{t.guideLabel}</h3>
                    <p className={styles.featureItemDesc}>
                      {isTr 
                        ? "Metin üzerinde hareket eden yatay bir çizgi ile satır takibini kolaylaştırır."
                        : "Simplifies line-by-line tracking with a horizontal guide line moving over the text."}
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.staticPreviewCard}>
                <div className={styles.previewHeader}>
                  <div className={styles.dotGroup}>
                    <span/><span/><span/>
                  </div>
                </div>
                <div className={styles.readingShowcase}>
                  <p className={styles.showcaseText}>
                    {isTr 
                      ? "Okuma maskesi ve rehberi, özellikle disleksi veya odaklanma güçlüğü çeken kullanıcılar için tasarlanmıştır. Bu araçlar sayesinde uzun metinleri okumak çok daha konforlu hale gelir."
                      : "The reading mask and guide are designed specifically for users with dyslexia or focus difficulties. These tools make reading long texts much more comfortable."}
                  </p>
                  {/* Static Mask Effect */}
                  <div className={styles.staticMaskOverlay} />
                  {/* Static Guide Line */}
                  <div className={styles.staticGuideLine} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
  );
}
