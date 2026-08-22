import type { BusinessStep } from "@/data/company";

export function BusinessCard({ step }: { step: BusinessStep; index: number }) {
  return (
    <div className="gold-trace glass-panel-dark metal-sheen relative flex h-[62vh] w-[78vw] shrink-0 flex-col justify-between overflow-hidden rounded-[28px] p-10 sm:w-[52vw] lg:h-[56vh] lg:w-[32vw]">
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid-fine opacity-30" aria-hidden="true" />
      <div className="relative flex items-start justify-between">
        <span className="font-en text-6xl font-black text-outline-dark">{step.index}</span>
      </div>
      <div className="relative">
        <h3 className="text-heading-1 font-display font-bold text-on-dark">{step.title}</h3>
        <p className="mt-4 text-body-lg text-platinum">{step.description}</p>
      </div>
    </div>
  );
}
