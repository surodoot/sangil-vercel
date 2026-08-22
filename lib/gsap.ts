"use client";

import type { gsap as GsapCore } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

type GsapModule = {
  gsap: typeof GsapCore;
  ScrollTrigger: typeof ScrollTriggerType;
};

let cached: GsapModule | null = null;
let loading: Promise<GsapModule> | null = null;

/**
 * GSAP과 ScrollTrigger는 번들 크기가 크므로 실제로 필요한 시점(데스크톱
 * 인터랙션 초기화 시)에만 동적으로 불러옵니다. 최초 1회만 네트워크에서
 * 로드하고, 이후에는 캐시된 모듈을 재사용합니다.
 */
export async function loadGsap(): Promise<GsapModule> {
  if (cached) return cached;
  if (loading) return loading;

  loading = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([gsapModule, scrollTriggerModule]) => {
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      cached = { gsap, ScrollTrigger };
      return cached;
    },
  );

  return loading;
}
