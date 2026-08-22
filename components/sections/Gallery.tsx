"use client";

import { useMemo, useState } from "react";
import { Images } from "lucide-react";
import { galleryItems, galleryCategoryLabels, type GalleryCategory } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AdminNotice } from "@/components/ui/AdminNotice";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { GalleryCard } from "./GalleryCard";
import { GalleryModal } from "./GalleryModal";
import { cn } from "@/lib/utils";

const FILTERS: Array<{ key: GalleryCategory | "all"; label: string }> = [
  { key: "all", label: "전체" },
  { key: "automotive", label: galleryCategoryLabels.automotive },
  { key: "precision", label: galleryCategoryLabels.precision },
  { key: "custom", label: galleryCategoryLabels.custom },
  { key: "etc", label: galleryCategoryLabels.etc },
];

export function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      filter === "all" ? galleryItems : galleryItems.filter((item) => item.category === filter),
    [filter],
  );

  const activeItem = galleryItems.find((item) => item.id === activeId) ?? null;

  return (
    <section id="gallery" className="relative bg-ivory py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Gallery"
          title="생산품 및 가공사례"
          description="자동차용 부품을 중심으로 한 정밀 가공 사례를 소개합니다."
        />

        {galleryItems.length > 0 ? (
          <>
            <div role="tablist" aria-label="생산사례 분류 필터" className="mt-10 flex flex-wrap gap-2">
              {FILTERS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  role="tab"
                  aria-selected={filter === item.key}
                  onClick={() => setFilter(item.key)}
                  className={cn(
                    "touch-target rounded-full border px-5 py-2 font-en text-sm font-medium transition-colors",
                    filter === item.key
                      ? "border-sapphire bg-sapphire/10 text-sapphire"
                      : "border-line text-muted hover:text-heading",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Reveal container className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <RevealItem key={item.id}>
                  <GalleryCard item={item} onOpen={() => setActiveId(item.id)} />
                </RevealItem>
              ))}
            </Reveal>
          </>
        ) : (
          <Reveal className="glass-panel mt-14 flex flex-col items-center gap-5 rounded-[28px] px-8 py-20 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-line-strong text-muted">
              <Images className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="text-heading-2 font-display font-bold text-heading">
              생산사례 준비 중입니다
            </p>
            <p className="max-w-lg text-body text-body">
              실제 생산품 및 가공사례 자료가 확정되는 대로 이미지와 함께
              소개해 드리겠습니다.
            </p>
            <AdminNotice label="생산품/가공사례 (data/company.ts의 galleryItems)" />
          </Reveal>
        )}
      </Container>

      <GalleryModal item={activeItem} onClose={() => setActiveId(null)} />
    </section>
  );
}
