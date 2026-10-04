import { productionProcess } from "@/data/company";
import { Container } from "@/components/ui/Container";
export function ProcessTimeline() {
  return (
    <section className="section-space bg-white" aria-labelledby="process-title">
      <Container>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="section-kicker">How we work</p>
            <h2
              id="process-title"
              className="mt-4 text-heading-1 font-bold text-heading"
            >
              상담에서 납품까지.
            </h2>
          </div>
          <p className="text-body text-muted">
            각 단계를 확인하며 다음 과정으로 이어갑니다.
          </p>
        </div>
        <ol className="mt-10 grid grid-cols-1 gap-x-7 gap-y-6 sm:grid-cols-2 lg:grid-cols-6">
          {productionProcess.map((stage, index) => (
            <li
              key={stage.id}
              className="flex gap-4 border-t border-line-strong pt-5 lg:block"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mist text-xs font-semibold text-sapphire">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="lg:mt-5">
                <h3 className="text-base font-semibold text-heading">
                  {stage.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {stage.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
