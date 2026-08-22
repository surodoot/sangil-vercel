"use client";

import { productionProcess } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { StarField } from "@/components/motion/StarField";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { SectionEdgeFade } from "@/components/ui/SectionEdgeFade";
import { useActiveIndex } from "@/hooks/useActiveIndex";
import { ProcessVisual } from "./ProcessVisual";
import { cn } from "@/lib/utils";

export function ProcessTimeline() {
  const { active, setRef } = useActiveIndex(productionProcess.length);
  const activeStage = productionProcess[active];

  return (
    <section className="bg-cosmos-gradient relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid-dark opacity-40" aria-hidden="true" />
      <StarField count={90} />
      <ParallaxLayer speed={18} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-electric/16 blur-[110px]" />
      </ParallaxLayer>
      <ParallaxLayer speed={26} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-16 bottom-24 h-72 w-72 rounded-full bg-violet/18 blur-[110px]" />
      </ParallaxLayer>
      <SectionEdgeFade position="top" color="#07040f" heightClassName="h-32 sm:h-48" />
      <SectionEdgeFade position="bottom" color="#f8f7f4" heightClassName="h-32 sm:h-48" />

      <Container className="relative">
        <SectionHeading
          onDark
          eyebrow="Production Process"
          title="생산 진행 과정"
          description="상담부터 납품까지, 제품이 만들어지는 과정을 안내합니다."
        />
      </Container>

      {/* ---------- PC: 중앙 고정 비주얼 + 좌우 강조 타임라인 ---------- */}
      <Container className="relative mt-16 hidden lg:grid lg:grid-cols-[1fr_22rem_1fr] lg:items-start lg:gap-10">
        <ol className="space-y-8 pt-16">
          {productionProcess
            .map((stage, index) => ({ stage, index }))
            .filter(({ index }) => index % 2 === 0)
            .map(({ stage, index }) => (
              <li key={stage.id} ref={setRef(index)} className="scroll-mt-32 ml-auto max-w-sm text-right">
                <div
                  className={cn(
                    "glass-panel-dark rounded-[24px] p-6 transition-all duration-300",
                    active === index ? "shadow-[0_0_0_1px_rgba(67,133,255,0.4)]" : "opacity-70",
                  )}
                >
                  <span
                    className={cn(
                      "font-en text-sm font-semibold transition-colors duration-300",
                      active === index ? "text-electric" : "text-platinum",
                    )}
                  >
                    0{index + 1}
                  </span>
                  <h3 className="mt-2 text-heading-2 font-display font-bold text-on-dark">{stage.title}</h3>
                  <p className="mt-2 text-body text-platinum">{stage.description}</p>
                </div>
              </li>
            ))}
        </ol>

        <div className="sticky top-32 h-[26rem] self-start">
          <ProcessVisual total={productionProcess.length} activeIndex={active} activeTitle={activeStage.title} />
        </div>

        <ol className="space-y-8 pt-16">
          {productionProcess
            .map((stage, index) => ({ stage, index }))
            .filter(({ index }) => index % 2 === 1)
            .map(({ stage, index }) => (
              <li key={stage.id} ref={setRef(index)} className="scroll-mt-32 max-w-sm">
                <div
                  className={cn(
                    "glass-panel-dark rounded-[24px] p-6 transition-all duration-300",
                    active === index ? "shadow-[0_0_0_1px_rgba(67,133,255,0.4)]" : "opacity-70",
                  )}
                >
                  <span
                    className={cn(
                      "font-en text-sm font-semibold transition-colors duration-300",
                      active === index ? "text-electric" : "text-platinum",
                    )}
                  >
                    0{index + 1}
                  </span>
                  <h3 className="mt-2 text-heading-2 font-display font-bold text-on-dark">{stage.title}</h3>
                  <p className="mt-2 text-body text-platinum">{stage.description}</p>
                </div>
              </li>
            ))}
        </ol>
      </Container>

      {/* ---------- 모바일: 세로형 타임라인 ---------- */}
      <Container className="relative mt-14 lg:hidden">
        <ol className="relative space-y-5 border-l border-line-on-dark pl-6">
          {productionProcess.map((stage, index) => (
            <Reveal key={stage.id} as="li" y={16}>
              <span
                aria-hidden="true"
                className="absolute -left-[calc(1.5rem+1px)] mt-6 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-gold-soft"
              />
              <div className="glass-panel-dark rounded-[20px] p-5">
                <span className="font-en text-sm font-semibold text-electric">0{index + 1}</span>
                <h3 className="mt-1 text-heading-2 font-display font-bold text-on-dark">{stage.title}</h3>
                <p className="mt-2 text-body text-platinum">{stage.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
