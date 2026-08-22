"use client";

import { useMemo, useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface StarFieldProps {
  /** 별 개수 (기본 80, 모바일에서는 절반 정도로 줄여 전달하는 것을 권장) */
  count?: number;
  className?: string;
  /** 스크롤에 따라 별이 서로 다른 속도로 흐르는 패럴랙스 효과 (기본 true) */
  parallax?: boolean;
}

/**
 * 시드 기반 의사난수 생성기 — Math.random()을 직접 쓰면 서버/클라이언트
 * 렌더 결과가 매번 달라져 하이드레이션 불일치가 발생하므로, 고정된 시드로
 * 항상 같은 별 배치가 나오도록 합니다.
 */
function mulberry32(seed: number) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  peakOpacity: number;
  glow: boolean;
}

function generateStars(count: number, seed: number): Star[] {
  const random = mulberry32(seed);
  return Array.from({ length: count }).map((_, i) => {
    const roll = random();
    const size = roll < 0.78 ? 1 : roll < 0.94 ? 1.6 : 2.2;
    return {
      id: i,
      top: Number((random() * 100).toFixed(2)),
      left: Number((random() * 100).toFixed(2)),
      size,
      delay: Number((random() * 6).toFixed(2)),
      duration: Number((3.2 + random() * 4).toFixed(2)),
      peakOpacity: Number((0.55 + random() * 0.45).toFixed(2)),
      glow: size > 1.8,
    };
  });
}

function StarDot({ star }: { star: Star }) {
  return (
    <span
      className="absolute rounded-full bg-white"
      style={
        {
          top: `${star.top}%`,
          left: `${star.left}%`,
          width: `${star.size}px`,
          height: `${star.size}px`,
          animation: `star-twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          boxShadow: star.glow ? "0 0 5px 1px rgba(255,255,255,0.55)" : undefined,
          "--star-peak": star.peakOpacity,
        } as CSSProperties
      }
    />
  );
}

function StarDotStatic({ star }: { star: Star }) {
  return (
    <span
      className="absolute rounded-full bg-white"
      style={{
        top: `${star.top}%`,
        left: `${star.left}%`,
        width: `${star.size}px`,
        height: `${star.size}px`,
        opacity: star.peakOpacity * 0.7,
        boxShadow: star.glow ? "0 0 5px 1px rgba(255,255,255,0.55)" : undefined,
      }}
    />
  );
}

/**
 * 밤하늘처럼 반짝이는 별빛 배경 레이어입니다. 다크(보라/네이비) 배경
 * 섹션 안에서 절대 위치 컨테이너 위에 배치해 사용하세요.
 *
 * 별을 크기별로 두 개의 깊이 레이어로 나누어, 섹션이 뷰포트를 지나는
 * 동안 서로 다른 속도로 흐르는 패럴랙스 효과를 줍니다(먼 별은 느리게,
 * 크고 밝은 별은 조금 더 빠르게). 스크롤 위치를 강제로 바꾸는 하이재킹은
 * 없으며, 일반 스크롤에 자연스럽게 얹혀 움직이는 시각 효과입니다.
 * "동작 줄이기" 환경에서는 반짝임과 패럴랙스 이동이 모두 비활성화되고
 * 고정된 밝기로만 표시됩니다.
 */
export function StarField({ count = 80, className, parallax = true }: StarFieldProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const stars = useMemo(() => generateStars(count, 20260818), [count]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const farStars = useMemo(() => stars.filter((s) => !s.glow), [stars]);
  const nearStars = useMemo(() => stars.filter((s) => s.glow), [stars]);

  const yFar = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const yNear = useTransform(scrollYProgress, [0, 1], [-46, 46]);

  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
        aria-hidden="true"
      >
        {stars.map((star) => (
          <StarDotStatic key={star.id} star={star} />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      <motion.div style={{ y: parallax ? yFar : 0 }} className="absolute inset-0">
        {farStars.map((star) => (
          <StarDot key={star.id} star={star} />
        ))}
      </motion.div>
      <motion.div style={{ y: parallax ? yNear : 0 }} className="absolute inset-0">
        {nearStars.map((star) => (
          <StarDot key={star.id} star={star} />
        ))}
      </motion.div>
    </div>
  );
}
