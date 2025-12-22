import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import styles from "./Button.module.scss";

type Variant = "primary" | "secondary";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ComponentPropsWithoutRef<"button"> & {
    href?: never;
  };

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href">;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const variant: Variant = props.variant ?? "primary";
  const className = [styles.base, styles[variant], props.className ?? ""].join(" ");

  if ("href" in props && typeof props.href === "string") {
    const { href, children, className: _c, variant: _v, ...rest } = props;
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  const { children, className: _c, variant: _v, ...rest } = props;
  return (
    <button className={className} type="button" {...rest}>
      {children}
    </button>
  );
}


