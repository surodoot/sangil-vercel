"use client";

import { useEffect, useState } from "react";

interface ScrollState {
  /** 0~1 사이 페이지 전체 스크롤 진행률 */
  progress: number;
  /** 스크롤이 조금이라도 시작되었는지 (헤더 배경 전환 기준) */
  scrolled: boolean;
  /** 첫 화면(비주얼 영역)을 벗어났는지 (헤더 높이 축소 기준) */
  pastHero: boolean;
}

export function useScrollProgress(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    progress: 0,
    scrolled: false,
    pastHero: false,
  });

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setState({
        progress: height > 0 ? Math.min(Math.max(scrollTop / height, 0), 1) : 0,
        scrolled: scrollTop > 24,
        pastHero: scrollTop > window.innerHeight * 0.72,
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return state;
}
