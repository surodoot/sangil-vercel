"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";
import { navigation } from "@/data/company";
import { Logo } from "@/components/ui/Logo";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { MobileMenu } from "./MobileMenu";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const sectionIds = navigation.map((item) => item.href.slice(1));
const primaryItems = navigation.filter((item) => item.href !== "#contact");

export function Header() {
  const pathname = usePathname();

  // A route change also resets the menu and reconnects section observation.
  return <HeaderContent key={pathname} pathname={pathname} />;
}

function HeaderContent({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const observedId = useActiveSection(sectionIds);
  const activeId = pathname === "/" ? observedId : null;
  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    const handleBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };

    desktop.addEventListener("change", handleBreakpoint);
    window.addEventListener("popstate", closeMenu);
    window.addEventListener("hashchange", closeMenu);
    return () => {
      desktop.removeEventListener("change", handleBreakpoint);
      window.removeEventListener("popstate", closeMenu);
      window.removeEventListener("hashchange", closeMenu);
    };
  }, [open, closeMenu]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        본문 바로가기
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e5e9ed] bg-white pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex h-[68px] max-w-[1376px] items-center justify-between gap-5 px-6 lg:h-20 lg:px-12">
          <Logo />

          <nav
            aria-label="주요 메뉴"
            className="hidden h-full items-center gap-6 lg:flex xl:gap-8"
          >
            {primaryItems.map((item) => {
              const active = activeId === item.href.slice(1);
              return (
                <AnchorLink
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "location" : undefined}
                  className={cn(
                    "relative flex h-full items-center whitespace-nowrap text-[14px] font-semibold transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:transition-colors",
                    active
                      ? "text-[#2358e8] after:bg-[#2358e8]"
                      : "text-[#52616d] after:bg-transparent hover:text-[#172b3a]",
                  )}
                >
                  {item.label}
                </AnchorLink>
              );
            })}
          </nav>

          <AnchorLink
            href="#contact"
            className="hidden min-h-11 items-center justify-center gap-3 rounded-md bg-[#2358e8] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1946c4] lg:inline-flex"
          >
            견적 문의
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </AnchorLink>

          <button
            type="button"
            aria-label="메뉴 열기"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
            className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-[#172b3a] transition-colors hover:bg-[#f1f4f6] lg:hidden"
          >
            <Menu className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={closeMenu} activeId={activeId} />
    </>
  );
}
