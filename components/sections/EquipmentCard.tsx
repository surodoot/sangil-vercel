import Image from "next/image";
import type { EquipmentItem } from "@/data/company";
import { isConfigured } from "@/lib/utils";

export function EquipmentCard({ item }: { item: EquipmentItem }) {
  return (
    <div className="gold-trace group relative h-full min-h-[16rem] overflow-hidden rounded-xl border border-line-strong bg-mist transition-transform duration-500 lg:hover:scale-[1.015]">
      <div className="absolute inset-0">
        {item.photo ? (
          <Image
            src={item.photo}
            alt={item.photoAlt || `${item.name} 설비 사진`}
            fill
            className="object-cover opacity-80 transition-opacity duration-500 lg:group-hover:opacity-55"
            sizes="(min-width: 1024px) 25vw, 100vw"
          />
        ) : (
          <div
            className="h-full w-full bg-gradient-to-br from-mist to-platinum/40"
            aria-hidden="true"
          />
        )}
        <div
          className="absolute inset-0 bg-blueprint-grid-fine opacity-30"
          aria-hidden="true"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-transparent" />

      <div className="relative flex h-full flex-col justify-end p-6">
        <h3 className="text-heading-2 font-display font-bold text-on-dark">
          {item.name}
        </h3>

        <div className="mt-2 grid gap-1 text-caption text-platinum">
          {isConfigured(item.manufacturer) && (
            <p>제조사 · {item.manufacturer}</p>
          )}
          {isConfigured(item.model) && <p>모델명 · {item.model}</p>}
          {isConfigured(item.range) && <p>가공 범위 · {item.range}</p>}
          {isConfigured(item.quantity) && <p>보유 수량 · {item.quantity}대</p>}
          {isConfigured(item.usage) && <p>주요 용도 · {item.usage}</p>}
          {isConfigured(item.description) && (
            <p className="mt-1">{item.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
