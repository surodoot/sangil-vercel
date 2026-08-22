import { companyInfo } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { StarField } from "@/components/motion/StarField";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { SectionEdgeFade } from "@/components/ui/SectionEdgeFade";

function formatFoundedDate(dateString: string) {
  const [year, month] = dateString.split("-");
  return `${year}년 ${Number(month)}월`;
}

const baseRows: Array<{ label: string; value: string }> = [
  { label: "상호", value: companyInfo.name },
  { label: "대표자", value: companyInfo.ceo },
  { label: "사업자등록번호", value: companyInfo.bizRegNo },
  { label: "기업 형태", value: companyInfo.companyType },
  { label: "업태", value: companyInfo.industryType },
  { label: "종목", value: companyInfo.industryItem },
  { label: "사업장 주소", value: companyInfo.address },
];

export function CompanyInfo() {
  const rows = [...baseRows];

  if (companyInfo.showFoundedDate) {
    rows.push({ label: "사업자 등록일", value: formatFoundedDate(companyInfo.foundedDate) });
  }
  if (companyInfo.showEmployeeCount) {
    rows.push({ label: "종업원 수", value: `${companyInfo.employeeCount}명` });
  }

  return (
    <section id="company-info" className="bg-cosmos-gradient relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid-dark opacity-40" aria-hidden="true" />
      <StarField count={70} />
      <ParallaxLayer speed={20} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-violet/16 blur-[120px]" />
      </ParallaxLayer>
      <SectionEdgeFade position="top" color="#f8f7f4" />
      <SectionEdgeFade position="bottom" color="#07040f" />

      <Container className="relative">
        <SectionHeading onDark eyebrow="Company Info" title="기업정보" />

        <Reveal className="gold-trace glass-panel-dark relative mt-12 overflow-hidden rounded-[24px]">
          <dl>
            {rows.map((row, index) => (
              <div
                key={row.label}
                className={`grid grid-cols-[9rem_1fr] gap-4 px-6 py-5 sm:grid-cols-[12rem_1fr] sm:px-8 ${
                  index !== rows.length - 1 ? "border-b border-line-on-dark" : ""
                }`}
              >
                <dt className="font-en text-sm font-semibold text-platinum">{row.label}</dt>
                <dd className="text-body font-medium text-on-dark">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
