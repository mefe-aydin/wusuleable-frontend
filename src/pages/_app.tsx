import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const locale = router.locale;
    if (!locale) return;

    // Next.js i18n uses this cookie for persisting the user's locale preference.
    // Keep it updated whenever the user navigates in a specific locale.
    document.cookie = `NEXT_LOCALE=${encodeURIComponent(locale)}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }, [router.locale]);

  return <Component {...pageProps} />;
}
