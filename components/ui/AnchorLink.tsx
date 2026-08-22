"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { useLenis, scrollToAnchor } from "@/components/motion/LenisProvider";

type AnchorLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    /** 클릭 후(모바일 메뉴 닫기 등) 실행할 추가 동작 */
    onNavigate?: () => void;
  };

/**
 * 페이지 내부 앵커(#id)로 이동할 때 Lenis 기반 부드러운 스크롤을 사용하는
 * 링크입니다. 자바스크립트가 없거나 Lenis가 비활성화된 경우에도 실제 <a href>
 * 이므로 브라우저 기본 앵커 이동이 그대로 동작합니다(점진적 향상).
 */
export function AnchorLink({ href, onNavigate, onClick, children, ...rest }: AnchorLinkProps) {
  const lenis = useLenis();
  const hrefStr = typeof href === "string" ? href : (href.hash ?? "");

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (hrefStr.startsWith("#") && hrefStr.length > 1) {
      event.preventDefault();
      scrollToAnchor(lenis, hrefStr);
      window.history.pushState(null, "", hrefStr);
    }
    onNavigate?.();
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
