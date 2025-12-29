import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { decodeJwtPayload, getAuthToken } from "@/lib/authToken";
import {
  languageCodeToLocale,
  localeToLanguageCode,
  setStoredLanguageCode,
  type LanguageCode,
} from "@/lib/language";

import styles from "./LanguageSyncToast.module.scss";

export function LanguageSyncToast() {
  const router = useRouter();
  const isTr = router.locale === "tr";

  const [open, setOpen] = useState(false);
  const [tokenLanguageCode, setTokenLanguageCode] = useState<LanguageCode | null>(null);

  const currentLanguageCode = useMemo(() => localeToLanguageCode(router.locale), [router.locale]);

  useEffect(() => {
    const update = () => {
      const token = getAuthToken();
      if (!token) {
        setOpen(false);
        setTokenLanguageCode(null);
        return;
      }

      const payload = decodeJwtPayload(token);
      // Backend may send "tr"/"en" (lowercase) or "TR"/"EN" (uppercase).
      const code = String(payload?.languageCode ?? "").toUpperCase();
      const normalized = code === "TR" || code === "EN" ? (code as LanguageCode) : null;
      setTokenLanguageCode(normalized);

      if (!normalized) {
        setOpen(false);
        return;
      }

      // Show toast when backend language differs from current UI language.
      if (normalized === currentLanguageCode) {
        setOpen(false);
        return;
      }

      // Prevent showing repeatedly for the same token/session.
      try {
        const key = `wusuleable.languageToastShown:${String(payload?.userId ?? "")}:${String(payload?.iat ?? "")}:${normalized}`;
        if (window.sessionStorage.getItem(key) === "1") {
          setOpen(false);
          return;
        }
      } catch {
        // ignore
      }

      setOpen(true);
    };

    // Run once on mount and also when auth token changes.
    update();
    window.addEventListener("wusuleable:auth-token", update);
    return () => window.removeEventListener("wusuleable:auth-token", update);
  }, [currentLanguageCode]);

  if (!open || !tokenLanguageCode) return null;

  const title = isTr ? "Dil tercihin güncellendi" : "Language updated";
  const desc = isTr
    ? `Hesabın dili ${tokenLanguageCode} olarak geldi. Buradan değiştirebilirsin.`
    : `Your account language came as ${tokenLanguageCode}. You can change it here.`;

  const actionLabel =
    tokenLanguageCode === currentLanguageCode
      ? isTr
        ? "Tamam"
        : "OK"
      : isTr
        ? `${tokenLanguageCode} diline geç`
        : `Switch to ${tokenLanguageCode}`;

  const closeLabel = isTr ? "Kapat" : "Dismiss";

  const onPrimary = async () => {
    // Always store the backend preference once acknowledged.
    setStoredLanguageCode(tokenLanguageCode);
    try {
      const token = getAuthToken();
      const payload = decodeJwtPayload(token);
      const key = `wusuleable.languageToastShown:${String(payload?.userId ?? "")}:${String(payload?.iat ?? "")}:${tokenLanguageCode}`;
      window.sessionStorage.setItem(key, "1");
    } catch {
      // ignore
    }

    const nextLocale = languageCodeToLocale(tokenLanguageCode);
    if (nextLocale && nextLocale !== router.locale) {
      await router.push(router.asPath, undefined, { locale: nextLocale });
    }
    setOpen(false);
  };

  const onClose = () => {
    // Acknowledge without changing locale.
    setStoredLanguageCode(tokenLanguageCode);
    try {
      const token = getAuthToken();
      const payload = decodeJwtPayload(token);
      const key = `wusuleable.languageToastShown:${String(payload?.userId ?? "")}:${String(payload?.iat ?? "")}:${tokenLanguageCode}`;
      window.sessionStorage.setItem(key, "1");
    } catch {
      // ignore
    }
    setOpen(false);
  };

  return (
    <div className={styles.root} role="status" aria-live="polite">
      <div className={styles.card}>
        <div className={styles.text}>
          <div className={styles.title}>{title}</div>
          <div className={styles.desc}>{desc}</div>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.primary} onClick={onPrimary}>
            {actionLabel}
          </button>
          <button type="button" className={styles.secondary} onClick={onClose} aria-label={closeLabel}>
            {closeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}


