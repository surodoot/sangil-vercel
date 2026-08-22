import { companyInfo, contactInfo, mapConfig, siteConfig } from "@/data/company";
import { isConfigured } from "@/lib/utils";

/**
 * 기업 및 지역 사업체 구조화 데이터(JSON-LD)를 생성합니다.
 * 확인되지 않은 전화번호/이메일 등은 절대 포함하지 않습니다.
 */
export function buildLocalBusinessJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#organization`,
    name: companyInfo.name,
    url: siteConfig.url,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyInfo.address,
      addressLocality: "김포시",
      addressRegion: "경기도",
      postalCode: companyInfo.postalCode,
      addressCountry: "KR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: mapConfig.lat,
      longitude: mapConfig.lng,
    },
    founder: {
      "@type": "Person",
      name: companyInfo.ceo,
    },
    taxID: companyInfo.bizRegNo,
    slogan: "정밀함으로 완성하는 자동차 부품의 기준",
    knowsAbout: [companyInfo.industryItem, "자동차 부품 정밀가공", "자동차 부품 임가공"],
  };

  if (isConfigured(contactInfo.phone)) {
    data.telephone = contactInfo.phone;
  }
  if (isConfigured(contactInfo.generalEmail)) {
    data.email = contactInfo.generalEmail;
  } else if (isConfigured(contactInfo.quoteEmail)) {
    data.email = contactInfo.quoteEmail;
  }
  if (companyInfo.showFoundedDate) {
    data.foundingDate = companyInfo.foundedDate;
  }
  if (companyInfo.showEmployeeCount) {
    data.numberOfEmployees = {
      "@type": "QuantitativeValue",
      value: companyInfo.employeeCount,
    };
  }

  return data;
}
