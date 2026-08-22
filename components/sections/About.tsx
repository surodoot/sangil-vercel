import { companyInfo, coreCompetencies } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { StarField } from "@/components/motion/StarField";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { SectionEdgeFade } from "@/components/ui/SectionEdgeFade";
import { CompetencyCard } from "./CompetencyCard";

export function About() {
  return (
    <section id="about" className="bg-cosmos-gradient relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid-dark opacity-40" aria-hidden="true" />
      <StarField count={90} />
      <ParallaxLayer speed={20} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-1/3 h-[30rem] w-[30rem] rounded-full bg-violet/16 blur-[140px]" />
      </ParallaxLayer>
      <SectionEdgeFade position="top" color="#fcfbf8" />
      <SectionEdgeFade position="bottom" color="#07040f" />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="font-en text-sm font-semibold uppercase tracking-[0.18em] text-gold-soft">
              About Us
            </p>
            <h2 className="mt-3 text-display-2 font-display font-bold text-on-dark">
              기본에 충실한 제조,
              <br />
              신뢰로 이어지는 기술
            </h2>
          </div>

          <Reveal>
            <p className="text-body-lg text-platinum">
              {companyInfo.name}은 경기도 김포시에 위치한 자동차용 신품 부품
              제조기업입니다. 제조 공정의 기본인 정확성과 일관성을 중요하게
              생각하며, 고객의 요구사항을 세밀하게 검토하고 신뢰할 수 있는
              제품 생산을 지향합니다.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line-on-dark pt-8 sm:grid-cols-3">
              <div>
                <dt className="text-caption text-platinum">위치</dt>
                <dd className="mt-1 font-en text-heading-2 font-bold text-on-dark">
                  경기 김포시
                </dd>
              </div>
              <div>
                <dt className="text-caption text-platinum">업태</dt>
                <dd className="mt-1 font-en text-heading-2 font-bold text-on-dark">
                  {companyInfo.industryType}
                </dd>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <dt className="text-caption text-platinum">종목</dt>
                <dd className="mt-1 text-body font-semibold text-on-dark">
                  {companyInfo.industryItem}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal
          container
          delay={0.05}
          className="mt-20 grid gap-5 lg:grid-cols-2 lg:auto-rows-[minmax(0,1fr)]"
        >
          {coreCompetencies.map((item, index) => (
            <RevealItem
              key={item.id}
              className={item.featured ? "lg:row-span-3" : offsetClass(index)}
            >
              <CompetencyCard item={item} index={index} className="h-full" />
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/** 비대칭 구성을 위해 카드마다 서로 다른 높이에 살짝 떠 있는 느낌을 줍니다. */
function offsetClass(index: number) {
  const offsets = ["", "lg:mt-6", "lg:-mt-2"];
  return offsets[index % offsets.length];
}
