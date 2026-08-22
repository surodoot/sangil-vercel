"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ParallaxLayerProps {
  children: ReactNode;
  /** 이동 범위(px). 값이 클수록 스크롤에 더 빠르게 반응합니다. */
  speed?: number;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

/**
 * 섹션이 뷰포트를 지나는 동안 자식을 세로로 살짝 흘려보내는 범용
 * 패럴랙스 래퍼입니다. 스크롤 위치를 강제로 바꾸지 않고, 일반 스크롤에
 * 자연스럽게 얹혀 움직입니다. 우주 배경의 은은한 글로우(성운) 블롭 등에
 * 사용하면 별빛 레이어와 함께 깊이감을 만듭니다. "동작 줄이기" 환경에서는
 * 이동이 비활성화됩니다.
 */
export function ParallaxLayer({
  children,
  speed = 24,
  className,
  "aria-hidden": ariaHidden,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  return (
    <motion.div
      ref={ref}
      style={{ y: prefersReducedMotion ? 0 : y }}
      className={className}
      aria-hidden={ariaHidden}
    >
      {children}
    </motion.div>
  );
}
