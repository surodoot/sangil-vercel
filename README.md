# 상일엔지니어링 홈페이지

경기도 김포시 소재 자동차용 신품 부품 제조기업 상일엔지니어링의 기업 홈페이지입니다.
기존 Next.js App Router 프로젝트를 유지하면서 슬레이트·화이트·블루 기반의 모던한 산업용 B2B 디자인과 모바일 레이아웃으로 정리했습니다.

## 실행

Node.js 20.9 이상을 사용합니다.

```bash
npm ci
npm run dev
```

개발 주소: http://localhost:3000

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript
npm run test        # 필드·파일 검증 및 미연동 API 단위 테스트
npm run build      # 프로덕션 빌드
npm run check      # 위 4개 검사 순서대로 실행
npm start          # 빌드 결과 실행
```

브라우저가 지원되는 컴퓨터에서는 다음 명령으로 반응형·내비게이션·문의 양식 테스트를 실행합니다.

```bash
npx playwright install chromium
npm run test:e2e
```

기존 Chromium 실행 파일을 사용하려면 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`를 지정할 수 있습니다. 자세한 변경 사항과 검증 범위는 [MODERNIZATION.md](MODERNIZATION.md)를 확인하세요.

## 기술 구성

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS v4, `app/globals.css`의 CSS-first 테마
- 로컬 Pretendard Variable 폰트: 빌드 시 외부 폰트 다운로드 불필요
- React Hook Form + Zod, lucide-react
- Node.js test runner + tsx, Playwright

이전 애니메이션 보조 컴포넌트와 의존성은 호환성을 위해 남겨 두었습니다. 현재 주요 화면은 스크롤 고정, 패럴랙스, 별빛, 마우스 추적, 자동 스크롤 보간을 사용하지 않습니다. 기본 콘텐츠는 JavaScript 없이도 서버 HTML에 표시됩니다.

## 주요 구조

```text
app/page.tsx                  홈페이지 섹션 구성
app/layout.tsx                헤더/푸터, 로컬 폰트, 메타데이터
app/globals.css               색상, 타이포그래피, 간격, 접근성
app/privacy/page.tsx          개인정보처리방침 초안
app/api/inquiry/route.ts       미연동 상태를 명시하는 503 응답
components/layout/            헤더, 모바일 메뉴, 하단 CTA
components/sections/          회사소개, 사업분야, 설비, 품질, 문의 등
components/ui/                버튼, 제목, 입력 필드 등 공통 요소
hooks/useFocusTrap.ts         모달 포커스·배경 격리
lib/validation.ts             폼 및 파일 검증
data/company.ts              회사정보와 콘텐츠의 중앙 데이터
tests/inquiry.test.ts         단위 테스트
tests/e2e/responsive.spec.ts  브라우저 검증 시나리오
```

## 콘텐츠 수정

회사정보, 연락처, 메뉴, 설비, 생산사례, 문의 설정은 `data/company.ts`에서 관리합니다.

- `companyInfo`: 회사명, 대표자, 주소, 사업자등록번호 등. 종업원 수와 등록일 공개 여부는 기존 스위치를 사용합니다.
- `contactInfo`: 확인되지 않은 연락처는 `null`을 유지합니다. 가상의 전화번호나 이메일을 입력하지 마세요.
- `businessCapabilities`: 확정된 가공 사양만 노출됩니다. `[... 입력]` 표시값은 숨깁니다.
- `equipmentList` / `galleryItems`: 실제 자료가 없는 동안 정직한 준비 중 안내가 표시됩니다. 실제 사진·정보 등록 시 카드가 자동 생성됩니다.
- `certifications`: 실제 인증이 확인된 항목만 등록합니다.
- `galleryItems[].clientInfoApproved`: 고객사명·도면·부품번호 공개 허용 여부입니다. 기본적으로 보호합니다.
- `aiEstimateConfig`: 아직 도입 전입니다. 실제 AI 분석, 예측 시간이나 금액은 제공하지 않습니다.
- `siteConfig.url`: 실제 도메인 확인 후 수정하거나 `NEXT_PUBLIC_SITE_URL`로 재정의하세요. 저장소의 기존 도메인은 검증되지 않은 설정값입니다.

지도는 기존 좌표가 근사값이므로 정확한 위치인 것처럼 지도 핀을 표시하지 않습니다. 등록된 도로명 주소로 네이버 지도 검색을 열며, 주소 복사 기능을 제공합니다.

## 문의 양식의 현재 상태

온라인 문의 접수는 아직 연결되지 않았습니다.

- 방문자는 필수 항목과 파일 형식·크기를 이 화면에서 확인할 수 있습니다.
- 입력 데이터나 파일을 전송·업로드·저장하지 않습니다.
- 가짜 업로드 진행률이나 접수 성공 메시지를 표시하지 않습니다.
- `POST /api/inquiry`는 요청 내용을 읽거나 기록하지 않고 명시적인 HTTP 503과 `Cache-Control: no-store`를 반환합니다.
- 실제 전송이 없는 상태에서는 개인정보 동의를 요청하지 않습니다. 향후 실제 전송용 `inquirySchema`의 필수 동의 검증은 유지합니다.

실제 문의 접수를 시작하려면 다음을 별도로 구현·검토해야 합니다.

1. 이메일/DB/CRM 등 실제 전달·보관 서비스
2. 파일 바이너리 저장, 서버 측 파일 검증 및 악성 파일 검사
3. 레이트리밋 등 스팸·남용 방지
4. 실제 운영에 맞는 개인정보처리방침, 동의 절차, 보관·삭제 정책
5. 전달 성공을 확인한 후에만 표시하는 접수 완료 상태

## 모바일 및 접근성 설계

- 68px 모바일 / 80px 데스크톱 고정 헤더
- 320px부터 사용할 수 있는 단일 열 폼·콘텐츠 구조와 유동형 제목 크기
- 최소 44px 터치 영역, 입력 글자 16px, 폰 safe-area 여백
- 화면 높이가 짧아도 내부 스크롤 가능한 모바일 메뉴
- 메뉴 Escape 닫기, Tab 순환, 이전 포커스 복원, 배경 `inert` 상태 복원
- 데스크톱 전환·페이지 이동 시 메뉴와 스크롤 잠금 정리
- `/privacy`에서도 홈페이지 섹션으로 이동하는 링크
- 문의 화면/입력 중 하단 고정 CTA 숨김
- `prefers-reduced-motion` 존중, 콘텐츠 초기 숨김 없음

이 항목들은 구현 범위를 설명하며, WCAG 인증이나 실제 기기 테스트 통과를 의미하지 않습니다. 검증 결과는 [MODERNIZATION.md](MODERNIZATION.md)에 구분했습니다.

## 배포 전 점검

- [ ] 대표 전화·이메일 확인 및 입력
- [ ] 실제 설비, 가공 가능 사양, 생산사례 등록
- [ ] 인증 보유 여부와 고객 정보 공개 승인 확인
- [ ] 도메인 및 `NEXT_PUBLIC_SITE_URL` 확인
- [ ] 종업원 수 등 시점에 민감한 기업정보 재확인
- [ ] 문의 백엔드 연결과 개인정보처리방침 확정
- [ ] 모바일/데스크톱 브라우저 테스트와 화면 검수
- [ ] 이미지가 추가된 경우 대체 텍스트, 크기, 품질과 로딩 성능 재검사
- [ ] 최신 의존성 보안 검사

Vercel 등 Next.js 호스팅에서 `npm run build`로 빌드합니다. GitHub 브랜치 반영과 실제 서비스 배포는 별도의 단계입니다. 공개 전 위 점검 항목을 확인하세요.
