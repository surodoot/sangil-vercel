"use client";
import { ArrowUp } from "lucide-react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
export function BackToTop() {
  const { scrolled } = useScrollProgress();
  if (!scrolled) return null;
  return (
    <a
      href="#top"
      aria-label="맨 위로 이동"
      className="touch-target fixed bottom-24 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-lg border border-line-strong bg-white text-navy shadow-sm hover:border-sapphire hover:text-sapphire lg:bottom-6 lg:right-6"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </a>
  );
}
