import { Box, Layers, Gauge, Settings2, Hash, CalendarClock, ClipboardCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cinematicConfig } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { StarField } from "@/components/motion/StarField";

const INPUT_ICONS: Record<string, LucideIcon> = {
  "부품 형상": Box,
  소재: Layers,
  수량: Hash,
  "가공 공정": Settings2,
  "공정 난이도": Gauge,
  "검사 조건": ClipboardCheck,
  "희망 납기": CalendarClock,
};

/**
 * 메인 비주얼과 회사 소개 도입부입니다. 스크롤에 맞춰 3D/이미지를
 * 회전·전환하는 연출 없이, 동일한 정보를 정적인 카드 형태로 순서대로
 * 보여줍니다. 키보드/스크린리더/검색엔진 사용자에게도 항상 의미 있는
 * HTML로 제공되며, 별도의 스크롤 하이재킹이 없습니다.
 */
export function StoryIntro() {
  const { scene1, scene2, scene3, scene4, scene5, scene6 } = cinematicConfig;

  return (
    <section aria-label="상일엔지니어링 소개" className="relative overflow-hidden bg-warm-white py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-40" aria-hidden="true" />

      <Container className="relative space-y-20">
        {/* 완성된 엔진 등장 */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-en text-sm font-semibold uppercase tracking-[0.25em] text-sapphire">
            {scene1.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-display-1 font-bold text-heading">
            {scene1.titleLines[0]}
            <br />
            <span className="text-sapphire">{scene1.highlight}</span>
            {scene1.titleLines[1].replace(scene1.highlight, "")}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-body-lg text-body">{scene1.description}</p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button href="#contact" size="lg">
              {scene1.primaryCta}
            </Button>
            <Button href="#business" variant="glass" size="lg" arrow={false}>
              {scene1.secondaryCta}
            </Button>
          </div>
        </div>

        {/* 엔진 내부 구조 */}
        <div className="glass-panel rounded-[28px] p-8 sm:p-10">
          <p className="font-en text-sm font-semibold uppercase tracking-[0.18em] text-sapphire">
            {scene2.eyebrow}
          </p>
          <h2 className="mt-3 text-heading-1 font-display font-bold text-heading">
            {scene2.titleLines[0]}
            <br />
            {scene2.titleLines[1]}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {scene2.checklist.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-xl border border-line-strong bg-white/60 px-4 py-3 text-body text-heading"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 작동 원리 */}
        <div className="glass-panel rounded-[28px] p-8 sm:p-10">
          <p className="font-en text-sm font-semibold uppercase tracking-[0.18em] text-sapphire">
            {scene3.eyebrow}
          </p>
          <h2 className="mt-3 text-heading-1 font-display font-bold text-heading">
            {scene3.titleLines[0]}
            <br />
            {scene3.titleLines[1]}
          </h2>
        </div>

        {/* 분해도 */}
        <div>
          <p className="font-en text-sm font-semibold uppercase tracking-[0.18em] text-sapphire">
            {scene4.eyebrow}
          </p>
          <h2 className="mt-3 text-heading-1 font-display font-bold text-heading">{scene4.title}</h2>
          <ol className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {scene4.labels.map((item, index) => (
              <li
                key={item.id}
                className="glass-panel flex items-center gap-3 rounded-full px-5 py-3 text-body font-medium text-heading"
              >
                <span className="font-en text-sm font-bold text-gold">0{index + 1}</span>
                {item.label}
              </li>
            ))}
          </ol>
        </div>

        {/* 생산 과정과 납기 책임 */}
        <div className="glass-panel rounded-[28px] p-8 sm:p-10">
          <p className="font-en text-sm font-semibold uppercase tracking-[0.18em] text-sapphire">
            {scene5.eyebrow}
          </p>
          <h2 className="mt-3 text-heading-1 font-display font-bold text-heading">
            {scene5.titleLines[0]}
            <br />
            {scene5.titleLines[1]}
          </h2>
          <ol className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {scene5.steps.map((step, index) => (
              <li
                key={step}
                className="flex items-center gap-3 rounded-full border border-line-strong bg-white/60 px-5 py-3 text-body font-medium text-heading"
              >
                <span className="font-en text-sm font-bold text-gold">0{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* AI 견적 모델 */}
        <div className="glass-panel-dark bg-cosmos-gradient relative overflow-hidden rounded-[28px] p-8 sm:p-10">
          <StarField count={50} />
          <div className="relative">
            <p className="font-en text-sm font-semibold uppercase tracking-[0.18em] text-gold-soft">
              {scene6.eyebrow}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-line-on-dark px-4 py-2 font-en text-sm text-on-dark">
              <span className="h-2 w-2 rounded-full bg-gold-soft" aria-hidden="true" />
              {scene6.status}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {scene6.inputs.map((input) => {
                const Icon = INPUT_ICONS[input] ?? Box;
                return (
                  <li
                    key={input}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line-on-dark px-3 py-1.5 font-en text-xs text-platinum"
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {input}
                  </li>
                );
              })}
            </ul>
            <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {scene6.results.map((result) => (
                <div key={result.id}>
                  <dt className="text-caption text-platinum">{result.label}</dt>
                  <dd className="mt-1 font-en text-base font-bold text-gold-soft">{result.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="#contact" size="lg">
                {scene6.primaryCta}
              </Button>
              <Button href="#business" variant="glass" size="lg" arrow={false}>
                {scene6.secondaryCta}
              </Button>
            </div>
            <p className="mt-6 max-w-xl text-caption text-platinum">{scene6.disclaimer}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
