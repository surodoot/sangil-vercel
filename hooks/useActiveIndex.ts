"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 여러 개의 요소 중 화면 중앙에 가장 가까운(교차 중인) 요소의 인덱스를
 * 추적합니다. 생산 진행 과정 타임라인처럼 스크롤에 따라 단계를 강조할 때
 * 사용합니다. `setRef(index)`를 각 요소의 ref 콜백으로 연결하세요.
 */
export function useActiveIndex(count: number) {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = elementsRef.current.findIndex((el) => el === entry.target);
          if (idx !== -1) setActive(idx);
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );

    elementsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [count]);

  const setRef = (index: number) => (el: HTMLElement | null) => {
    elementsRef.current[index] = el;
  };

  return { active, setRef };
}
