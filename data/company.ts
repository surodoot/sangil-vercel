/**
 * ============================================================================
 * 상일엔지니어링 홈페이지 - 중앙 데이터 파일
 * ============================================================================
 * 이 파일 하나에서 회사정보, 연락처, 메뉴, 설비, 생산사례, 문의 설정 등
 * 홈페이지 전반의 콘텐츠를 관리합니다.
 *
 * ⚠️ 공개 전 반드시 확인/교체해야 하는 항목은 "[ ... 입력]" 형태의 표시값으로
 *    남겨두었습니다. 표시값은 공개 화면에서 자동으로 숨겨지며(hidden),
 *    개발 모드(npm run dev)에서만 점선 배지로 표시되어 관리자가 확인할 수
 *    있습니다. 실제 정보가 준비되면 표시값 문자열을 지우고 값을 입력하세요.
 *
 * 이 파일에 대한 상세 설명은 README.md의 "중앙 데이터 파일 사용법"을
 * 참고하세요.
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 표시값(placeholder) 상수 — 실제 정보 확인 전까지 이 값을 그대로 사용합니다.
// ----------------------------------------------------------------------------
export const PLACEHOLDERS = {
  phone: "[대표 전화번호 입력]",
  fax: "[팩스번호 입력]",
  quoteEmail: "[견적 문의 이메일 입력]",
  generalEmail: "[이메일 입력]",
  equipment: "[보유 설비 정보 입력]",
  materials: "[가공 가능 소재 입력]",
  size: "[가공 가능 크기 입력]",
  precision: "[가공 정밀도 입력]",
  certification: "[품질인증 정보 입력]",
  productPhoto: "[생산제품 사진 입력]",
  logo: "[회사 로고 입력]",
  processes: "[주요 가공 공정 입력]",
  range: "[가공 가능 범위 입력]",
  capacity: "[대응 가능한 생산 수량 입력]",
  inspectionEquipment: "[측정 및 검사 장비 입력]",
} as const;

// ----------------------------------------------------------------------------
// 기업정보 (Bizno 사업자정보 기준, 2026-08-18 확인)
// ----------------------------------------------------------------------------
export const companyInfo = {
  name: "상일엔지니어링",
  ceo: "조명현",
  bizRegNo: "122-05-71004",
  bizStatus: "계속사업자",
  companySize: "중소기업",
  /** 개인기업이므로 법인등록번호는 존재하지 않습니다. 화면에 표시하지 마세요. */
  companyType: "개인기업",
  taxType: "부가가치세 일반과세자",
  foundedDate: "2021-03-01",
  industryType: "제조업",
  industryItem: "그 외 자동차용 신품 부품 제조업",
  industryClassification: {
    large: "제조업",
    medium: "자동차 및 트레일러 제조업",
    small: "자동차 신품 부품 제조업",
    detail: "자동차용 기타 신품 부품 제조업",
    finest: "그 외 자동차용 신품 부품 제조업",
  },
  employeeCount: 13,
  postalCode: "10024",
  address: "경기도 김포시 월곶면 김포대로2659번길 47-1",
  addressEnglish: "47-1, Gimpo-daero 2659beon-gil, Wolgot-myeon, Gimpo-si, Gyeonggi-do, Republic of Korea",

  /**
   * ⚠️ 관리자 공개 여부 설정
   * 사업자 등록일과 종업원 수는 회사 상황에 따라 공개 여부를 선택할 수 있도록
   * 스위치로 관리합니다. 공개를 원치 않으면 false로 변경하세요.
   */
  showFoundedDate: true,
  showEmployeeCount: true,
} as const;

// ----------------------------------------------------------------------------
// 연락처 — 확인되지 않은 값은 반드시 null로 둡니다 (임의 생성 금지).
// 공개 화면의 각 컴포넌트는 null인 항목을 자동으로 숨깁니다.
// ----------------------------------------------------------------------------
export const contactInfo = {
  phone: null as string | null, // 예: "031-000-0000"
  fax: null as string | null,
  quoteEmail: null as string | null, // 견적 문의 전용 이메일
  generalEmail: null as string | null, // 일반 문의/대표 이메일
  homepage: null as string | null,
} as const;

