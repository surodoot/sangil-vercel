"use client";

import { useState, type CSSProperties } from "react";
import { Menu, FileText } from "lucide-react";
import { navigation } from "@/data/company";
import { Logo } from "@/components/ui/Logo";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const { scrolled, pastHero } = useScrollProgress();
  const sectionIds = navigation.map((item) => item.href.replace("#", ""));
  const activeId = useActiveSection(sectionIds);
  const primaryItems = navigation.filter((item) => item.href !== "#contact");

  return (
    <>
      <a href="#main-content" className="skip-link">
        본문 바로가기
      </a>

      <header className="fixed inset-x-0 top-0 z-50 pt-safe">
        <div
          className={cn(
            "mx-auto max-w-6xl px-4 transition-[padding] duration-500 sm:px-6 lg:px-8",
            pastHero ? "pt-3" : "pt-5",
          )}
        >
          <div
            style={{ "--glass-alpha": scrolled ? 0.85 : 0.62 } as CSSProperties}
            className={cn(
              "glass-panel flex items-center justify-between rounded-full transition-[padding] duration-500",
              pastHero ? "px-4 py-2" : "px-5 py-3",
            )}
          >
            {/* 하단 미세한 샴페인 골드 라인 */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
            />

            <Logo />

            <nav aria-label="주요 메뉴" className="hidden items-center gap-1 lg:flex">
              {primaryItems.map((item) => {
                const id = item.href.replace("#", "");
                const active = activeId === id;
                return (
                  <AnchorLink
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 font-en text-sm font-medium transition-colors duration-300",
                      active
                        ? "bg-sapphire/10 text-sapphire ring-1 ring-sapphire/25"
                        : "text-body hover:text-navy",
                    )}
                  >
                    {item.label}
                  </AnchorLink>
                );
              })}
            </nav>

            <div className="hidden lg:flex lg:items-center">
              <Button href="#contact" size="md">
                견적 문의
              </Button>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <AnchorLink
                href="#contact"
                aria-label="견적 문의"
                className="touch-target flex items-center justify-center rounded-full border border-line-strong text-navy"
              >
                <FileText className="h-5 w-5" aria-hidden="true" />
              </AnchorLink>
              <button
                type="button"
                aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen(true)}
                className="touch-target flex items-center justify-center rounded-full border border-line-strong text-navy"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} activeId={activeId} />
    </>
  );
}
