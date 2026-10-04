"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { flushSync } from "react-dom";
import type { AnchorHTMLAttributes, MouseEvent } from "react";

type AnchorLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  /** Runs for same-tab navigation, not modified clicks or downloads. */
  onNavigate?: () => void;
};

export function AnchorLink({
  href,
  onNavigate,
  onClick,
  children,
  ...rest
}: AnchorLinkProps) {
  const pathname = usePathname();
  const isFragment = href.startsWith("#");

  const closeBeforeNavigation = () => {
    // Release the menu's inert/scroll lock and restore focus before scrolling.
    if (onNavigate) flushSync(onNavigate);
  };

  if (isFragment && pathname === "/") {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      const link = event.currentTarget;
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        (link.target && link.target !== "_self") ||
        link.hasAttribute("download")
      )
        return;
      closeBeforeNavigation();
      // Keep native fragment navigation: it scrolls even when the hash is
      // unchanged, and preserves browser Back/Forward and reduced-motion CSS.
    };

    return (
      <a href={href} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link
      href={isFragment ? `/${href}` : href}
      onNavigate={closeBeforeNavigation}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Link>
  );
}
