import type { Metadata } from "next";
import { companyInfo, contactInfo } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { isConfigured } from "@/lib/utils";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: `${companyInfo.name} 개인정보처리방침 안내 페이지입니다.`,
  robots: { index: true, follow: true },
};

// Contact details remain unconfigured until verified by the company.
const phoneDisplay = isConfigured(contactInfo.phone)
  ? contactInfo.phone
  : "등록 준비 중";
const emailDisplay = isConfigured(contactInfo.generalEmail)
  ? contactInfo.generalEmail
  : isConfigured(contactInfo.quoteEmail)
    ? contactInfo.quoteEmail
    : "등록 준비 중";

export default function PrivacyPage() {
  return (
    <div className="bg-ivory pb-20 pt-28 sm:pb-28 sm:pt-36">
      <Container className="max-w-3xl">
        <p className="font-en text-sm font-semibold uppercase tracking-[0.18em] text-sapphire">
          Privacy Policy
        </p>
        <h1 className="mt-3 text-display-2 font-display font-bold text-heading">
          개인정보처리방침
        </h1>
        <p className="mt-4 text-body text-muted">
          {companyInfo.name}(이하 &ldquo;회사&rdquo;)는 「개인정보 보호법」 등
          관련 법령을 준수하며, 이용자의 개인정보를 안전하게 관리하기 위해
          다음과 같이 개인정보처리방침을 수립·공개합니다.
        </p>

        <div className="mt-4 rounded-xl border border-dashed border-line-strong bg-mist px-5 py-4 text-caption text-muted">
          현재 홈페이지 문의 양식은 입력 내용 확인만 제공하며, 내용과 파일이
          서버로 전송되거나 저장되지 않습니다. 이 문서는 일반적인
          개인정보처리방침 표준 항목으로 구성된 초안입니다. 공개 전 회사의 실제
          운영 방식(위탁 업체, 보관 기간, 담당자 연락처 등)에 맞게 검토하고,
          필요 시 법률 자문을 받아 확정해 주세요.
        </div>

        <div className="mt-12 space-y-10 text-body text-muted">
          <section>
            <h2 className="text-heading-2 font-display font-bold text-heading">
              1. 수집하는 개인정보 항목 및 수집 방법
            </h2>
            <p className="mt-3">
              회사는 견적 문의(홈페이지 내 &ldquo;견적 문의&rdquo; 양식) 접수를
              위해 아래와 같은 개인정보를 수집합니다.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>필수 항목: 회사명, 담당자명, 연락처, 이메일, 문의 내용</li>
              <li>
                선택 항목: 제품/부품명, 소재, 예상 수량, 희망 납기,
                첨부파일(도면 등)
              </li>
              <li>
                수집 방법: 홈페이지 견적 문의 양식을 통한 이용자의 자발적 입력
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-heading-2 font-display font-bold text-heading">
              2. 개인정보의 수집 및 이용 목적
            </h2>
            <p className="mt-3">
              수집한 개인정보는 다음의 목적을 위해 활용하며, 목적이 변경되는
              경우에는 관련 법령에 따라 별도의 동의를 받는 등 필요한 조치를
              이행합니다.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>견적 문의 및 가공 가능 여부 상담 응대</li>
              <li>문의 내용 확인 및 처리 결과 안내</li>
              <li>서비스(제품 생산·납품) 관련 연락 및 협의</li>
            </ul>
          </section>

          <section>
            <h2 className="text-heading-2 font-display font-bold text-heading">
              3. 개인정보의 보유 및 이용 기간
            </h2>
            <p className="mt-3">
              회사는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당
              정보를 지체 없이 파기합니다. 다만, 「전자상거래 등에서의
              소비자보호에 관한 법률」 등 관계 법령의 규정에 의하여 보존할
              필요가 있는 경우 회사는 관계 법령에서 정한 일정한 기간 동안
              회원정보를 보관합니다.
            </p>
          </section>

          <section>
            <h2 className="text-heading-2 font-display font-bold text-heading">
              4. 개인정보의 제3자 제공
            </h2>
            <p className="mt-3">
              회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
              다만 이용자의 사전 동의가 있거나 법령의 규정에 의한 경우는 예외로
              합니다.
            </p>
          </section>

          <section>
            <h2 className="text-heading-2 font-display font-bold text-heading">
              5. 개인정보처리의 위탁
            </h2>
            <p className="mt-3">
              회사는 현재 개인정보 처리 업무를 외부에 위탁하고 있지 않습니다.
              향후 이메일 발송, 데이터 저장 등을 위해 위탁이 발생하는 경우
              위탁받는 자와 위탁업무 내용을 이용자에게 공지하고, 필요한 경우
              사전 동의를 받도록 하겠습니다.
            </p>
          </section>

          <section>
            <h2 className="text-heading-2 font-display font-bold text-heading">
              6. 정보주체의 권리·의무 및 행사 방법
            </h2>
            <p className="mt-3">
              이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나
              수정할 수 있으며, 수집 및 이용 동의 철회(삭제)를 요청할 수
              있습니다. 권리 행사는 아래 &ldquo;9. 개인정보 보호책임자&rdquo;
              항목의 연락처를 통해 요청하실 수 있으며, 회사는 이에 대해 지체
              없이 조치합니다.
            </p>
          </section>

          <section>
            <h2 className="text-heading-2 font-display font-bold text-heading">
              7. 개인정보의 파기
            </h2>
            <p className="mt-3">
              회사는 개인정보 보유기간의 경과, 처리 목적 달성 등 개인정보가
              불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
              전자적 파일 형태의 정보는 기술적 방법을 사용하여 복구·재생이
              불가능하도록 영구 삭제합니다.
            </p>
          </section>

          <section>
            <h2 className="text-heading-2 font-display font-bold text-heading">
              8. 개인정보의 안전성 확보조치
            </h2>
            <p className="mt-3">
              회사는 개인정보의 안전성 확보를 위해 접근 권한 관리, 접속 기록
              보관 등 필요한 기술적·관리적 조치를 취하고 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-heading-2 font-display font-bold text-heading">
              9. 개인정보 보호책임자
            </h2>
            <p className="mt-3">
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
              처리와 관련한 정보주체의 불만 처리 및 피해 구제 등을 위하여 아래와
              같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <div className="glass-panel mt-4 rounded-[20px] p-6">
              <dl className="space-y-2">
                <div className="flex gap-2">
                  <dt className="w-20 shrink-0 text-muted">상호</dt>
                  <dd className="text-heading">{companyInfo.name}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-20 shrink-0 text-muted">대표자</dt>
                  <dd className="text-heading">{companyInfo.ceo}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-20 shrink-0 text-muted">연락처</dt>
                  <dd className="text-heading">{phoneDisplay}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-20 shrink-0 text-muted">이메일</dt>
                  <dd className="text-heading">{emailDisplay}</dd>
                </div>
              </dl>
            </div>
          </section>

          <section>
            <h2 className="text-heading-2 font-display font-bold text-heading">
              10. 고지의 의무
            </h2>
            <p className="mt-3">
              현 개인정보처리방침의 내용 추가, 삭제 및 수정이 있을 시에는 개정
              최소 7일 전부터 홈페이지의 &ldquo;공지사항&rdquo;을 통해 고지할
              것입니다.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
