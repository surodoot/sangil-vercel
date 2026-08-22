# 상일엔지니어링 공식 홈페이지

경기도 김포시 소재 자동차용 신품 부품 제조기업 **상일엔지니어링**의 공식 기업
홈페이지입니다. Next.js(App Router) + TypeScript + Tailwind CSS 기반의
반응형 1페이지 사이트로, 회사소개·사업분야·보유설비·품질관리·생산사례·
AI 견적 모델·견적문의·오시는길 등 전체 섹션을 하나의 홈페이지에서 스크롤로
확인할 수 있습니다. 디자인은 펄 아이보리 배경과 미드나이트 네이비·샴페인
골드 포인트를 사용한 Glassmorphism(유리 질감) 기반 프리미엄 스타일입니다.

> ⚠️ **공개(배포) 전 반드시 [8. 공개 전 최종 점검표](#8-공개-전-최종-점검표)를
> 확인하세요.** 전화번호·이메일·보유설비·생산제품 사진 등 다수의 항목이
> 아직 실제 정보로 채워지지 않은 상태입니다.

---

## 목차

1. [기술 스택](#1-기술-스택)
2. [폴더 구조](#2-폴더-구조)
3. [설치 및 실행](#3-설치-및-실행)
4. [중앙 데이터 파일 사용법](#4-중앙-데이터-파일-사용법-datacompanyts)
5. [표시값(placeholder) 안내](#5-표시값placeholder-안내)
6. [견적 문의 폼 — 실제 운영 전 연동 필요](#6-견적-문의-폼--실제-운영-전-연동-필요)
7. [배포 방법](#7-배포-방법)
8. [공개 전 최종 점검표](#8-공개-전-최종-점검표)
9. [접근성 및 성능](#9-접근성-및-성능)
10. [디자인 시스템 참고](#10-디자인-시스템-참고)

---

## 1. 기술 스택

| 영역 | 사용 기술 |
| --- | --- |
| 프레임워크 | Next.js 16 (App Router), React 19, TypeScript |
| 스타일 | Tailwind CSS v4 (CSS-first 테마, `app/globals.css`) |
| 애니메이션 | Framer Motion, GSAP + ScrollTrigger(동적 로딩), Lenis(부드러운 스크롤) |
| 폼 | React Hook Form + Zod |
| 아이콘 | lucide-react |
| 폰트 | Pretendard Variable(한글 본문, 로컬 폰트), Manrope·Space Grotesk(영문/숫자, next/font) |
| SEO | 서버 메타데이터, `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, JSON-LD 구조화 데이터 |

## 2. 폴더 구조

```
data/company.ts        중앙 데이터 파일 — 회사정보·연락처·메뉴·설비·생산사례 등 모든 콘텐츠
lib/                    검증 스키마(zod), 유틸리티, 구조화 데이터, GSAP 동적 로더
hooks/                  반응형/접근성 관련 커스텀 훅 (반응형 감지, 동작 줄이기 감지 등)
components/
  layout/               헤더, 모바일 메뉴, 푸터, 맨위로 버튼, 모바일 고정 CTA
  motion/                스크롤 등장, 마스크 텍스트, 패럴랙스, 부드러운 스크롤 등 애니메이션 컴포넌트
  sections/              13개 섹션 각각의 컴포넌트 (Hero, About, BusinessStory, …)
  ui/                    버튼, 카드 제목, 관리자 안내 배지 등 재사용 UI 요소
app/
  page.tsx              전체 섹션을 순서대로 배치하는 메인 페이지
  layout.tsx             폰트, 메타데이터, JSON-LD, 전역 프로바이더
  privacy/page.tsx        개인정보처리방침
  api/inquiry/route.ts     견적 문의 폼 처리용 API 라우트(현재 목업)
  sitemap.ts / robots.ts / opengraph-image.tsx / icon.tsx   SEO 관련 파일
assets/fonts/            Pretendard 폰트 파일 (본문용 woff2, OG 이미지용 otf)
```

## 3. 설치 및 실행

Node.js 20 이상을 권장합니다.

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행 (빌드 후)
npm run start

# 코드 검사(ESLint)
npm run lint
```

### 콘텐츠 수정하기

거의 모든 콘텐츠(회사정보, 연락처, 메뉴, 설비, 생산사례, 견적 문의 설정,
지도 좌표 등)는 **[`data/company.ts`](data/company.ts)** 한 파일에서
관리됩니다. 디자인/레이아웃이 아닌 "글자·정보"를 바꾸고 싶다면 대부분 이
파일만 수정하면 됩니다.

## 4. 중앙 데이터 파일 사용법 (`data/company.ts`)

| 상수 | 내용 | 비고 |
| --- | --- | --- |
| `PLACEHOLDERS` | 미확정 정보의 표시값 문자열 모음 | 직접 수정할 필요 없음 |
| `companyInfo` | 상호, 대표자, 사업자등록번호, 주소, 종업원 수 등 | `showFoundedDate`, `showEmployeeCount`로 공개 여부 토글 |
| `contactInfo` | 전화, 팩스, 이메일, 홈페이지 | 값이 없으면 `null` 유지 → 관련 UI 자동 숨김 |
| `siteConfig` | 사이트 제목/설명/키워드, 배포 도메인(`url`) | 배포 전 `url` 또는 `NEXT_PUBLIC_SITE_URL` 환경변수 설정 필수 |
| `navigation` | 헤더/모바일 메뉴 항목 | |
| `coreCompetencies` | 핵심 가치 4카드 (납기 책임 카드가 가장 크게 강조됨) | |
| `businessSteps`, `businessCapabilities` | 사업분야 가로 스크롤 카드 및 가공 사양 패널 | |
| `productionProcess` | 생산 진행 과정 타임라인 6단계 | |
| `equipmentList` | 보유 설비 목록 | **비어 있으면 섹션이 "준비 중" 상태로 표시됩니다.** 실제 설비 정보가 있는 항목만 추가하세요 |
| `qualityAreas`, `certifications` | 품질관리 4항목, 보유 인증서 | `certifications`가 비어 있으면 인증서 영역이 노출되지 않습니다 |
| `galleryItems` | 생산품/가공사례 | 비어 있으면 갤러리가 "준비 중" 상태로 표시됩니다 |
| `aiEstimateConfig` | AI 견적 모델 섹션의 입력/결과 항목 라벨 | 실제 예측 모델은 아직 없으므로 결과는 항상 "준비 중"으로 표시됩니다 |
| `inquiryConfig` | 문의 유형, 첨부파일 허용 확장자·용량·개수 | |
| `mapConfig` | 오시는 길 지도 좌표 | ⚠️ 현재 좌표는 근사값입니다. 배포 전 정확한 좌표로 교체하세요 |

각 배열/객체에는 필드별 TypeScript 타입이 함께 정의되어 있어, 항목을
추가하거나 수정할 때 자동완성과 타입 검사를 받을 수 있습니다.

### 설비/생산사례 항목 추가 예시

```ts
export const equipmentList: EquipmentItem[] = [
  {
    id: "cnc-01",
    photo: "/images/equipment/cnc-01.jpg", // public/images/... 경로
    photoAlt: "5축 CNC 머시닝센터 정면 사진",
    name: "5축 CNC 머시닝센터",
    manufacturer: "제조사명",
    model: "모델명",
    range: "가공 범위",
    quantity: 2,
    usage: "정밀 부품 가공",
    description: "간단한 설명",
  },
];
```

배열에 항목을 추가하는 즉시 홈페이지 화면(보유설비 섹션)에 자동으로
반영됩니다. 값이 없는 필드는 `null`로 두면 해당 항목만 화면에서 자동
생략됩니다.

## 5. 표시값(placeholder) 안내

아래 항목은 Bizno 사업자정보로 확인되지 않아 **임의로 생성하지 않고**
`[ ... 입력]` 형태의 표시값으로 남겨 두었습니다. `data/company.ts`에서
검색해 실제 값으로 교체하세요.

- `[대표 전화번호 입력]` / `[팩스번호 입력]`
- `[견적 문의 이메일 입력]` / `[이메일 입력]`
- `[보유 설비 정보 입력]`
- `[가공 가능 소재 입력]` / `[가공 가능 크기 입력]` / `[가공 가능 범위 입력]`
- `[가공 정밀도 입력]`
- `[품질인증 정보 입력]`
- `[생산제품 사진 입력]`
- `[회사 로고 입력]`
- `[주요 가공 공정 입력]` / `[대응 가능한 생산 수량 입력]` / `[측정 및 검사 장비 입력]`

이 표시값들은 **개발 모드(`npm run dev`)에서만** 점선 배지(⚠ 관리자 확인
필요)로 화면에 노출되며, **프로덕션 빌드(`npm run build && npm run start`)
에서는 자동으로 숨겨집니다.** 실제 데이터가 준비되지 않은 상태로 배포해도
방문자에게는 노출되지 않지만, 해당 섹션은 "준비 중" 안내만 보이게 되므로
가능한 한 배포 전에 채워 넣는 것을 권장합니다.

## 6. 견적 문의 폼 — 실제 운영 전 연동 필요

`app/api/inquiry/route.ts`는 현재 **목업(mock) 엔드포인트**입니다.
입력값 검증(Zod)은 정상 동작하지만, 다음 작업이 연동되기 전까지는 문의
내용이나 첨부파일이 실제로 어디에도 저장·전송되지 않습니다.

- [ ] 이메일 발송 연동 (예: Resend, Nodemailer + SMTP)
- [ ] 첨부파일 보안 스토리지 연동 (예: Vercel Blob, AWS S3) 및 바이러스 검사
- [ ] 문의 데이터 저장을 위한 DB 또는 CRM 연동
- [ ] 스팸 방지를 위한 CAPTCHA/레이트리밋 적용

프런트엔드(첨부파일 형식·용량 검증, 업로드 진행 표시, 성공/실패 상태 등)는
전체 흐름이 이미 완성되어 있으므로, 위 백엔드 연동만 추가하면 됩니다.

## 7. 배포 방법

가장 간단한 방법은 [Vercel](https://vercel.com)에 배포하는 것입니다.

1. GitHub 등 Git 저장소에 프로젝트를 올립니다.
2. Vercel에서 저장소를 Import 합니다 (Next.js 프로젝트 자동 인식).
3. 환경변수 `NEXT_PUBLIC_SITE_URL`에 실제 배포 도메인(`https://...`)을
   설정합니다. (사이트맵, canonical 링크, Open Graph, 구조화 데이터에 사용됩니다.)
4. 배포 후 `/sitemap.xml`, `/robots.txt`, `/opengraph-image`가 정상
   응답하는지 확인합니다.
5. Google Search Console / 네이버 서치어드바이저에 사이트맵을 등록합니다.

Vercel 대신 다른 Node.js 호스팅 환경을 사용할 경우 `npm run build` 후
`npm run start`로 실행할 수 있습니다.

## 8. 공개 전 최종 점검표

배포하기 전에 아래 항목을 반드시 확인·교체하세요.

- [ ] **대표 전화번호** — `data/company.ts`의 `contactInfo.phone`
- [ ] **견적 문의 이메일 / 일반 이메일** — `contactInfo.quoteEmail`,
      `contactInfo.generalEmail`
- [ ] **팩스번호** (있는 경우) — `contactInfo.fax`
- [ ] **보유 설비 정보** — `equipmentList` (실제 설비만 등록, 가상의 설비
      금지)
- [ ] **생산제품 사진** — 실제 제품/가공 현장 사진으로 교체 (현재 히어로 및
      각 섹션의 시각 요소는 사진이 아닌 코드 기반 추상 그래픽으로 구성되어
      있어 실제 공장으로 오인될 위험은 없으나, 실제 사진으로 교체 시 신뢰도가
      높아집니다)
- [ ] **가공 가능 소재/크기/범위, 가공 정밀도** — `businessCapabilities`
- [ ] **품질인증 정보(인증서)** — `certifications` (실제 인증서 파일이
      있을 때만 등록)
- [ ] **종업원 수 공개 여부** — `companyInfo.showEmployeeCount`
      (현재 13명, 2026-08-18 Bizno 기준 — 변경 여부 확인)
- [ ] **사업자 등록일 공개 여부** — `companyInfo.showFoundedDate`
      (현재 2021-03-01 Bizno 기준 — 변경 여부 확인)
- [ ] **회사 로고** — `components/ui/Logo.tsx` (현재 텍스트 워드마크 사용 중)
- [ ] **오시는 길 지도 좌표** — `mapConfig.lat` / `mapConfig.lng`
      (현재 값은 행정동 기준 근사 좌표이며 정확한 필지 좌표가 아닙니다)
- [ ] **배포 도메인** — `NEXT_PUBLIC_SITE_URL` 환경변수 / `siteConfig.url`
- [ ] **견적 문의 폼 백엔드 연동** — [6장](#6-견적-문의-폼--실제-운영-전-연동-필요) 참고
- [ ] **개인정보처리방침** — `app/privacy/page.tsx` 내용을 회사 실제 운영
      방식(위탁업체, 보관기간, 담당자 연락처 등)에 맞게 검토
- [ ] 생산사례(`galleryItems`) 등록 시 고객사명·도면·부품번호 등 보안 정보는
      `clientInfoApproved`가 `true`인 항목에서만 노출됨을 확인
- [ ] **AI 견적 모델 섹션** — 현재는 실제 예측 기능 없이 컨셉만 보여주는
      "도입 준비 중" 상태입니다(`data/company.ts`의 `aiEstimateConfig`).
      실제 모델을 도입하기 전까지 결과 영역에 가상의 금액·시간을 절대
      입력하지 마세요.

## 9. 접근성 및 성능

- WCAG 2.2 AA 수준을 목표로 시맨틱 마크업, 키보드 내비게이션, 포커스 표시,
  명도 대비, 모달 포커스 트랩(Esc 닫기 포함)을 구현했습니다.
- `prefers-reduced-motion`을 감지해 대부분의 애니메이션·패럴랙스·부드러운
  스크롤을 비활성화합니다 (`hooks/useReducedMotion.ts`,
  `MotionConfig reducedMotion="user"`).
- GSAP·Lenis 등 무거운 애니메이션 라이브러리는 필요한 시점(데스크톱 인터랙션
  초기화 시)에만 동적으로 불러옵니다.
- 탭이 백그라운드로 전환되면 스크롤 애니메이션 루프를 일시 정지합니다.
- 실제 배포 후에는 Lighthouse 등으로 성능·접근성·SEO 점수를 재측정해
  90점 이상을 목표로 조정하세요 (이미지가 실제 사진으로 교체되면 다시
  측정이 필요합니다).

## 10. 디자인 시스템 참고

**"Glassmorphism 기반 프리미엄 미래형 제조기업 디자인"** — 펄 아이보리 계열의
밝고 고급스러운 배경 위에 반투명 유리 패널, 미드나이트 네이비 강조색,
샴페인 골드 포인트를 절제해서 사용하는 디자인 언어입니다.

| 구분 | 색상 | 토큰 |
| --- | --- | --- |
| 기본 배경 (60%) | 펄 아이보리 `#F7F5F0`, 웜 화이트 `#FCFBF8`, 미스트 그레이 `#E9EDF2` | `bg-ivory` `bg-warm-white` `bg-mist` |
| 핵심 브랜드 (15%) | 미드나이트 네이비 `#0B1F3A`, 딥 네이비 `#142B4A`, 로열 사파이어 `#2457C5` | `bg-navy` `bg-navy-deep` `text-sapphire` |
| 포인트 (5%, 제한적 사용) | 샴페인 골드 `#C9A96E`, 소프트 골드 `#D8BF91`, 플래티넘 실버 `#C7CED8` | `text-gold` `text-gold-soft` `text-platinum` |
| 글자 | 제목 `#0A1C33`, 본문 `#405168`, 보조 `#6B7788`, 어두운 배경용 `#F9F7F2` | `text-heading` `text-body` `text-muted` `text-on-dark` |

- **다크 럭셔리 + 별빛 연출**: 히어로(스크롤 시네마틱 스토리의 1·6번째 장면),
  AI 견적 모델 섹션, 푸터처럼 어두운 배경을 쓰는 영역은 `.bg-cosmos-gradient`
  (짙은 보라 `#170F38` → 거의 검정 `#07040F` 라디얼 그라데이션)와
  `<StarField />` 컴포넌트(`components/motion/StarField.tsx`)로 밤하늘처럼
  반짝이는 별빛을 표현합니다. 별은 고정 시드 의사난수로 생성되어 서버/클라이언트
  렌더가 항상 일치하며, "동작 줄이기" 환경에서는 반짝임 없이 고정된 밝기로
  표시됩니다.
- 색상, 유리 패널 유틸리티(`.glass-panel`, `.glass-panel-dark`), 골드 보더
  트레이스(`.gold-trace`), 버튼 골드 스윕(`.gold-sweep`) 등은 모두
  `app/globals.css`의 `@theme` 블록과 유틸리티 클래스로 관리합니다.
- `.glass-panel`류는 의도적으로 `border-radius`를 지정하지 않습니다 —
  Tailwind의 `rounded-*` 유틸리티(레이어드 CSS)는 언레이어드 CSS인 이
  클래스보다 캐스케이드 우선순위가 낮아 덮어쓸 수 없기 때문입니다. 사용할
  때는 항상 `rounded-[24px]` 등을 함께 지정하세요.
- 배경 흐림 정도는 CSS 변수 `--glass-blur`로 제어하며, 768px 미만
  화면에서는 자동으로 24px → 14px로 축소됩니다(모바일 성능/가독성 고려).
  `backdrop-filter`를 지원하지 않는 브라우저에서는 반투명 대신 불투명한
  펄 화이트 배경으로 자동 대체됩니다.
- 샴페인 골드는 버튼 전체 배경이나 넓은 면적에 사용하지 않고, 카드 테두리
  광택(`.gold-trace`), 버튼 호버 광택(`.gold-sweep`), 타임라인 완료 지점,
  구분선, 아이콘 포인트 등에만 제한적으로 사용했습니다.
- 카드 기울기(TiltCard), 마그네틱 버튼(Magnetic, `Button` 컴포넌트의 주요
  버튼에 기본 내장), 스크롤 등장(Reveal) 등 인터랙션 컴포넌트는
  `components/motion/`에 모여 있으며, 모두 PC 전용 + 동작 줄이기 대응이
  내장되어 있습니다.
- 현재 사용 중인 시각 요소(히어로 배경, 생산과정 다이어그램 등)는 실제
  공장/설비 사진이 없는 상태에서 오인을 방지하기 위해 코드로 생성한
  캘리퍼 눈금·CNC 툴패스 등 추상 도면형 그래픽으로 구성했습니다. 실제
  사진이 준비되면 각 섹션 컴포넌트(`components/sections/*Visual.tsx` 등)를
  `next/image` 기반으로 교체하는 것을 권장합니다.
- 보조 글자색 `#6B7788`은 가장 밝은 배경(`#F7F5F0`/`#FCFBF8`) 위에서 약
  4.17:1의 명도 대비를 가집니다. WCAG 2.2 AA 일반 텍스트 기준(4.5:1)에
  근소하게 못 미치므로, 법적/조달 심사 등에서 엄격한 AA 준수가 필요하다면
  이 토큰을 살짝 더 어둡게 조정하는 것을 검토하세요(현재 값은 사용자가
  지정한 브랜드 팔레트를 그대로 반영한 것입니다).
