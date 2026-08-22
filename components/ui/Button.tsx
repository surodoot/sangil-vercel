"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { Magnetic } from "@/components/motion/Magnetic";

type Variant = "primary" | "glass" | "ghost";
type Size = "md" | "lg";

const sizeClasses: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const baseClasses =
  "touch-target group relative inline-flex items-center justify-center gap-2 rounded-full font-en font-semibold tracking-tight transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sapphire disabled:cursor-not-allowed disabled:opacity-50";

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** 오른쪽 골드 화살표 아이콘 표시 여부 (기본 true, primary에서만 적용) */
  arrow?: boolean;
  className?: string;
}

interface ButtonAsLink extends CommonProps {
  href: string;
  /** 앵커(#) 이동 후(예: 모바일 메뉴 닫기) 실행할 동작 */
  onNavigate?: () => void;
}

interface ButtonAsButton
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

/**
 * 주요 버튼: 미드나이트 네이비 배경 + 펄 화이트 글자 + 골드 화살표,
 * 호버 시 골드 광택이 좌→우로 스윕되며 2~4px 상승하고, PC에서는
 * 커서 쪽으로 미세하게 끌리는 마그네틱 효과가 적용됩니다.
 * glass 버튼: 반투명 펄 화이트 Glassmorphism 보조 버튼입니다.
 */
export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "primary", size = "md", arrow = true, className, ...rest } = props;

  const variantClasses =
    variant === "primary"
      ? "gold-sweep bg-navy text-on-dark shadow-[0_16px_40px_rgba(11,31,58,0.28),inset_0_1px_0_rgba(216,191,145,0.35)] hover:-translate-y-[3px] hover:shadow-[0_20px_46px_rgba(11,31,58,0.34),inset_0_1px_0_rgba(216,191,145,0.5)]"
      : variant === "glass"
        ? "glass-panel text-heading hover:-translate-y-[2px]"
        : "text-body hover:text-navy";

  const classes = cn(baseClasses, sizeClasses[size], variantClasses, className);

  const content = (
    <>
      <span className="relative z-[2]">{children}</span>
      {variant === "primary" && arrow && (
        <ArrowRight
          className="relative z-[2] h-4 w-4 text-gold-soft transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  let element: ReactNode;

  if ("href" in rest && rest.href !== undefined) {
    const { href, onNavigate } = rest as { href: string; onNavigate?: () => void };
    element = href.startsWith("#") ? (
      <AnchorLink href={href} onNavigate={onNavigate} className={classes}>
        {content}
      </AnchorLink>
    ) : (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  } else {
    element = (
      <button
        type="button"
        className={classes}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }

  return variant === "primary" ? (
    <Magnetic strength={10} className={className}>
      {element}
    </Magnetic>
  ) : (
    element
  );
}
