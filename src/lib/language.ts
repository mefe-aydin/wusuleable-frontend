export type LanguageCode = "TR" | "EN";

const STORAGE_KEY = "wusuleable.languageCode";

export function localeToLanguageCode(locale: string | undefined | null): LanguageCode {
  return locale === "en" ? "EN" : "TR";
}

export function languageCodeToLocale(code: string | undefined | null): "tr" | "en" | null {
  const v = String(code ?? "").toUpperCase();
  if (v === "TR") return "tr";
  if (v === "EN") return "en";
  return null;
}

export function getStoredLanguageCode(): LanguageCode | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const v = String(raw ?? "").toUpperCase();
    if (v === "TR" || v === "EN") return v as LanguageCode;
    return null;
  } catch {
    return null;
  }
}

export function setStoredLanguageCode(code: LanguageCode) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // ignore
  }
}


