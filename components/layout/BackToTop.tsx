"use client";

import { ArrowUp } from "lucide-react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useLenis } from "@/components/motion/LenisProvider";

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function BackToTop() {
  const { progress, scrolled } = useScrollProgress();
  const lenis = useLenis();

  if (!scrolled) return null;

  const offset = CIRCUMFERENCE * (1 - progress);

  const handleClick = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`맨 위로 이동. 현재 페이지 스크롤 진행률 ${Math.round(progress * 100)}퍼센트`}
      className="glass-panel touch-target fixed bottom-24 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full text-navy transition-transform hover:-translate-y-0.5 lg:bottom-8 lg:right-8"
    >
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r={RADIUS} fill="none" stroke="rgba(10,28,51,0.12)" strokeWidth="2" />
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="url(#backToTopGradient)"
          strokeWidth="2"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.15s linear" }}
        />
        <defs>
          <linearGradient id="backToTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2457c5" />
            <stop offset="100%" stopColor="#c9a96e" />
          </linearGradient>
        </defs>
      </svg>
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
