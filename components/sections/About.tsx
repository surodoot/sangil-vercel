import { Clock3, ClipboardCheck, Crosshair, ScanLine } from "lucide-react";
import { companyInfo, coreCompetencies } from "@/data/company";
import { Container } from "@/components/ui/Container";
const icons = [Clock3, ClipboardCheck, Crosshair, ScanLine];
export function About() {
  return (
    <section id="about" className="section-space bg-white">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="section-kicker">01 / About us</p>
            <h2 className="mt-5 text-heading-1 font-bold text-heading">
              기본을 지키는 일에서
              <br />
              신뢰가 시작됩니다.
            </h2>
          </div>
          <div className="lg:pt-8">
            <p className="text-body-lg">
              {companyInfo.name}은 경기도 김포시에 위치한 자동차용 신품 부품
              제조기업입니다. 정확성과 일관성을 중요하게 생각하며, 고객의
              요구사항을 세밀하게 검토하고 신뢰할 수 있는 제품 생산을
              지향합니다.
            </p>
            <p className="mt-4 text-body">
              제품의 사양뿐 아니라 약속한 일정까지.
              <br />
              생산 과정의 기본에 집중합니다.
            </p>
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {coreCompetencies.map((item, index) => {
            const Icon = icons[index];
            return (
              <article
                key={item.id}
                className={`rounded-xl border p-6 sm:p-7 ${item.featured ? "border-navy bg-navy text-white" : "border-line bg-[#f8fafb] text-heading"}`}
              >
                <Icon
                  className={`h-7 w-7 ${item.featured ? "text-[#aac7ff]" : "text-sapphire"}`}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="mt-7 text-xl font-semibold leading-snug">
                  {item.title}
                </h3>
                <p
                  className={`mt-3 text-base leading-relaxed ${item.featured ? "text-platinum" : "text-body"}`}
                >
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
