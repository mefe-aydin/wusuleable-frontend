import { SiteLayout } from "@/layouts/SiteLayout";
import { useRouter } from "next/router";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import styles from "./contact.module.scss";

type SubjectSelectProps = {
  items: string[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  name: string;
  required?: boolean;
};

function SubjectSelect({ items, placeholder, value, onChange, name, required }: SubjectSelectProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedIndex = useMemo(() => items.indexOf(value), [items, value]);
  const [activeIndex, setActiveIndex] = useState(() => (selectedIndex >= 0 ? selectedIndex : 0));

  useEffect(() => {
    if (!open) return;

    const handler = (e: PointerEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
    };

    window.addEventListener("pointerdown", handler);
    return () => window.removeEventListener("pointerdown", handler);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [open, selectedIndex]);

  useEffect(() => {
    if (!open) return;
    const optionEl = document.getElementById(`${listId}-opt-${activeIndex}`);
    optionEl?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, listId, open]);

  const commit = (next: string) => {
    onChange(next);
    setOpen(false);
  };

  const onTriggerKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        setOpen(true);
        setActiveIndex((i) => Math.min(items.length - 1, i + 1));
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        setOpen(true);
        setActiveIndex((i) => Math.max(0, i - 1));
        break;
      }
      case "Home": {
        if (!open) return;
        e.preventDefault();
        setActiveIndex(0);
        break;
      }
      case "End": {
        if (!open) return;
        e.preventDefault();
        setActiveIndex(items.length - 1);
        break;
      }
      case "Enter":
      case " ": {
        e.preventDefault();
        if (!open) {
          setOpen(true);
        } else {
          const next = items[activeIndex];
          if (typeof next === "string") commit(next);
        }
        break;
      }
      case "Escape": {
        if (!open) return;
        e.preventDefault();
        setOpen(false);
        break;
      }
      case "Tab": {
        setOpen(false);
        break;
      }
    }
  };

  return (
    <div className={styles.selectRoot} ref={rootRef}>
      {/* Keep native-like required behavior without relying on <select> UI */}
      <input
        className={styles.visuallyHiddenInput}
        tabIndex={-1}
        aria-hidden="true"
        name={name}
        required={required}
        value={value}
        readOnly
      />

      <button
        type="button"
        className={styles.selectTrigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
      >
        <span className={styles.selectValue}>
          {value ? value : <span className={styles.selectPlaceholder}>{placeholder}</span>}
        </span>
        <span className={styles.selectIcon} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && (
        <ul className={styles.selectDropdown} role="listbox" id={listId}>
          {items.map((item, idx) => {
            const isSelected = item === value;
            const isActive = idx === activeIndex;
            return (
              <li
                key={item}
                id={`${listId}-opt-${idx}`}
                role="option"
                aria-selected={isSelected}
                className={[
                  styles.selectOption,
                  isActive ? styles.selectOptionActive : "",
                  isSelected ? styles.selectOptionSelected : "",
                ].join(" ")}
                onMouseMove={() => setActiveIndex(idx)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => commit(item)}
              >
                <span className={styles.selectOptionText}>{item}</span>
                {isSelected && (
                  <span className={styles.selectCheck} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function ContactPage() {
  const router = useRouter();
  const isTr = router.locale === "tr";
  const [subject, setSubject] = useState("");
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const messageHelpId = useId();
  const [messageLen, setMessageLen] = useState(0);
  const MESSAGE_MAX = 250;

  const autoResizeMessage = () => {
    const el = messageRef.current;
    if (!el) return;

    // Reset first so shrink also works
    el.style.height = "auto";

    const max = 320; // keep in sync with CSS max-height
    const next = Math.min(el.scrollHeight, max);
    el.style.height = `${next}px`;
    el.style.overflowY = el.scrollHeight > max ? "auto" : "hidden";
  };

  useEffect(() => {
    autoResizeMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const t = {
    title: isTr ? "Bizimle İletişime Geçin" : "Contact Us",
    subtitle: isTr 
      ? "Sorularınız, önerileriniz veya destek talepleriniz için buradayız. Size en kısa sürede dönüş yapacağız."
      : "We're here to help with your questions, suggestions, or support requests. We'll get back to you as soon as possible.",
    nameLabel: isTr ? "Ad Soyad" : "Full Name",
    emailLabel: isTr ? "E-posta" : "Email",
    subjectLabel: isTr ? "Konu" : "Subject",
    messageLabel: isTr ? "Mesajınız" : "Your Message",
    messageHelp: isTr ? `En fazla ${MESSAGE_MAX} karakter` : `Max ${MESSAGE_MAX} characters`,
    submitBtn: isTr ? "Mesaj Gönder" : "Send Message",
    subjects: isTr 
      ? ["Genel Soru", "Teknik Destek", "Satış", "Ortaklık", "Diğer"]
      : ["General Inquiry", "Technical Support", "Sales", "Partnership", "Other"],
    faqTitle: isTr ? "Sıkça Sorulan Sorular" : "Frequently Asked Questions",
    faqText: isTr ? "Belki de cevabınız buradadır." : "Maybe your answer is here.",
    faqLink: isTr ? "SSS Sayfasına Git" : "Go to FAQ Page",
  };

  return (
    <SiteLayout>
      <section className={styles.page}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>{t.title}</h1>
            <p className={styles.subtitle}>{t.subtitle}</p>
          </header>

          <div className={styles.content}>
            <div className={styles.card}>
              <div className={styles.cardGlow} aria-hidden="true" />
              <div className={styles.cardInner}>
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                  <div className={styles.fieldGrid}>
                    <label className={styles.field}>
                      <span className={styles.label}>{t.nameLabel}</span>
                      <input
                        className={styles.input}
                        type="text"
                        placeholder={isTr ? "Örn. Ahmet Yılmaz" : "e.g. John Doe"}
                        required
                      />
                    </label>
                    <label className={styles.field}>
                      <span className={styles.label}>{t.emailLabel}</span>
                      <input
                        className={styles.input}
                        type="email"
                        placeholder="e.g. name@company.com"
                        required
                      />
                    </label>
                  </div>

                  <label className={styles.field}>
                    <span className={styles.label}>{t.subjectLabel}</span>
                    <SubjectSelect
                      items={t.subjects}
                      value={subject}
                      onChange={setSubject}
                      name="subject"
                      required
                      placeholder={isTr ? "Bir konu seçin" : "Select a subject"}
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>{t.messageLabel}</span>
                    <textarea
                      className={styles.textarea}
                      ref={messageRef}
                      maxLength={MESSAGE_MAX}
                      aria-describedby={messageHelpId}
                      onInput={(e) => {
                        autoResizeMessage();
                        if (e.currentTarget) setMessageLen(e.currentTarget.value.length);
                      }}
                      onFocus={autoResizeMessage}
                      placeholder={isTr ? "Size nasıl yardımcı olabiliriz?" : "How can we help you?"}
                      required
                    ></textarea>
                    <div className={styles.fieldHelp} id={messageHelpId}>
                      <span>{t.messageHelp}</span>
                      <span className={styles.charCount}>
                        {messageLen}/{MESSAGE_MAX}
                      </span>
                    </div>
                  </label>

                  <button type="submit" className={styles.submitBtn}>
                    {t.submitBtn}
                  </button>
                </form>
              </div>
            </div>

            <aside className={styles.infoSection}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  {t.faqTitle}
                </h3>
                <p className={styles.infoText}>{t.faqText}</p>
                <a href="/faq" className={styles.infoLink}>{t.faqLink}</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
