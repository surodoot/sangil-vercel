"use client";

import { useEffect } from "react";

/**
 * 모든 .glass-panel / .glass-panel-dark 요소에 마우스 위치를 따라가는
 * 절제된 반사광(::after의 --mx/--my)을 제공합니다. 패널마다 리스너를
 * 붙이지 않고 전역 리스너 하나로 처리해 성능 비용을 최소화합니다.
 * 터치 기기에서는 hover 개념이 없으므로 자연스럽게 비활성 상태로 유지됩니다.
 */
export function GlassPointerTracker() {
  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const target = (event.target as HTMLElement)?.closest<HTMLElement>(
        ".glass-panel, .glass-panel-dark",
      );
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const mx = ((event.clientX - rect.left) / rect.width) * 100;
      const my = ((event.clientY - rect.top) / rect.height) * 100;
      target.style.setProperty("--mx", `${mx}%`);
      target.style.setProperty("--my", `${my}%`);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return null;
}
