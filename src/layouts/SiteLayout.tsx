import type { ReactNode } from "react";

import { Header } from "@/components/layout/Header";
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
      <footer className={styles.footer}>
        © {new Date().getFullYear()} Wusuleable
      </footer>
    </div>
  );
}


