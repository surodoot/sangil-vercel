"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { navigation, contactInfo } from "@/data/company";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { Button } from "@/components/ui/Button";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { isConfigured, formatPhoneHref } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  activeId: string | null;
}

export function MobileMenu({ open, onClose, activeId }: MobileMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, open, onClose);

  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={containerRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="전체 메뉴"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex flex-col pt-safe lg:hidden"
          style={{
            background: "rgba(248, 247, 244, 0.86)",
            backdropFilter: "blur(28px) saturate(150%)",
            WebkitBackdropFilter: "blur(28px) saturate(150%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-sapphire/18 blur-[90px]" />
            <div className="absolute -right-10 top-1/3 h-64 w-64 rounded-full bg-violet/16 blur-[90px]" />
            <div className="absolute bottom-0 left-1/4 h-60 w-60 rounded-full bg-gold/14 blur-[90px]" />
          </div>
          <div className="absolute inset-0 -z-10 bg-blueprint-grid-fine opacity-[0.06]" aria-hidden="true" />

          <div className="flex items-center justify-between px-5 py-5">
            <span className="font-display text-lg font-bold text-heading">메뉴</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="메뉴 닫기"
              className="glass-panel touch-target flex items-center justify-center rounded-full text-heading"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="전체 메뉴"
            className="glass-panel mx-5 flex flex-1 flex-col justify-center gap-1 rounded-[28px] px-6"
          >
            {navigation.map((item, index) => {
              const id = item.href.replace("#", "");
              const active = activeId === id;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
                >
                  <AnchorLink
                    href={item.href}
                    onNavigate={onClose}
                    className={`flex items-center justify-between border-b border-line py-4 font-display text-2xl font-bold ${
                      active ? "text-sapphire" : "text-heading"
                    }`}
                  >
                    {item.label}
                    <span className="font-en text-sm text-muted">0{index + 1}</span>
                  </AnchorLink>
                </motion.div>
              );
            })}
          </nav>

          <div className="flex flex-col gap-3 px-6 pb-safe pt-6">
            {isConfigured(contactInfo.phone) && (
              <a href={formatPhoneHref(contactInfo.phone)} className="font-en text-sm text-muted">
                {contactInfo.phone}
              </a>
            )}
            <Button href="#contact" size="lg" onNavigate={onClose} className="w-full">
              견적 문의하기
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
