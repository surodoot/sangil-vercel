import { ScanLine } from "lucide-react";
import { aiEstimateConfig } from "@/data/company";
import { Container } from "@/components/ui/Container";
export function AIEstimate() {
  return (
    <section
      id="ai-estimate"
      className="border-y border-line bg-[#eaf0f8] py-12 sm:py-16"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_.85fr] lg:gap-20">
          <div>
            <p className="section-kicker">Looking ahead</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <h2 className="text-heading-2 font-bold text-heading">
                더 나은 견적을 위한 다음 단계
              </h2>
              <span className="rounded-md border border-[#b7c8e2] px-2.5 py-1 text-xs font-medium text-body">
                도입 준비 중
              </span>
            </div>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-body">
              도면과 생산조건을 기반으로 시간·비용 예측을 지원하는 AI 견적
              모델을 준비하고 있습니다. 현재 자동 분석이나 견적 산출 기능은
              제공되지 않습니다.
            </p>
          </div>
          <div className="flex gap-4 rounded-xl border border-[#ccd9ea] bg-white/70 p-6">
            <ScanLine
              className="h-7 w-7 shrink-0 text-sapphire"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-semibold text-heading">
                검토에 필요한 정보
              </p>
              <p className="mt-2 text-base leading-relaxed text-body">
                {aiEstimateConfig.inputs.join(" · ")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {aiEstimateConfig.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
