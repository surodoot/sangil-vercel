import { describeArc } from "@/lib/svgArc";

interface ProcessVisualProps {
  total: number;
  activeIndex: number;
  activeTitle: string;
}

export function ProcessVisual({ total, activeIndex, activeTitle }: ProcessVisualProps) {
  const gap = 5;
  const segment = 360 / total;

  return (
    <div className="glass-panel-dark relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[28px]">
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid-dark opacity-40" aria-hidden="true" />

      <svg viewBox="0 0 200 200" className="h-52 w-52" aria-hidden="true">
        <circle cx="100" cy="100" r="86" fill="none" stroke="rgba(216,196,255,0.16)" strokeWidth="1" />
        {Array.from({ length: total }).map((_, i) => {
          const start = segment * i - 90 + gap / 2;
          const end = segment * (i + 1) - 90 - gap / 2;
          const isActive = i === activeIndex;
          return (
            <path
              key={i}
              d={describeArc(100, 100, 86, start, end)}
              fill="none"
              stroke={isActive ? "#dec491" : "rgba(216,196,255,0.22)"}
              strokeWidth={isActive ? 4 : 2}
              strokeLinecap="round"
              style={{ transition: "stroke 0.4s ease, stroke-width 0.4s ease" }}
            />
          );
        })}
        <circle cx="100" cy="100" r="58" fill="none" stroke="rgba(216,196,255,0.14)" strokeWidth="1" strokeDasharray="2 6" />
      </svg>

      <div className="pointer-events-none absolute flex flex-col items-center text-center">
        <span className="font-en text-5xl font-black text-gold-soft">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <p className="mt-2 max-w-[10rem] text-heading-2 font-display font-bold text-on-dark">
          {activeTitle}
        </p>
      </div>
    </div>
  );
}
