"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * 사용자가 OS/브라우저에서 "동작 줄이기(prefers-reduced-motion)"를
 * 설정했는지 확인합니다. true인 경우 컴포넌트는 대부분의 애니메이션과
 * 패럴랙스, 자동 전환 효과를 비활성화해야 합니다.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
