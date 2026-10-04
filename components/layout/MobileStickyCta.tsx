"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { AnchorLink } from "@/components/ui/AnchorLink";

export function MobileStickyCta() {
  const pathname = usePathname();
  return pathname === "/" ? <HomepageStickyCta /> : null;
}

function HomepageStickyCta() {
  const [contactInView, setContactInView] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target) return;

    // Any visible part of the form is enough to remove the bottom overlay.
    const observer = new IntersectionObserver(
      ([entry]) => setContactInView(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateEditing = () => {
      const active = document.activeElement;
      setEditing(
        active instanceof HTMLElement &&
          (active.matches("input, textarea, select") ||
            active.isContentEditable),
      );
    };
    const handleFocusOut = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateEditing);
    };

    document.addEventListener("focusin", updateEditing);
    document.addEventListener("focusout", handleFocusOut);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("focusin", updateEditing);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  if (contactInView || editing) return null;

  return (
    <div
      data-mobile-sticky-cta
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e5e9ed] bg-white px-6 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] lg:hidden"
    >
      <div className="mx-auto flex max-w-[640px] items-center justify-between gap-4">
        <span className="text-[12px] leading-relaxed text-[#52616d]">
          제작을 계획 중이신가요?
        </span>
        <AnchorLink
          href="#contact"
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-[#2358e8] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1946c4]"
        >
          견적 문의
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </AnchorLink>
      </div>
    </div>
  );
}
