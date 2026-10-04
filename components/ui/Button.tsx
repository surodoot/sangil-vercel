"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AnchorLink } from "@/components/ui/AnchorLink";

type Variant = "primary" | "glass" | "ghost";
interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  arrow?: boolean;
  className?: string;
}
interface ButtonAsLink extends CommonProps {
  href: string;
  onNavigate?: () => void;
}
interface ButtonAsButton
  extends
    CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    children,
    variant = "primary",
    size = "md",
    arrow: _arrow,
    className,
    ...rest
  } = props;
  void _arrow;
  const classes = cn(
    "touch-target inline-flex shrink-0 items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    size === "lg"
      ? "min-h-14 px-7 py-3.5 text-base"
      : "min-h-11 px-5 py-2.5 text-sm",
    variant === "primary"
      ? "border border-sapphire bg-sapphire text-white hover:border-[#1746c5] hover:bg-[#1746c5]"
      : variant === "glass"
        ? "border border-line-strong bg-white text-heading hover:border-sapphire hover:text-sapphire"
        : "text-body hover:text-sapphire",
    className,
  );
  if ("href" in rest && rest.href !== undefined) {
    const { href, onNavigate } = rest as ButtonAsLink;
    return href.startsWith("#") ? (
      <AnchorLink href={href} onNavigate={onNavigate} className={classes}>
        {children}
      </AnchorLink>
    ) : (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type="button"
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
