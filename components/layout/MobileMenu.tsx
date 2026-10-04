"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { navigation, contactInfo } from "@/data/company";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { isConfigured, formatPhoneHref } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  activeId: string | null;
}

export function MobileMenu({ open, onClose, activeId }: MobileMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, open, onClose);

  useLayoutEffect(() => {
    if (!open) return;

    const body = document.body;
    const root = document.documentElement;
    const originalBodyOverflow = body.style.overflow;
    const originalRootOverflow = root.style.overflow;
    const originalOverscroll = body.style.overscrollBehavior;

    body.style.overflow = "hidden";
    root.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";

    return () => {
      body.style.overflow = originalBodyOverflow;
      root.style.overflow = originalRootOverflow;
      body.style.overscrollBehavior = originalOverscroll;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={containerRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-menu-title"
      tabIndex={-1}
      className="fixed inset-0 z-[60] flex h-dvh flex-col bg-white pt-[env(safe-area-inset-top)] text-[#172b3a] lg:hidden"
    >
      <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-[#e5e9ed] px-6">
        <span id="mobile-menu-title" className="text-base font-bold">
          전체 메뉴
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="메뉴 닫기"
          data-autofocus
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-md text-[#172b3a] transition-colors hover:bg-[#f1f4f6]"
        >
          <X className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-6 pt-6">
        <p className="mb-5 font-en text-[10px] font-semibold tracking-[0.18em] text-[#6b7b88]">
          SANGIL ENGINEERING
        </p>
        <nav aria-label="전체 메뉴">
          <ul>
            {navigation.map((item, index) => {
              const active = activeId === item.href.slice(1);
              return (
                <li key={item.href}>
                  <AnchorLink
                    href={item.href}
                    onNavigate={onClose}
                    aria-current={active ? "location" : undefined}
                    className={`flex min-h-16 items-center justify-between gap-5 border-b border-[#e5e9ed] py-4 text-[22px] font-semibold tracking-[-0.03em] transition-colors hover:text-[#2358e8] ${
                      active ? "text-[#2358e8]" : "text-[#172b3a]"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="font-en text-[11px] font-medium tracking-normal text-[#8a969f]"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </AnchorLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="shrink-0 border-t border-[#e5e9ed] px-6 pt-4 pb-[max(20px,env(safe-area-inset-bottom))]">
        {isConfigured(contactInfo.phone) && (
          <a
            href={formatPhoneHref(contactInfo.phone)}
            className="mb-3 flex min-h-11 items-center font-en text-sm text-[#52616d]"
          >
            {contactInfo.phone}
          </a>
        )}
        <AnchorLink
          href="#contact"
          onNavigate={onClose}
          className="flex min-h-12 w-full items-center justify-center gap-3 rounded-md bg-[#2358e8] px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#1946c4]"
        >
          견적 문의하기
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </AnchorLink>
      </div>
    </div>
  );
}