// ----------------------------------------------------------------------------
// 사이트 기본 설정
// ----------------------------------------------------------------------------
export const siteConfig = {
  /**
   * ⚠️ 배포 전 반드시 실제 도메인으로 교체하세요.
   * 사이트맵, canonical, Open Graph, 구조화 데이터에 사용됩니다.
   * 환경변수 NEXT_PUBLIC_SITE_URL 로 재정의할 수 있습니다.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.sangil-engineering.kr",
  titleDefault: "상일엔지니어링 | 김포 자동차 부품 정밀가공 전문기업",
  titleTemplate: "%s | 상일엔지니어링",
  description:
    "상일엔지니어링은 경기도 김포시에 위치한 자동차용 신품 부품 제조기업입니다. 정확성과 일관성을 기반으로 자동차 부품 정밀가공과 임가공 대응을 지향합니다.",
  keywords: [
    "김포 자동차 부품 제조",
    "김포 자동차 부품 가공",
    "자동차용 신품 부품 제조",
    "자동차 부품 임가공",
    "자동차 부품 생산",
    "김포 제조업체",
    "주문형 자동차 부품",
    "정밀가공",
  ],
  locale: "ko_KR",
} as const;

// ----------------------------------------------------------------------------
// 헤더 내비게이션 메뉴
// ----------------------------------------------------------------------------
export interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  { label: "회사소개", href: "#about" },
  { label: "사업분야", href: "#business" },
  { label: "보유설비", href: "#equipment" },
  { label: "품질관리", href: "#quality" },
  { label: "생산사례", href: "#gallery" },
  { label: "견적문의", href: "#contact" },
];

// ----------------------------------------------------------------------------
// 회사소개 금지 표현 (내부 검수 참고용 — 코드에서 강제하지 않음, 카피 작성 가이드)
// ----------------------------------------------------------------------------
export const FORBIDDEN_CLAIMS = [
  "업계 최고",
  "국내 1위",
  "완벽한 품질",
  "무결점 생산",
  "초정밀 가공",
  "세계적인 기술력",
  "수십 년의 기술력",
  "대기업 납품업체",
] as const;

// ----------------------------------------------------------------------------
// 핵심 가치 (4카드) — "납기 책임" 카드를 가장 크게 표시합니다.
// ----------------------------------------------------------------------------
export interface CompetencyItem {
  id: string;
  title: string;
  description: string;
  /** 비대칭 그리드에서 가장 크게 강조할 카드 여부 */
  featured?: boolean;
}

export const coreCompetencies: CompetencyItem[] = [
  {
    id: "delivery",
    title: "납기 책임",
    description:
      "고객과 약속한 일정을 지키기 위해 생산 계획부터 진행 상황까지 책임 있게 관리합니다.",
    featured: true,
  },
  {
    id: "requirement-focus",
    title: "요구사항 중심의 대응",
    description:
      "고객의 요청 사항과 조건을 세심하게 검토하여 적합한 생산 방향을 제안합니다.",
  },
  {
    id: "accuracy",
    title: "정확한 제조",
    description:
      "제품 사양과 공정 조건을 세밀하게 확인하고 일관된 생산을 지향합니다.",
  },
  {
    id: "estimate-tech",
    title: "더 나은 견적을 위한 기술",
    description:
      "정확한 정보를 기반으로 한 견적 산정 방식을 도입해 신뢰할 수 있는 안내를 준비하고 있습니다.",
  },
];

// ----------------------------------------------------------------------------
// 사업 및 가공 영역 (가로 스크롤 스토리 카드)
// ----------------------------------------------------------------------------
export interface BusinessStep {
  id: string;
  index: string;
  title: string;
  description: string;
}

export const businessSteps: BusinessStep[] = [
  {
    id: "requirement",
    index: "01",
    title: "요구사항 확인",
    description: "고객사의 제품 요청 사항과 조건을 확인하는 단계입니다.",
  },
  {
    id: "drawing-review",
    index: "02",
    title: "도면 및 사양 검토",
    description: "전달받은 도면과 사양을 검토하여 생산 가능 여부를 확인합니다.",
  },
  {
    id: "manufacturing",
    index: "03",
    title: "자동차용 부품 제조",
    description: "확인된 사양에 따라 자동차용 신품 부품을 제조하는 단계입니다.",
  },
  {
    id: "process-check",
    index: "04",
    title: "공정별 확인",
    description: "생산 공정 진행 중 단계별 확인 절차를 거칩니다.",
  },
  {
    id: "inspection-shipping",
    index: "05",
    title: "제품 검사 및 출하",
    description: "생산이 완료된 제품을 검사한 후 출하를 진행합니다.",
  },
];

/** 사업분야 섹션 하단 스펙 패널 — 실제 자료 확정 전까지 표시값을 사용합니다. */
export const businessCapabilities = [
  { label: "주요 가공 공정", value: PLACEHOLDERS.processes },
  { label: "가공 가능 소재", value: PLACEHOLDERS.materials },
  { label: "가공 가능 범위", value: PLACEHOLDERS.range },
  { label: "대응 가능한 생산 수량", value: PLACEHOLDERS.capacity },
  { label: "측정 및 검사 장비", value: PLACEHOLDERS.inspectionEquipment },
];

