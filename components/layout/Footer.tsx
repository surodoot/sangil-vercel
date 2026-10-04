import Link from "next/link";
import { companyInfo, contactInfo, navigation } from "@/data/company";
import { Logo } from "@/components/ui/Logo";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { Container } from "@/components/ui/Container";
import { isConfigured, formatPhoneHref } from "@/lib/utils";
export function Footer() {
  return (
    <footer className="bg-navy pb-28 pt-12 text-platinum lg:pb-8 lg:pt-16">
      <Container>
        <div className="grid gap-10 border-b border-white/20 pb-10 lg:grid-cols-[1.3fr_.7fr_1fr]">
          <div>
            <Logo onDark />
            <p className="mt-5 max-w-sm text-base leading-relaxed">
              정확한 제조와 책임 있는 일정 관리.
              <br />
              고객의 요구사항에서 시작합니다.
            </p>
          </div>
          <nav aria-label="하단 메뉴">
            <p className="text-xs font-semibold tracking-[.15em] text-white">
              EXPLORE
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <AnchorLink
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-sm hover:text-white"
                  >
                    {item.label}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-sm leading-relaxed">
            <p className="mb-4 text-xs font-semibold tracking-[.15em] text-white">
              COMPANY
            </p>
            <p className="text-white">
              {companyInfo.name} · 대표 {companyInfo.ceo}
            </p>
            <p className="mt-2">사업자등록번호 {companyInfo.bizRegNo}</p>
            <p className="mt-2">{companyInfo.address}</p>
            {isConfigured(contactInfo.phone) && (
              <a
                className="mt-3 inline-flex min-h-11 items-center text-white"
                href={formatPhoneHref(contactInfo.phone)}
              >
                {contactInfo.phone}
              </a>
            )}
            {isConfigured(contactInfo.generalEmail) && (
              <a
                className="mt-2 block break-all text-white"
                href={`mailto:${contactInfo.generalEmail}`}
              >
                {contactInfo.generalEmail}
              </a>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} SANGIL ENGINEERING. All rights
            reserved.
          </p>
          <Link
            href="/privacy"
            className="inline-flex min-h-11 items-center text-sm hover:text-white"
          >
            개인정보처리방침
          </Link>
        </div>
      </Container>
    </footer>
  );
}
