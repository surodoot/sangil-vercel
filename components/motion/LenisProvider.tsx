"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import type Lenis from "lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { loadGsap } from "@/lib/gsap";

const LenisContext = createContext<Lenis | null>(null);

/**
 * 부드러운 스크롤(Lenis)과 GSAP ScrollTrigger를 동기화하고, 하위 컴포넌트가
 * 앵커 이동 시 lenis.scrollTo()를 사용할 수 있도록 컨텍스트로 제공합니다.
 * - Lenis/GSAP는 번들 크기가 크므로 클라이언트에서 동적으로 불러옵니다.
 * - "동작 줄이기" 환경에서는 완전히 비활성화되어 브라우저 기본 스크롤을 사용합니다.
 * - 탭이 비활성화되면 스크롤 루프를 멈춰 성능을 아낍니다.
 * - 사용자의 스크롤 입력을 가로채거나 위치를 강제로 바꾸지 않습니다(앵커 클릭 시에만 이동).
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // 초기 상태가 이미 null이므로 별도 setState 없이 구독을 건너뜁니다.
    if (prefersReducedMotion) return;

    let cancelled = false;
    let instance: Lenis | null = null;
    let tickCallback: ((time: number) => void) | null = null;
    let removeGsapTicker: (() => void) | null = null;

    Promise.all([import("lenis"), loadGsap()]).then(([lenisModule, { gsap, ScrollTrigger }]) => {
      if (cancelled) return;
      const LenisConstructor = lenisModule.default;

      instance = new LenisConstructor({
        duration: 1.05,
        smoothWheel: true,
        touchMultiplier: 1,
        wheelMultiplier: 1,
      });
      setLenis(instance);

      instance.on("scroll", ScrollTrigger.update);

      tickCallback = (time: number) => {
        instance?.raf(time * 1000);
      };
      gsap.ticker.add(tickCallback);
      gsap.ticker.lagSmoothing(0);
      removeGsapTicker = () => {
        if (tickCallback) gsap.ticker.remove(tickCallback);
      };
    });

    const handleVisibility = () => {
      if (document.hidden) {
        instance?.stop();
        document.body.classList.add("tab-hidden");
      } else {
        instance?.start();
        document.body.classList.remove("tab-hidden");
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", handleVisibility);
      removeGsapTicker?.();
      instance?.destroy();
      setLenis(null);
    };
  }, [prefersReducedMotion]);

  return (
    <LenisContext.Provider value={lenis}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}

/**
 * 헤더 높이를 고려해 목표 앵커로 부드럽게 이동합니다. Lenis가 비활성화된
 * 경우(동작 줄이기, 초기 로딩 중)에는 네이티브 scrollIntoView로 대체됩니다.
 */
export function scrollToAnchor(lenis: Lenis | null, hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;

  if (lenis) {
    lenis.scrollTo(target as HTMLElement, { offset: -72, duration: 1.2 });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
