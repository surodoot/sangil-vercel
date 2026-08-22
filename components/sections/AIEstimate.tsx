import { FileText, Layers, Hash, Settings2, Gauge, CalendarClock, ArrowRight, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { aiEstimateConfig } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { StarField } from "@/components/motion/StarField";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { SectionEdgeFade } from "@/components/ui/SectionEdgeFade";

const INPUT_ICONS: Record<string, LucideIcon> = {
  도면: FileText,
  소재: Layers,
  "주문 수량": Hash,
  "가공 방식": Settings2,
  "공정 난이도": Gauge,
  "희망 납기": CalendarClock,
};

function StatusPill() {
  return (
    <span className="glass-panel-dark inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-en text-sm text-on-dark">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-soft opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-soft" />
      </span>
      {aiEstimateConfig.status}
    </span>
  );
}

export function AIEstimate() {
  return (
    <section id="ai-estimate" className="bg-cosmos-gradient relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid-dark opacity-40" aria-hidden="true" />
      <StarField count={70} />
      <ParallaxLayer speed={24} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/4 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-violet/18 blur-[140px]" />
      </ParallaxLayer>
      <ParallaxLayer speed={16} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-24 right-[10%] h-[24rem] w-[24rem] rounded-full bg-sapphire/12 blur-[130px]" />
      </ParallaxLayer>
      <SectionEdgeFade position="top" color="#07040f" heightClassName="h-32 sm:h-48" />
      <SectionEdgeFade position="bottom" color="#f8f7f4" />

      <Container className="relative">
        <SectionHeading
          onDark
          align="center"
          eyebrow="AI Estimate Model"
          title="예측 가능한 견적을 위한 기술을 준비하고 있습니다"
          description="도면과 사양 정보를 기반으로 생산시간과 비용을 예측하는 모델을 개발하고 있습니다. 실제 결과는 도입 후 담당자 확인을 거쳐 안내해 드립니다."
          className="mx-auto max-w-2xl"
        />

        {/* ---------- 모바일: 카드 중첩 없이 하나의 유리 패널로 단순화 ---------- */}
        <div className="lg:hidden">
          <Reveal className="mt-8 flex justify-center">
            <StatusPill />
          </Reveal>

          <Reveal className="glass-panel-dark relative mt-8 overflow-hidden rounded-[28px] p-6">
            <div className="flex flex-wrap justify-center gap-2">
              {aiEstimateConfig.inputs.map((input) => {
                const Icon = INPUT_ICONS[input] ?? FileText;
                return (
                  <span
                    key={input}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line-on-dark px-3 py-1.5 font-en text-xs text-platinum"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {input}
                  </span>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col items-center gap-2 border-y border-line-on-dark py-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold-soft">
                <Sparkles className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="font-display text-body-lg font-bold text-on-dark">분석 모델</p>
              <p className="text-caption text-platinum">입력 정보를 기반으로 결과를 구성합니다</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5">
              {aiEstimateConfig.results.map((result) => (
                <div key={result.id}>
                  <p className="text-caption text-platinum">{result.label}</p>
                  <p className="mt-1 font-en text-xl font-bold text-on-dark">—</p>
                  <span className="mt-1 inline-block rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[0.65rem] font-medium text-gold-soft">
                    준비 중
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ---------- PC: 입력 칩 → 분석 패널 → 결과로 흐르는 레이아웃 ---------- */}
        <div className="mt-8 hidden justify-center lg:flex">
          <StatusPill />
        </div>

        <div className="mt-16 hidden items-center gap-6 lg:grid lg:grid-cols-[minmax(0,15rem)_auto_minmax(0,20rem)] lg:gap-4">
          <Reveal container className="flex flex-col items-stretch gap-3">
            {aiEstimateConfig.inputs.map((input) => {
              const Icon = INPUT_ICONS[input] ?? FileText;
              return (
                <RevealItem key={input}>
                  <span className="glass-panel-dark flex items-center gap-2.5 rounded-2xl px-4 py-3 font-en text-sm text-on-dark">
                    <Icon className="h-4 w-4 shrink-0 text-platinum" aria-hidden="true" />
                    {input}
                  </span>
                </RevealItem>
              );
            })}
          </Reveal>

          <ArrowRight className="mx-auto h-6 w-6 shrink-0 animate-pulse text-gold-soft/70" aria-hidden="true" />

          <Reveal delay={0.1} className="mx-auto w-full max-w-[16rem]">
            <div className="glass-panel-dark relative flex aspect-square w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-[28px] p-8 text-center">
              <div
                className="pointer-events-none absolute inset-x-6 h-px bg-gradient-to-r from-transparent via-sapphire to-transparent animate-[scan-line_3.2s_ease-in-out_infinite]"
                aria-hidden="true"
              />
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold-soft animate-pulse-ring">
                <Sparkles className="h-7 w-7" aria-hidden="true" />
              </div>
              <p className="font-display text-heading-2 font-bold text-on-dark">분석 모델</p>
              <p className="text-caption text-platinum">입력 정보를 기반으로 결과를 구성합니다</p>
            </div>
          </Reveal>

          <ArrowRight className="mx-auto h-6 w-6 shrink-0 animate-pulse text-gold-soft/70" aria-hidden="true" />

          <Reveal container delay={0.2} className="grid grid-cols-2 gap-3">
            {aiEstimateConfig.results.map((result) => (
              <RevealItem key={result.id}>
                <div className="glass-panel-dark flex h-full flex-col justify-between gap-3 rounded-2xl p-5">
                  <p className="text-caption text-platinum">{result.label}</p>
                  <div>
                    <p className="font-en text-2xl font-bold text-on-dark">—</p>
                    <span className="mt-1 inline-block rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[0.65rem] font-medium text-gold-soft">
                      준비 중
                    </span>
                  </div>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
