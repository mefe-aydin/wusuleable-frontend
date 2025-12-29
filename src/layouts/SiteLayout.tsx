import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LanguageSyncToast } from "@/components/layout/LanguageSyncToast";
import styles from "./SiteLayout.module.scss";

type Props = {
  children: ReactNode;
};

export function SiteLayout({ children }: Props) {
  return (
    <div className={styles.root}>
      <a href="#main-content" className={styles.skipLink}>
        İçeriğe atla
      </a>
      <Header />
      <main id="main-content" className={styles.main}>
        {children}
      </main>
      <LanguageSyncToast />
      <Footer />
    </div>
  );
}


