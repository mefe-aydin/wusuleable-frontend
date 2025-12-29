import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useId, useRef, useState } from "react";

import { postLogout } from "@/api/auth";
import { clearAuthToken, getUserFromToken } from "@/lib/authToken";

import styles from "./UserDropdown.module.scss";

type UserDropdownProps = {
  userType?: string | null;
  hasSubscription?: boolean;
};

function getInitials(email: string | null): string {
  if (!email) return "U";
  const parts = email.split("@")[0]?.split(/[._-]/) ?? [];
  if (parts.length >= 2) {
    return (parts[0]?.[0] ?? "").toUpperCase() + (parts[1]?.[0] ?? "").toUpperCase();
  }
  return email[0]?.toUpperCase() ?? "U";
}

export function UserDropdown({ userType, hasSubscription = true }: UserDropdownProps) {
  const router = useRouter();
  const isTr = router.locale === "tr";
  const detailsRef = useRef<HTMLDetailsElement | null>(null);
  const menuId = useId();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const userInfo = getUserFromToken();
  const email = userInfo?.email ?? null;
  const initials = getInitials(email);

  const dashboardLabel = isTr ? "Dashboard" : "Dashboard";
  const settingsLabel = isTr ? "Ayarlar" : "Settings";
  const adminPanelLabel = isTr ? "Admin Paneli" : "Admin Panel";
  const logoutLabel = isTr ? "Çıkış Yap" : "Log out";

  const menuItems: Array<{ href?: string; label: string; action?: () => void; divider?: boolean }> = [
    { href: "/dashboard", label: dashboardLabel },
    { href: "/settings", label: settingsLabel },
    ...(userType === "SUPER_ADMIN" ? [{ href: "/admin", label: adminPanelLabel }] : []),
    { divider: true },
    { label: logoutLabel, action: () => handleLogout() },
  ];

  async function handleLogout() {
    try {
      await postLogout();
    } catch {
      // If backend logout fails, still clear local auth so user is logged out client-side.
    } finally {
      clearAuthToken();
      if (detailsRef.current) detailsRef.current.open = false;
      router.push("/");
    }
  }

  useEffect(() => {
    const root = detailsRef.current;
    if (!root) return;

    function handleToggle() {
      setIsOpen(root.open);
      if (!root.open) {
        setActiveIndex(-1);
      }
    }

    root.addEventListener("toggle", handleToggle);
    return () => root.removeEventListener("toggle", handleToggle);
  }, []);

  useEffect(() => {
    function close() {
      if (detailsRef.current) detailsRef.current.open = false;
    }

    function onPointerDown(e: PointerEvent) {
      const root = detailsRef.current;
      if (!root || !isOpen) return;
      const target = e.target as Node | null;
      if (target && root.contains(target)) return;
      close();
    }

    function onKeyDown(e: KeyboardEvent) {
      const root = detailsRef.current;
      if (!root || !isOpen) {
        if (e.key === "Enter" || e.key === " ") {
          const summary = root?.querySelector("summary");
          if (summary && document.activeElement === summary) {
            e.preventDefault();
            root.open = true;
          }
        }
        return;
      }

      const items = Array.from(root.querySelectorAll<HTMLElement>("[role='menuitem']"));

      switch (e.key) {
        case "Escape": {
          e.preventDefault();
          close();
          root.querySelector("summary")?.focus();
          break;
        }
        case "ArrowDown": {
          e.preventDefault();
          const next = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
          setActiveIndex(next);
          items[next]?.focus();
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const prev = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
          setActiveIndex(prev);
          items[prev]?.focus();
          break;
        }
        case "Home": {
          e.preventDefault();
          setActiveIndex(0);
          items[0]?.focus();
          break;
        }
        case "End": {
          e.preventDefault();
          const last = items.length - 1;
          setActiveIndex(last);
          items[last]?.focus();
          break;
        }
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, activeIndex]);

  return (
    <details ref={detailsRef} className={styles.root}>
      <summary className={styles.summary} aria-label={isTr ? "Kullanıcı menüsü" : "User menu"} aria-haspopup="menu" aria-expanded={isOpen}>
        <span className={styles.avatar} aria-hidden="true">
          {initials}
        </span>
        <svg className={styles.chev} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>

      <div className={styles.menu} role="menu" aria-label={isTr ? "Kullanıcı menüsü" : "User menu"} id={menuId}>
        {menuItems.map((item, idx) => {
          if (item.divider) {
            return <div key={`divider-${idx}`} className={styles.divider} role="separator" />;
          }

          if (item.action) {
            return (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                className={styles.item}
                onClick={item.action}
                onMouseMove={() => setActiveIndex(idx)}
              >
                {item.label}
              </button>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href!}
              role="menuitem"
              className={styles.item}
              onClick={() => {
                if (detailsRef.current) detailsRef.current.open = false;
              }}
              onMouseMove={() => setActiveIndex(idx)}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </details>
  );
}

