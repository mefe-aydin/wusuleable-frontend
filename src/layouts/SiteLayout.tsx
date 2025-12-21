import type { ReactNode } from "react";

import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";

type Props = {
  children: ReactNode;
};

export function SiteLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-sm font-semibold tracking-tight">Wusuleable</div>
        <LanguageSwitcher />
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 pb-20">{children}</main>
      <footer className="mx-auto w-full max-w-6xl px-6 py-10 text-xs text-zinc-500 dark:text-zinc-400">
        © {new Date().getFullYear()} Wusuleable
      </footer>
    </div>
  );
}


