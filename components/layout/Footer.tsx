import Link from "next/link";
import { companyInfo, contactInfo, navigation } from "@/data/company";
import { Logo } from "@/components/ui/Logo";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { AdminNotice } from "@/components/ui/AdminNotice";
import { StarField } from "@/components/motion/StarField";
import { SectionEdgeFade } from "@/components/ui/SectionEdgeFade";
import { isConfigured, formatPhoneHref } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cosmos-gradient relative overflow-hidden pb-28 pt-16 lg:pb-16">
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid-dark opacity-30" aria-hidden="true" />
      <StarField count={60} />
      <SectionEdgeFade position="top" color="#f8f7f4" heightClassName="h-10 sm:h-12" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Logo onDark />
          <p className="mt-4 max-w-sm text-body text-platinum">
            {companyInfo.name}은 경기도 김포시에 위치한 자동차용 신품 부품
            제조기업입니다. 정확성과 일관성을 기반으로 신뢰할 수 있는 생산을
            지향합니다.
          </p>
        </div>

        <div>
          <h2 className="font-en text-sm font-semibold uppercase tracking-wide text-platinum">
            메뉴
          </h2>
          <ul className="mt-4 space-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <AnchorLink
                  href={item.href}
                  className="text-body text-platinum transition-colors hover:text-gold-soft"
                >
                  {item.label}
                </AnchorLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-1 text-body text-platinum">
          <h2 className="font-en text-sm font-semibold uppercase tracking-wide text-platinum">
            기업정보
          </h2>
          <div className="mt-4 space-y-1.5">
            <p className="text-on-dark">{companyInfo.name}</p>
            <p>대표자 {companyInfo.ceo}</p>
            <p>사업자등록번호 {companyInfo.bizRegNo}</p>
            <p>{companyInfo.address}</p>
            {isConfigured(contactInfo.phone) ? (
              <p>
                <a href={formatPhoneHref(contactInfo.phone)} className="hover:text-gold-soft">
                  {contactInfo.phone}
                </a>
              </p>
            ) : (
              <AdminNotice label="대표 전화번호" className="mt-2" onDark />
            )}
            {isConfigured(contactInfo.generalEmail) ? (
              <p>
                <a href={`mailto:${contactInfo.generalEmail}`} className="hover:text-gold-soft">
                  {contactInfo.generalEmail}
                </a>
              </p>
            ) : (
              <AdminNotice label="이메일" className="mt-2" onDark />
            )}
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-line-on-dark px-4 pt-6 text-caption text-platinum sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {year} {companyInfo.name}. 모든 권리 보유.
        </p>
        <Link href="/privacy" className="transition-colors hover:text-gold-soft">
          개인정보처리방침
        </Link>
      </div>
    </footer>
  );
}
