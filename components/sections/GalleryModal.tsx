"use client";

import { useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { galleryCategoryLabels, type GalleryItem } from "@/data/company";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { isConfigured } from "@/lib/utils";

interface GalleryModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export function GalleryModal({ item, onClose }: GalleryModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, item !== null, onClose);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-navy/60 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-modal-title"
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 48, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="glass-panel max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-[28px] p-6 pb-safe sm:rounded-[28px] sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-en text-xs font-semibold uppercase tracking-wide text-sapphire">
                  {galleryCategoryLabels[item.category]}
                </span>
                <h3 id="gallery-modal-title" className="mt-1 text-heading-1 font-display font-bold text-heading">
                  {item.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="닫기"
                className="touch-target flex shrink-0 items-center justify-center rounded-full border border-line-strong text-heading"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {item.image && (
              <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-[20px]">
                <Image
                  src={item.image}
                  alt={item.imageAlt || `${item.title} 가공사례 사진`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 640px) 640px, 100vw"
                />
              </div>
            )}

            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              {isConfigured(item.material) && <Field label="소재" value={item.material} />}
              {isConfigured(item.process) && <Field label="적용 공정" value={item.process} />}
              {isConfigured(item.requirement) && (
                <Field label="고객 요구사항" value={item.requirement} full />
              )}
              {isConfigured(item.challenge) && (
                <Field label="생산 과정에서의 주요 과제" value={item.challenge} full />
              )}
              {isConfigured(item.response) && <Field label="대응 내용" value={item.response} full />}
              {isConfigured(item.result) && <Field label="결과" value={item.result} full />}

              {item.clientInfoApproved && (
                <>
                  {isConfigured(item.clientName) && <Field label="고객사" value={item.clientName} />}
                  {isConfigured(item.partNumber) && <Field label="부품번호" value={item.partNumber} />}
                  {isConfigured(item.drawingRef) && <Field label="도면 번호" value={item.drawingRef} />}
                </>
              )}
            </dl>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <dt className="text-caption text-muted">{label}</dt>
      <dd className="mt-1 text-body text-heading">{value}</dd>
    </div>
  );
}
