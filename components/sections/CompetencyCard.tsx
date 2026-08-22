import { Clock, MessageSquareText, Target, Sparkles, type LucideIcon } from "lucide-react";
import type { CompetencyItem } from "@/data/company";
import { StarField } from "@/components/motion/StarField";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  delivery: Clock,
  "requirement-focus": MessageSquareText,
  accuracy: Target,
  "estimate-tech": Sparkles,
};

/** 카드마다 다른 보석톤 포인트 색상을 사용해 다크 배경에서도 리듬감을 줍니다. */
const ACCENT: Record<string, { icon: string; iconBorder: string; iconBg: string }> = {
  delivery: { icon: "text-gold-soft", iconBorder: "border-gold/40", iconBg: "bg-gold/10" },
  "requirement-focus": {
    icon: "text-turquoise",
    iconBorder: "border-turquoise/35",
    iconBg: "bg-turquoise/10",
  },
  accuracy: { icon: "text-emerald", iconBorder: "border-emerald/35", iconBg: "bg-emerald/10" },
  "estimate-tech": { icon: "text-violet", iconBorder: "border-violet/35", iconBg: "bg-violet/10" },
};

export function CompetencyCard({
  item,
  index,
  className,
}: {
  item: CompetencyItem;
  index: number;
  className?: string;
}) {
  const Icon = ICONS[item.id] ?? Target;
  const featured = Boolean(item.featured);
  const accent = ACCENT[item.id] ?? ACCENT.accuracy;

  return (
    <div
      className={cn(
        "gold-trace glass-panel-dark group relative flex h-full min-h-[13rem] flex-col justify-between overflow-hidden rounded-[24px] p-8 transition-transform duration-300 hover:-translate-y-1.5",
        featured && "min-h-[20rem] lg:p-10",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid-dark opacity-30" aria-hidden="true" />
      <StarField count={featured ? 30 : 16} />

      <div className="relative">
        <span className="font-en text-sm text-platinum">0{index + 1}</span>
        <div
          className={cn(
            "mt-4 flex h-12 w-12 items-center justify-center rounded-xl border",
            accent.iconBorder,
            accent.iconBg,
            accent.icon,
          )}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3
          className={cn(
            "mt-6 font-display font-bold text-on-dark",
            featured ? "text-heading-1" : "text-heading-2",
          )}
        >
          {item.title}
        </h3>
        <p className="mt-3 text-body text-platinum">{item.description}</p>
      </div>
    </div>
  );
}
