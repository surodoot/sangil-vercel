import { FileCheck2, Layers3, ScanLine, Settings2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const stages = [
  { label: "요구사항", english: "REQUIREMENTS", icon: FileCheck2 },
  { label: "도면 검토", english: "DRAWING REVIEW", icon: Layers3 },
  { label: "생산", english: "MANUFACTURING", icon: Settings2 },
  { label: "검사", english: "INSPECTION", icon: ScanLine },
];

/** A process diagram, deliberately not a representation of actual equipment. */
export function StoryIntro() {
  return (
    <section
      aria-labelledby="hero-title"
      className="overflow-hidden border-b border-line bg-[#f0f3f5] pt-28 lg:pt-36"
    >
      <Container>
        <div className="grid items-center gap-10 pb-12 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:pb-20">
          <div className="min-w-0 py-2 lg:py-8">
            <p className="section-kicker">Sangil Engineering</p>
            <h1
              id="hero-title"
              className="mt-6 text-display-1 font-bold text-heading"
            >
              정확한 제조,
              <br />
              신뢰로 이어지는
              <br />
              <span className="text-sapphire">기술.</span>
            </h1>
            <p className="mt-6 max-w-md text-body-lg text-body">
              도면 검토부터 생산, 검사와 납품까지.
              <br className="hidden sm:block" /> 고객의 요구사항과 일정을 함께
              살피는
              <br className="hidden sm:block" /> 자동차 부품 제조 파트너,
              상일엔지니어링입니다.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#contact" size="lg">
                제작 문의하기
              </Button>
              <Button href="#business" variant="glass" size="lg">
                사업분야 살펴보기
              </Button>
            </div>
          </div>
          <div className="technical-grid relative flex min-h-[380px] flex-col overflow-hidden rounded-2xl bg-navy px-5 py-6 text-white sm:min-h-[490px] sm:p-8 lg:min-h-[540px]">
            <div className="flex items-start justify-between gap-4 border-b border-white/20 pb-5 text-xs tracking-[.13em] text-platinum">
              <span>
                ENGINEERING
                <br />
                <span className="mt-1 block text-white">PROCESS STUDY</span>
              </span>
              <span>SE / 01</span>
            </div>
            <div className="relative flex flex-1 items-center py-8">
              <div
                aria-hidden="true"
                className="absolute inset-x-[19%] inset-y-[12%] rounded-full border border-dashed border-white/15"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-[30%] inset-y-[24%] rounded-full border border-white/10"
              />
              <ol className="relative grid w-full grid-cols-2 gap-x-6 gap-y-9 sm:gap-y-14">
                {stages.map(({ label, english, icon: Icon }, index) => (
                  <li key={label} className="relative min-w-0">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="text-xs text-platinum">
                        0{index + 1}
                      </span>
                      <span className="h-px flex-1 bg-white/15" />
                    </div>
                    <Icon
                      className="h-8 w-8 text-[#9cbdff]"
                      strokeWidth={1.25}
                      aria-hidden="true"
                    />
                    <p className="mt-3 text-lg font-semibold sm:text-xl">
                      {label}
                    </p>
                    <p className="mt-1 text-[10px] tracking-[.1em] text-platinum sm:text-xs">
                      {english}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/20 pt-4 text-xs text-platinum">
              <span>제조 프로세스 개념도</span>
              <span>FROM REQUIREMENT TO DELIVERY</span>
            </div>
          </div>
        </div>
        <div className="grid gap-5 border-t border-line-strong py-7 sm:grid-cols-3 sm:gap-8">
          {[
            ["01", "자동차용 신품 부품 제조"],
            ["02", "고객 요구사항 중심의 대응"],
            ["03", "경기도 김포시 소재"],
          ].map(([number, title]) => (
            <div key={number} className="flex items-center gap-4">
              <span className="text-xs font-semibold text-sapphire">
                {number}
              </span>
              <p className="text-sm font-medium text-heading">{title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
