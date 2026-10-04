"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes } from "react";

type AnchorLinkProps = Omit<LinkProps, "onNavigate"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    /** Runs for same-tab navigation, not modified clicks or downloads. */
    onNavigate?: () => void;
  };

/** Use the router's native hash/history handling, without intercepting clicks. */
export function AnchorLink({
  href,
  onNavigate,
  children,
  ...rest
}: AnchorLinkProps) {
  const pathname = usePathname();
  const destination =
    typeof href === "string" && href.startsWith("#") && pathname !== "/"
      ? `/${href}`
      : href;

  return (
    <Link href={destination} onNavigate={onNavigate} {...rest}>
      {children}
    </Link>
  );
}
