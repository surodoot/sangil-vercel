import Image from "next/image";
import { galleryCategoryLabels, type GalleryItem } from "@/data/company";

export function GalleryCard({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="gold-trace glass-panel group block w-full overflow-hidden rounded-[24px] text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sapphire"
    >
      <div className="metal-sheen relative aspect-[4/3] overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.imageAlt || `${item.title} 가공사례 사진`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-mist to-platinum/40"
            aria-hidden="true"
          >
            <span className="font-en text-xs text-muted">NO IMAGE</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <span className="font-en text-xs font-semibold uppercase tracking-wide text-sapphire">
          {galleryCategoryLabels[item.category]}
        </span>
        <h3 className="mt-1 text-heading-2 font-display font-bold text-heading">{item.title}</h3>
      </div>
    </button>
  );
}
