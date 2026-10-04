"use client";

import { useMemo, useState } from "react";
import { Images } from "lucide-react";
import {
  galleryItems,
  galleryCategoryLabels,
  type GalleryCategory,
} from "@/data/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
      filter === "all"
        ? galleryItems
        : galleryItems.filter((item) => item.category === filter),
    [filter],
  );

  const activeItem = galleryItems.find((item) => item.id === activeId) ?? null;

  return (
    <section id="gallery" className="section-space bg-ivory">
      <Container>
        <SectionHeading
          eyebrow="05 / Selected work"
          title="생산품 및 가공사례"
          description="자동차용 부품을 중심으로 한 정밀 가공 사례를 소개합니다."
        />

        {galleryItems.length > 0 ? (
          <>
            <div
              role="group"
              aria-label="생산사례 분류 필터"
              className="mt-10 flex flex-wrap gap-2"
            >
              {FILTERS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={filter === item.key}
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

            <Reveal
              container
              className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((item) => (
                <RevealItem key={item.id}>
                  <GalleryCard
                    item={item}
                    onOpen={() => setActiveId(item.id)}
                  />
                </RevealItem>
              ))}
            </Reveal>
            {filtered.length === 0 && (
              <p className="mt-8 text-body text-muted" role="status">
                이 분류에 등록된 생산사례가 없습니다.
              </p>
            )}
          </>
        ) : (
          <Reveal className="mt-9 flex flex-col items-start gap-4 rounded-xl border border-line bg-white p-6 sm:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-mist text-sapphire">
              <Images className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="text-heading-2 font-display font-bold text-heading">
              실제 생산사례를 준비하고 있습니다.
            </p>
            <p className="max-w-lg text-body text-body">
              실제 생산품 및 가공사례 자료가 확정되는 대로 이미지와 함께 소개해
              드리겠습니다.
            </p>
          </Reveal>
        )}
      </Container>

      <GalleryModal item={activeItem} onClose={() => setActiveId(null)} />
    </section>
  );
}
