import { useRouter } from "next/router";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./request-demo.module.scss";

type CountryCode = {
  code: string;
  country: string;
  flag: string;
};

const countryCodes: CountryCode[] = [
  { code: "+90", country: "Türkiye", flag: "🇹🇷" },
  { code: "+1", country: "USA", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+1", country: "Canada", flag: "🇨🇦" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
  { code: "+32", country: "Belgium", flag: "🇧🇪" },
  { code: "+46", country: "Sweden", flag: "🇸🇪" },
  { code: "+47", country: "Norway", flag: "🇳🇴" },
  { code: "+45", country: "Denmark", flag: "🇩🇰" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+20", country: "Egypt", flag: "🇪🇬" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
  { code: "+351", country: "Portugal", flag: "🇵🇹" },
  { code: "+30", country: "Greece", flag: "🇬🇷" },
  { code: "+43", country: "Austria", flag: "🇦🇹" },
  { code: "+420", country: "Czech Republic", flag: "🇨🇿" },
  { code: "+48", country: "Poland", flag: "🇵🇱" },
  { code: "+353", country: "Ireland", flag: "🇮🇪" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿" },
];

function CountrySelect({ 
  value, 
  onChange 
}: { 
  value: string; 
  onChange: (val: string) => void 
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const handler = (e: PointerEvent) => {
      if (rootRef.current && e.target instanceof Node && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("pointerdown", handler);
    return () => window.removeEventListener("pointerdown", handler);
  }, [open]);

  useEffect(() => {
    if (open) {
      setSearch("");
      setTimeout(() => searchRef.current?.focus(), 10);
    }
  }, [open]);

  const filtered = countryCodes.filter(c => 
    c.country.toLowerCase().includes(search.toLowerCase()) || 
    c.code.includes(search)
  );

  const selected = countryCodes.find(c => c.code === value) || countryCodes[0];

  return (
    <div className={styles.selectRoot} ref={rootRef}>
      <button
        type="button"
        className={styles.selectTrigger}
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles.triggerValue}>
          <span className={styles.flagIcon}>{selected.flag}</span>
          <span className={styles.codeText}>{selected.code}</span>
        </span>
        <span className={styles.selectIcon}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      {open && (
        <div className={styles.selectDropdown}>
          <div className={styles.searchWrapper}>
            <input
              ref={searchRef}
              type="text"
              className={styles.searchInput}
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <ul className={styles.optionsList} role="listbox" id={listId}>
            {filtered.length > 0 ? (
              filtered.map((c) => (
                <li
                  key={`${c.country}-${c.code}`}
                  role="option"
                  aria-selected={c.code === value}
                  className={[
                    styles.selectOption,
                    c.code === value ? styles.selectOptionSelected : ""
                  ].join(" ")}
                  onClick={() => {
                    onChange(c.code);
                    setOpen(false);
                  }}
                >
                  <span className={styles.optionFlag}>{c.flag}</span>
                  <span className={styles.optionCountry}>{c.country}</span>
                  <span className={styles.optionCode}>{c.code}</span>
                </li>
              ))
            ) : (
              <li className={styles.noResults}>No results</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function RequestDemoPage() {
  const router = useRouter();
  const isTr = router.locale === "tr";
  const [countryCode, setCountryCode] = useState("+90");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.currentTarget;

    if (target.validity.valueMissing) {
      setErrors(prev => ({ ...prev, [target.name]: "Bu alan boş bırakılamaz." }));
    } else if (target.type === "email" && target.validity.typeMismatch) {
      setErrors(prev => ({ ...prev, [target.name]: "Geçersiz e-posta." }));
    } else if (target.type === "url" && target.validity.typeMismatch) {
      setErrors(prev => ({ ...prev, [target.name]: "Geçersiz URL." }));
    } else if (target.name === "name" && target.validity.patternMismatch) {
      setErrors(prev => ({ ...prev, [target.name]: "Sadece harf girin." }));
    } else if (target.name === "phone" && target.validity.patternMismatch) {
      setErrors(prev => ({ ...prev, [target.name]: "Geçersiz telefon numarası." }));
    } else {
      setErrors(prev => ({ ...prev, [target.name]: target.validationMessage }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const t = {
    title: isTr ? "Demo Talebi Oluşturun" : "Request a Demo",
    subtitle: isTr 
      ? "Wusuleable'ın sunduğu çözümleri canlı bir demo ile keşfedin. Uzman ekibimiz sizinle en kısa sürede iletişime geçecektir."
      : "Discover Wusuleable's solutions with a live demo. Our expert team will get in touch with you shortly.",
    nameLabel: isTr ? "Ad Soyad" : "Full Name",
    emailLabel: isTr ? "E-posta Adresi" : "Email Address",
    websiteLabel: isTr ? "Web Sitesi URL" : "Website URL",
    phoneLabel: isTr ? "Cep Telefonu" : "Phone Number",
    submitBtn: isTr ? "Demo Talebi Gönder" : "Request Demo",
    placeholderName: isTr ? "Örn. Ahmet Yılmaz" : "e.g. John Doe",
    placeholderEmail: "name@company.com",
    placeholderWebsite: "https://www.company.com",
    placeholderPhone: "5xx xxx xxxx",
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t.title}</h1>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </header>

        <div className={styles.card}>
          <div className={styles.cardGlow} aria-hidden="true" />
          <div className={styles.cardInner}>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <label className={styles.field}>
                  <span className={styles.label}>{t.nameLabel}</span>
                  <input
                    type="text"
                    name="name"
                    className={styles.input}
                    placeholder={t.placeholderName}
                    required
                    maxLength={50}
                    pattern="^[a-zA-ZÇçĞğİıÖöŞşÜü\s]+$"
                    onInvalid={handleInvalid}
                    onChange={handleChange}
                  />
                  {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>{t.emailLabel}</span>
                  <input
                    type="email"
                    name="email"
                    className={styles.input}
                    placeholder={t.placeholderEmail}
                    required
                    maxLength={100}
                    onInvalid={handleInvalid}
                    onChange={handleChange}
                  />
                  {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>{t.websiteLabel}</span>
                  <input
                    type="url"
                    name="website"
                    className={styles.input}
                    placeholder={t.placeholderWebsite}
                    required
                    maxLength={200}
                    onInvalid={handleInvalid}
                    onChange={handleChange}
                  />
                  {errors.website && <span className={styles.errorMsg}>{errors.website}</span>}
                </label>

                <div className={styles.field}>
                  <span className={styles.label}>{t.phoneLabel}</span>
                  <div className={styles.phoneGroup}>
                    <CountrySelect 
                      value={countryCode} 
                      onChange={setCountryCode} 
                    />
                    <input
                      type="tel"
                      name="phone"
                      className={styles.input}
                      placeholder={t.placeholderPhone}
                      required
                      maxLength={15}
                      pattern="[0-9]{5,15}"
                      onInvalid={handleInvalid}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
                </div>

                <button type="submit" className={styles.submitBtn}>
                  {t.submitBtn}
                </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