// ----------------------------------------------------------------------------
// 생산 진행 과정 타임라인
// ----------------------------------------------------------------------------
export interface ProcessStage {
  id: string;
  title: string;
  description: string;
}

export const productionProcess: ProcessStage[] = [
  { id: "consult", title: "상담", description: "고객의 문의 내용을 접수하고 상담을 진행합니다." },
  { id: "review", title: "요구사항 검토", description: "요청하신 제품 사양과 조건을 검토합니다." },
  { id: "process-review", title: "공정 검토", description: "생산에 필요한 공정과 방법을 검토합니다." },
  { id: "production", title: "생산", description: "검토된 공정에 따라 제품 생산을 진행합니다." },
  { id: "inspection", title: "검사", description: "생산된 제품의 상태를 확인하는 단계입니다." },
  { id: "delivery", title: "납품", description: "검사가 완료된 제품을 납품합니다." },
];

// ----------------------------------------------------------------------------
// 보유 설비
// ----------------------------------------------------------------------------
export interface EquipmentItem {
  id: string;
  photo: string | null;
  photoAlt?: string;
  name: string;
  manufacturer: string | null;
  model: string | null;
  range: string | null;
  quantity: number | null;
  usage: string | null;
  description: string | null;
}

/**
 * ⚠️ 실제 보유 설비 정보가 확인되지 않았습니다.
 * 가상의 CNC, 선반, 머시닝센터, 측정기 등을 임의로 등록하지 마세요.
 * 실제 설비 정보가 준비되면 아래 배열에 항목을 추가하면 보유설비
 * 섹션에 자동으로 노출됩니다. 배열이 비어 있으면 섹션 전체가
 * "준비 중" 상태로 표시됩니다.
 */
export const equipmentList: EquipmentItem[] = [];

// ----------------------------------------------------------------------------
// 품질관리
// ----------------------------------------------------------------------------
export interface QualityArea {
  id: string;
  title: string;
  description: string;
}

/**
 * 아래 4개 항목은 일반적인 화면 구성 예시입니다.
 * 실제 회사의 품질관리 운영 방식과 다르면 자유롭게 삭제/수정하세요.
 */
export const qualityAreas: QualityArea[] = [
  { id: "incoming", title: "입고 및 소재 확인", description: "입고되는 소재의 상태와 사양을 확인하는 절차입니다." },
  { id: "in-process", title: "공정별 확인", description: "생산 공정 진행 중 단계별로 상태를 확인합니다." },
  { id: "dimension", title: "치수 및 외관 검사", description: "제품의 치수와 외관 상태를 검사하는 절차입니다." },
  { id: "final", title: "출하 전 최종 확인", description: "출하 전 제품의 최종 상태를 확인합니다." },
];

export interface Certification {
  id: string;
  name: string;
  issuedBy: string | null;
  fileUrl: string | null;
  imageUrl: string | null;
}

/**
 * ⚠️ ISO 인증 등 확인되지 않은 인증을 임의로 등록하지 마세요.
 * 실제 인증서/시험성적서 파일이 등록된 항목만 배열에 추가하면
 * 품질관리 섹션에 자동으로 노출됩니다.
 */
export const certifications: Certification[] = [];

// ----------------------------------------------------------------------------
// 생산품 및 가공사례
// ----------------------------------------------------------------------------
export type GalleryCategory = "automotive" | "precision" | "custom" | "etc";

export const galleryCategoryLabels: Record<GalleryCategory, string> = {
  automotive: "자동차용 부품",
  precision: "정밀 가공품",
  custom: "주문 제작품",
  etc: "기타 제조품",
};

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  title: string;
  image: string | null;
  imageAlt?: string;
  material: string | null;
  process: string | null;
  requirement: string | null;
  challenge: string | null;
  response: string | null;
  result: string | null;
  /**
   * 고객사명, 도면, 부품번호 등 보안 관련 정보입니다.
   * clientInfoApproved가 true인 경우에만 화면에 노출됩니다.
   */
  clientName?: string | null;
  drawingRef?: string | null;
  partNumber?: string | null;
  /** 위 보안 관련 정보의 공개 여부(관리자 승인 필요) */
  clientInfoApproved: boolean;
}

/**
 * ⚠️ 실제 생산사례 데이터가 준비되지 않았습니다.
 * 항목을 추가하면 생산품 및 가공사례 갤러리에 자동으로 노출됩니다.
 * 고객사 이름, 도면, 부품번호는 clientInfoApproved가 true인 경우에만
 * 컴포넌트에서 노출을 검토하세요.
 */
export const galleryItems: GalleryItem[] = [];

