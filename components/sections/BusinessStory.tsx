import { businessSteps, businessCapabilities } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { isConfigured } from "@/lib/utils";

export function BusinessStory() {
  const configured = businessCapabilities.filter((spec) =>
    isConfigured(spec.value),
  );
  return (
    <section
      id="business"
      className="section-space border-y border-line bg-ivory"
    >
      <Container>
        <div className="grid gap-9 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="section-kicker">02 / Our business</p>
            <h2 className="mt-5 text-heading-1 font-bold text-heading">
              요구사항을 이해하고,
              <br />
              생산의 방향을
              <br className="hidden lg:block" /> 함께 찾습니다.
            </h2>
            <p className="mt-5 max-w-md text-body-lg">
              자동차용 신품 부품 제조를 중심으로 도면과 사양을 검토하고,
              생산부터 검사·출하까지 단계별로 대응합니다.
            </p>
            <span className="mt-8 inline-block border-l-2 border-sapphire pl-4 text-sm leading-relaxed text-muted">
              가공 가능 소재·범위·수량은
              <br />
              도면과 생산조건 검토 후 안내합니다.
            </span>
          </div>
          <ol className="divide-y divide-line-strong border-y border-line-strong">
            {businessSteps.map((step) => (
              <li
                key={step.id}
                className="grid grid-cols-[2rem_1fr] gap-3 py-6 sm:grid-cols-[3rem_1fr] sm:gap-5"
              >
                <span className="pt-1 text-sm font-medium text-sapphire">
                  {step.index}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-heading">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-body">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        {configured.length > 0 && (
          <dl className="mt-12 grid gap-6 rounded-xl border border-line bg-white p-6 sm:grid-cols-2 lg:grid-cols-3">
            {configured.map((spec) => (
              <div key={spec.label}>
                <dt className="text-sm text-muted">{spec.label}</dt>
                <dd className="mt-2 text-base font-medium text-heading">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </section>
  );
}
