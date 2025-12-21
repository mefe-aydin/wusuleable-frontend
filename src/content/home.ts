import type { SupportedLocale } from "@/lib/i18n";

type HomeCopy = {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const HOME_COPY: Record<SupportedLocale, HomeCopy> = {
  en: {
    title: "Accessibility widget for better web experiences",
    subtitle:
      "Add our lightweight widget to your website and make it easier to navigate for everyone.",
    ctaPrimary: "Get started",
    ctaSecondary: "View dashboard",
  },
  tr: {
    title: "Daha erişilebilir web deneyimi için widget",
    subtitle:
      "Web sitene hafif widget’ımızı ekle, herkes için gezinmeyi kolaylaştır.",
    ctaPrimary: "Başla",
    ctaSecondary: "Paneli görüntüle",
  },
};

export function getHomeCopy(locale: SupportedLocale): HomeCopy {
  return HOME_COPY[locale];
}


