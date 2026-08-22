"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

/**
 * 모바일 화면 하단 고정 "견적 문의" 버튼입니다.
 * 견적 문의 섹션이 실제로 화면에 보이는 동안에는 버튼이 입력 영역을
 * 가리지 않도록 자동으로 숨깁니다.
 */
export function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(target);

    const revealTimer = window.setTimeout(() => setVisible(true), 400);

    return () => {
      observer.disconnect();
      window.clearTimeout(revealTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-line bg-warm-white/95 px-4 pt-3 backdrop-blur-md lg:hidden"
        >
          <Button href="#contact" size="lg" className="w-full">
            견적 문의하기
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
