import { companyInfo } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
export function CompanyInfo() {
  const rows: Array<{ label: string; value: string }> = [
    { label: "상호", value: companyInfo.name },
    { label: "대표자", value: companyInfo.ceo },
    { label: "사업자등록번호", value: companyInfo.bizRegNo },
    { label: "기업 형태", value: companyInfo.companyType },
    { label: "업태", value: companyInfo.industryType },
    { label: "종목", value: companyInfo.industryItem },
    { label: "사업장 주소", value: companyInfo.address },
  ];
  if (companyInfo.showFoundedDate)
    rows.push({ label: "사업자 등록일", value: companyInfo.foundedDate });
  if (companyInfo.showEmployeeCount)
    rows.push({
      label: "종업원 수",
      value: `${companyInfo.employeeCount}명 (2026년 8월 기준)`,
    });
  return (
    <section id="company-info" className="section-space bg-white">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:gap-20">
          <SectionHeading
            eyebrow="Company profile"
            title="상일엔지니어링"
            description="기업 기본 정보를 안내합니다."
          />
          <dl className="border-t border-line-strong">
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 border-b border-line py-4 sm:grid-cols-[9rem_minmax(0,1fr)]"
              >
                <dt className="text-sm text-muted">{row.label}</dt>
                <dd className="min-w-0 text-base font-medium text-heading">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