// ----------------------------------------------------------------------------
// AI 견적 모델 (컨셉 프리뷰) — 실제 예측 모델은 아직 도입 전입니다.
// 가상의 금액·시간을 표시하지 않고, 입력 항목과 결과 구조만 미리 보여줍니다.
// ----------------------------------------------------------------------------
export const aiEstimateConfig = {
  status: "AI 기반 시간·비용 예측 모델 · 도입 준비 중",
  inputs: ["도면", "소재", "주문 수량", "가공 방식", "공정 난이도", "희망 납기"],
  results: [
    { id: "duration", label: "예상 생산시간" },
    { id: "cost", label: "예상 비용 범위" },
    { id: "deadline", label: "예상 납기" },
    { id: "review", label: "담당자 최종 검토" },
  ],
  disclaimer:
    "AI 분석은 견적 검토를 지원하기 위한 기술입니다. 최종 비용과 납기는 담당자의 도면 및 생산조건 검토 후 확정됩니다.",
} as const;

// ----------------------------------------------------------------------------
// 홈페이지 최상단 소개 콘텐츠 (텍스트 기반, 이미지 없음)
// ----------------------------------------------------------------------------
export const cinematicConfig = {
  scene1: {
    eyebrow: "Sangil Engineering",
    titleLines: ["어떤 주문이든,", "약속한 기한 안에 완성합니다."],
    highlight: "약속한 기한",
    description: "정확한 제조와 책임 있는 일정 관리로 고객의 주문을 끝까지 완성합니다.",
    primaryCta: "견적 문의하기",
    secondaryCta: "생산 역량 알아보기",
  },
  scene2: {
    eyebrow: "Inside the Engine",
    titleLines: ["보이지 않는 부분까지", "정확하게 이해합니다."],
    checklist: ["4기통 구조", "피스톤 운동", "크랭크축 회전", "정밀한 부품 결합"],
  },
  scene3: {
    eyebrow: "How It Works",
    titleLines: ["하나의 완성품은", "수많은 정확한 움직임으로 만들어집니다."],
  },
  scene4: {
    eyebrow: "Exploded View",
    title: "부품 하나하나가 정밀하게 맞물립니다.",
    labels: [
      { id: "valve_cover", label: "밸브 커버" },
      { id: "cylinder_head", label: "실린더 헤드" },
      { id: "camshaft", label: "캠축 · 밸브" },
      { id: "engine_block", label: "엔진 블록" },
      { id: "piston", label: "피스톤 · 커넥팅 로드" },
      { id: "crankshaft", label: "크랭크축" },
      { id: "flywheel", label: "플라이휠" },
    ],
  },
  scene5: {
    eyebrow: "On-Time Delivery",
    titleLines: ["납기는 일정이 아니라", "고객과의 약속입니다."],
    steps: ["요구사항 검토", "공정 검토", "생산", "검사", "납품"],
  },
  scene6: {
    eyebrow: "AI Estimate Model",
    status: "AI 기반 시간·비용 예측 모델 · 도입 준비 중",
    inputs: ["부품 형상", "소재", "수량", "가공 공정", "공정 난이도", "검사 조건", "희망 납기"],
    results: [
      { id: "duration", label: "예상 생산시간", value: "분석 예정" },
      { id: "cost", label: "예상 비용 범위", value: "분석 예정" },
      { id: "deadline", label: "예상 납기", value: "담당자 검토 필요" },
    ],
    disclaimer: aiEstimateConfig.disclaimer,
    primaryCta: "견적 문의하기",
    secondaryCta: "생산 역량 확인하기",
  },
} as const;

// ----------------------------------------------------------------------------
// 견적 문의 폼 설정
// ----------------------------------------------------------------------------
export const inquiryConfig = {
  inquiryTypes: [
    "견적 요청",
    "가공 가능 여부 문의",
    "샘플 제작 문의",
    "협력업체 등록 문의",
    "기타 문의",
  ],
  /** 관리자가 조정 가능한 첨부 허용 확장자 */
  allowedFileExtensions: [".pdf", ".dwg", ".dxf", ".step", ".stp", ".iges", ".jpg", ".jpeg", ".png"],
  maxFileSizeMB: 20,
  maxFiles: 5,
} as const;

// ----------------------------------------------------------------------------
// 오시는 길
// ----------------------------------------------------------------------------
export const mapConfig = {
  address: companyInfo.address,
  /**
   * ⚠️ 주소 검색으로 확인한 실제 좌표로 교체하세요. (Kakao/Naver/Google 지도 API 콘솔에서 주소 검색)
   * 현재 값은 "경기도 김포시 월곶면" 행정 중심 좌표를 기준으로 한 근사값이며,
   * 정확한 필지 좌표가 아닙니다. 공개 전 반드시 검증하세요.
   */
  lat: 37.6423,
  lng: 126.5992,
  zoomLevel: 17,
} as const;
