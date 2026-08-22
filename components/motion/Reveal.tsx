"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * 렌더링 중 motion.create()를 호출하면 매 렌더마다 새로운 컴포넌트
 * 타입이 생성되어 상태가 초기화되므로, 실제 사용하는 태그만 모듈
 * 스코프에서 한 번 만들어 재사용합니다.
 */
const MOTION_TAGS = {
  div: motion.div,
  li: motion.li,
} as const;

type RevealTag = keyof typeof MOTION_TAGS;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  as?: RevealTag;
  /** stagger 애니메이션을 위한 부모 컨테이너로 사용할 때 true */
  container?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * 스크롤로 화면에 들어올 때 한 번 페이드업되는 공통 래퍼입니다.
 * "동작 줄이기" 환경에서는 이동 없이 즉시 나타납니다.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  duration = 0.7,
  as = "div",
  container = false,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = MOTION_TAGS[as];

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants: Variants = container
    ? {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: delay } },
      }
    : {
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, delay, ease: EASE },
        },
      };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

export const revealChildVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
}) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = MOTION_TAGS[as];

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={className} variants={revealChildVariants}>
      {children}
    </MotionTag>
  );
}
