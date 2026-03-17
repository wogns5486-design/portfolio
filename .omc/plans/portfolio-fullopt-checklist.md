# ONESTEP 포트폴리오 풀옵션 체크리스트

> 작성일: 2026-03-17
> 프로젝트: portfolio-fullopt
> 총 10 Phase, 단계별 완료 체크

---

## Phase 1: Astro 프로젝트 셋업 + 기존 데모 이전

### 목표
Astro 프로젝트 초기화, 기존 데모를 public/에 배치, Cloudflare Pages 배포 확인.

### TODO
- [ ] `npm create astro@latest` 실행 (빈 템플릿, TypeScript strict)
- [ ] 기존 파일 정리: `index.html`, `contact.html` → 백업 (`_legacy/`)
- [ ] 기존 102개 데모 폴더를 `public/` 루트에 유지 (이동하지 않음)
- [ ] `.gitignore` 설정: `node_modules/`, `dist/`, `.astro/`
- [ ] `astro.config.mjs` 기본 설정:
  - site: `https://portfolio-2p4.pages.dev`
  - output: `static`
  - integrations: `@astrojs/tailwind`, `@astrojs/sitemap`
- [ ] Tailwind 설치 및 `tailwind.config.mjs` 작성 (현재 CSS 변수를 Tailwind 테마에 매핑)
- [ ] `tsconfig.json` strict 모드
- [ ] `.github/workflows/deploy.yml` 수정 (Astro 빌드 커맨드)
- [ ] 빌드 테스트: `npm run build` 성공 확인
- [ ] Cloudflare Pages 배포 테스트: 기존 데모 URL 접근 가능 확인
  - 예: `portfolio-2p4.pages.dev/dashboard/index.html`

### 완료 기준
- `npm run dev` 로컬 서버 정상 구동
- `npm run build` 에러 없이 dist/ 생성
- Cloudflare Pages 배포 후 기존 데모 URL 정상 작동

---

## Phase 2: 메인 레이아웃 + 다크 테마 + 컴포넌트 시스템

### 목표
전체 사이트의 기반 레이아웃과 공통 컴포넌트 구축.

### TODO
- [ ] `src/styles/global.css` 작성:
  - CSS 리셋
  - CSS 변수 정의 (현재 index.html에서 추출)
  - 도트 그리드 배경 패턴
  - Inter 폰트 셀프호스팅 (`public/fonts/`)
  - 기본 타이포그래피 스케일
- [ ] `src/layouts/BaseLayout.astro`:
  - `<html lang>`, `<head>` (메타, 폰트, 글로벌 CSS)
  - `<slot />`
  - View Transitions 설정 (`<ViewTransitions />`)
- [ ] `src/layouts/PageLayout.astro`:
  - BaseLayout 확장
  - Header + Footer 포함
- [ ] `src/components/common/Header.astro`:
  - 스티키 네비게이션
  - ONESTEP 로고 (텍스트)
  - 메뉴: Home, Projects, About, Blog, Contact
  - 모바일 햄버거 메뉴
  - CTA 버튼 ("문의하기")
- [ ] `src/components/common/Footer.astro`:
  - 네비게이션 링크
  - 이메일 복사 버튼
  - 저작권
- [ ] `src/components/common/Button.astro`:
  - variant: primary, secondary, ghost
  - size: sm, md, lg
- [ ] `src/components/common/Card.astro`:
  - 공통 카드 (surface 배경, 보더, 호버)
- [ ] `src/components/common/SectionHeader.astro`:
  - 라벨 (uppercase) + 타이틀
- [ ] `src/components/common/SEO.astro`:
  - 메타 태그, OG, Twitter Card, JSON-LD
  - 페이지별 props 받기

### 완료 기준
- 빈 메인 페이지에서 Header + Footer 정상 렌더링
- 모바일 반응형 네비게이션 동작
- 다크 테마 배경/텍스트 현재 사이트와 동일한 톤
- Lighthouse 접근성 90+

---

## Phase 3: Hero + Stats + Why ONESTEP + Tech Stack + Process 섹션

### 목표
메인 페이지 핵심 섹션을 Astro 컴포넌트로 재구현.

### TODO
- [ ] `src/components/home/Hero.astro`:
  - "ONESTEP PORTFOLIO" 라벨
  - "웹·앱 개발, 합리적인 가격으로" 타이틀 (그래디언트 텍스트)
  - 서브카피 + CTA 버튼
  - 배경: 블러 오브 (CSS radial-gradient, 현재와 동일)
  - 스크롤 힌트 (아래 화살표)
- [ ] `src/components/home/StatsBar.astro`:
  - 3칸 그리드: 102+ 프로젝트 / Full 커스텀 / 3 LIVE 서비스
  - 스탯 카드 호버 효과
  - 카운트업 애니메이션 (클라이언트 스크립트)
- [ ] `src/components/home/WhyOnestep.astro`:
  - 4개 value 카드: 가격, 올인원, 검증된 실력, (추가: 빠른 소통)
  - 현재 디자인 계승
- [ ] `src/components/home/TechStack.astro`:
  - 카테고리별 기술 배지 (Frontend, Backend, Database, Deploy, Tools)
  - 현재 텍스트 배지에서 아이콘 추가 고려
- [ ] `src/components/home/Process.astro`:
  - 4단계: 기획 > 디자인 > 개발 > 배포
  - 타임라인 형태 레이아웃
- [ ] `src/pages/index.astro` 조립:
  - PageLayout > Hero > StatsBar > WhyOnestep > TechStack > Process
- [ ] 반응형 테스트: 1920px, 768px, 375px

### 완료 기준
- 메인 페이지 상단 5개 섹션이 현재 사이트와 동일한 비주얼
- 모바일/태블릿 반응형 정상
- 카운트업 애니메이션 동작

---

## Phase 4: 프로젝트 컬렉션 + 그리드 + 필터 + 검색

### 목표
102개 프로젝트를 Content Collections로 관리, 필터+검색 기능 구현.

### TODO
- [ ] `src/content/config.ts` 작성:
  - projects 컬렉션 스키마 정의
  - blog, testimonials 스키마 (빈 껍데기)
- [ ] 102개 프로젝트 마크다운 파일 생성 (`src/content/projects/`):
  - 현재 index.html에서 데이터 추출 스크립트 작성 (일회성)
  - 각 프로젝트: title, titleKo, description, category, techs, demoUrl, tag, order
- [ ] `src/components/projects/ProjectCard.astro`:
  - 썸네일 (스크린샷 있으면 이미지, 없으면 이모지+그라데이션 폴백)
  - 프로젝트 태그, 제목, 설명
  - 기술 배지
  - "자세히 보기" 링크
  - LIVE 배지 (LIVE 카테고리)
  - 위시켓 배지 (수주 카테고리)
- [ ] `src/components/projects/ProjectGrid.astro`:
  - 3열 그리드 (데스크톱), 2열 (태블릿), 1열 (모바일)
  - featured 카드는 2열 span
- [ ] `src/components/projects/ProjectFilter.astro`:
  - 카테고리 필터 버튼 (전체/LIVE/랜딩/앱SaaS/도구게임/수주)
  - 클라이언트 사이드 필터링 (JS island)
  - GSAP Flip으로 레이아웃 전환 애니메이션
- [ ] `src/components/projects/ProjectSearch.astro`:
  - 검색 입력창
  - 제목/설명/기술 태그로 검색
  - 디바운스 처리
- [ ] `src/components/home/ProjectsShowcase.astro`:
  - 메인 페이지용: 카테고리별 6개 미리보기 + "전체 보기" 링크
- [ ] `src/components/home/FeaturedProjects.astro`:
  - LIVE 서비스 3개 대형 카드 (메인 전용)
- [ ] `src/pages/projects/index.astro`:
  - 전체 프로젝트 목록 + 필터 + 검색
  - 페이지네이션 또는 무한 스크롤
- [ ] `src/pages/index.astro`에 FeaturedProjects + ProjectsShowcase 추가

### 완료 기준
- 102개 프로젝트가 Content Collections에서 정상 로딩
- 카테고리 필터 동작 (클라이언트 사이드)
- 검색으로 프로젝트 찾기 가능
- 프로젝트 카드 클릭 시 데모 또는 상세 페이지로 이동
- 빌드 시 타입 에러 없음

---

## Phase 5: 프로젝트 상세 페이지 (케이스 스터디)

### 목표
각 프로젝트의 상세 페이지 (문제-해결-성과 케이스 스터디 형식).

### TODO
- [ ] `src/pages/projects/[...slug].astro`:
  - Content Collection에서 프로젝트 데이터 fetch
  - 동적 라우팅
- [ ] `src/components/projects/CaseStudy.astro`:
  - 프로젝트 헤더: 제목 + 카테고리 + 기술 태그
  - 메인 스크린샷 (또는 데모 iframe)
  - 프로젝트 개요
  - 과제(Challenge) / 해결(Solution) / 성과(Result) 섹션
  - 스크린샷 갤러리 (라이트박스)
  - 기술 스택 상세
  - "데모 보기" 버튼 + "이전/다음 프로젝트" 네비게이션
- [ ] 주요 프로젝트 케이스 스터디 콘텐츠 작성 (우선 10개):
  - LIVE 3개: DriveX, 운전면허학원, SignTrack
  - 위시켓 4개: burumable, lawfirm, oms-erp, coupang
  - 대표 데모 3개: dashboard, saas-landing, productivity-app
- [ ] 나머지 프로젝트: 자동 생성 템플릿 (기본 정보 + 데모 링크)
- [ ] 이전/다음 프로젝트 네비게이션
- [ ] 관련 프로젝트 추천 (같은 카테고리)

### 완료 기준
- `/projects/drivex` 등 상세 페이지 정상 렌더링
- 케이스 스터디 형식: 개요, 과제, 해결, 성과 섹션 표시
- 데모 링크 클릭 시 데모 정상 동작
- 이전/다음 네비게이션 동작

---

## Phase 6: 고객 후기 + 블로그 + 회사 소개

### 목표
신뢰 구축을 위한 부가 콘텐츠 페이지.

### TODO
- [ ] **고객 후기**:
  - `src/content/testimonials/` 에 후기 데이터 (최소 3개, 위시켓 리뷰 기반)
  - `src/components/home/Testimonials.astro`: 캐러셀 (자동 슬라이드)
  - `src/pages/testimonials.astro`: 전체 후기 목록
  - 별점 + 클라이언트명 + 프로젝트명 + 코멘트
- [ ] **블로그**:
  - `src/content/blog/` 에 시드 글 2~3개:
    - "ONESTEP의 개발 프로세스"
    - "102개 프로젝트에서 배운 것"
    - "합리적인 가격의 비밀"
  - `src/components/blog/BlogCard.astro`: 블로그 카드
  - `src/components/blog/BlogList.astro`: 목록
  - `src/components/home/BlogPreview.astro`: 메인용 최근 3개
  - `src/pages/blog/index.astro`: 블로그 목록
  - `src/pages/blog/[...slug].astro`: 블로그 상세
  - `src/layouts/BlogLayout.astro`: 블로그 전용 레이아웃 (ToC, 읽기 시간)
- [ ] **회사 소개**:
  - `src/pages/about.astro`:
    - ONESTEP 스토리 (왜 시작했는지)
    - 비전 / 미션
    - 숫자로 보는 실적 (102개, 11건, 3개 LIVE)
    - 작업 방식 설명
    - CTA (문의하기)
- [ ] 메인 페이지에 Testimonials + BlogPreview 컴포넌트 추가

### 완료 기준
- `/about` 페이지 정상 렌더링, 회사 정보 포함
- `/blog` 목록에 글 2~3개 표시
- `/blog/[slug]` 상세 글 정상 렌더링 (마크다운 → HTML)
- `/testimonials` 후기 목록 표시
- 메인 페이지에 후기 캐러셀 + 블로그 미리보기 표시

---

## Phase 7: 문의 폼 + SEO + OG + 다국어 기반

### 목표
실용 인프라: 문의, 검색 엔진 최적화, 다국어 기반.

### TODO
- [ ] **문의 폼**:
  - `src/pages/contact.astro`:
    - 현재 contact.html 디자인 계승
    - 이름, 이메일, 프로젝트 유형 (드롭다운), 예산 범위, 메시지
    - 폼 제출: Cloudflare Pages Forms 또는 Formspree 또는 이메일 API
    - 성공/실패 피드백
  - 메인 CTA 섹션에서 /contact로 링크
- [ ] **SEO**:
  - `src/components/common/SEO.astro` 완성:
    - 페이지별 title, description, og:image
    - JSON-LD: Organization, WebSite, BreadcrumbList
    - 프로젝트 상세: JSON-LD SoftwareApplication
  - `@astrojs/sitemap` 설정 → sitemap.xml 자동 생성
  - `public/robots.txt` 작성
  - Canonical URL 설정
- [ ] **OG 이미지**:
  - 메인 OG 이미지 (1200x630) 제작
  - 프로젝트별 OG 이미지: 스크린샷 기반 자동 생성 또는 템플릿
- [ ] **다국어 기반**:
  - `src/i18n/ko.json`: 모든 UI 텍스트 한국어
  - `src/i18n/en.json`: UI 텍스트 영어 번역
  - `src/utils/i18n.ts`: 번역 함수 (`t('hero.title')`)
  - `astro.config.mjs` i18n 설정: `defaultLocale: 'ko'`, `locales: ['ko', 'en']`
  - `src/components/common/LanguageSwitcher.astro`: KO/EN 토글
  - 1차 릴리스: 한국어 완전 + 영어 UI만 (콘텐츠는 후속)

### 완료 기준
- `/contact` 폼 제출 시 이메일 수신 또는 서비스 연동 확인
- Lighthouse SEO 점수 95+
- `sitemap.xml`, `robots.txt` 정상 생성
- 각 페이지 OG 메타 태그 확인 (og:title, og:description, og:image)
- 영어 UI 전환 시 메뉴/버튼 텍스트 영어로 표시

---

## Phase 8: 스크린샷 자동 캡처 + 이미지 최적화

### 목표
102개 데모의 실제 스크린샷 캡처, 이미지 최적화.

### TODO
- [ ] `scripts/capture-screenshots.ts` 작성:
  - Puppeteer로 각 데모 URL 접근
  - 뷰포트: 1280x800 (풀), 400x250 (썸네일)
  - WebP 형식 저장
  - 실패 시 로그 + 폴백 처리
  - 병렬 처리 (5개씩 동시)
- [ ] 스크린샷 저장 구조:
  - `public/screenshots/full/{project-slug}.webp`
  - `public/screenshots/thumbs/{project-slug}.webp`
- [ ] Content Collections 프로젝트 데이터에 screenshot 경로 업데이트
- [ ] ProjectCard 컴포넌트:
  - screenshot 있으면 `<img>` 표시
  - 없으면 기존 이모지+그라데이션 폴백
- [ ] 이미지 최적화:
  - Astro `<Image>` 컴포넌트 활용 (자동 리사이즈, WebP 변환)
  - lazy loading (`loading="lazy"`)
  - 적절한 width/height 지정 (CLS 방지)
- [ ] OG 이미지 자동 생성 스크립트 (스크린샷 + 타이틀 오버레이)

### 완료 기준
- 최소 90개 이상 프로젝트 스크린샷 캡처 성공
- 썸네일 이미지가 프로젝트 카드에 정상 표시
- 풀사이즈 이미지가 상세 페이지에 표시
- 전체 이미지 용량: 프로젝트당 썸네일 30KB 이하, 풀 150KB 이하

---

## Phase 9: GSAP 애니메이션 + 마이크로 인터랙션

### 목표
프리미엄 느낌의 애니메이션과 인터랙션 추가.

### TODO
- [ ] GSAP + ScrollTrigger 설치 및 설정
- [ ] `src/scripts/gsap-animations.ts`:
  - Hero 텍스트 스플릿 애니메이션 (글자별 등장)
  - 섹션별 ScrollTrigger 등장 (fade + slide)
  - Stats Bar 카운트업 (GSAP 기반)
  - 프로젝트 카드 stagger 등장
  - Process 타임라인 순차 등장
- [ ] 마이크로 인터랙션:
  - 버튼 hover: scale + shadow 변화
  - 카드 hover: 미세한 3D tilt (CSS perspective)
  - 네비게이션: 스크롤 시 배경 blur 변화
  - 페이지 전환: View Transitions (Astro 네이티브)
- [ ] 스크롤 인디케이터: Hero에 아래로 스크롤 유도 화살표
- [ ] 필터 전환: GSAP Flip (카드 레이아웃 변경 시 부드러운 전환)
- [ ] 성능 최적화:
  - `client:visible` 로 GSAP 코드 지연 로딩
  - 모바일에서 무거운 애니메이션 비활성화 (`matchMedia`)
  - `will-change` 최소한 사용
- [ ] `prefers-reduced-motion` 대응: 시스템 설정 존중

### 완료 기준
- Hero 진입 시 텍스트 애니메이션 재생
- 스크롤 시 각 섹션 부드럽게 등장
- 필터 전환 시 카드 레이아웃 애니메이션
- 모바일에서도 자연스럽게 동작 (과도한 애니메이션 없음)
- `prefers-reduced-motion` 설정 시 애니메이션 비활성화
- Lighthouse Performance 90+

---

## Phase 10: 최종 QA + 배포

### 목표
전체 사이트 품질 검증 후 프로덕션 배포.

### TODO
- [ ] **크로스 브라우저 테스트**:
  - Chrome, Firefox, Safari, Edge
  - iOS Safari, Android Chrome
- [ ] **반응형 테스트**:
  - 1920x1080 (데스크톱)
  - 1280x720 (노트북)
  - 768x1024 (태블릿)
  - 375x667 (모바일)
- [ ] **성능 최적화**:
  - Lighthouse Performance 90+ (모든 페이지)
  - Lighthouse Accessibility 95+
  - Lighthouse SEO 95+
  - Lighthouse Best Practices 95+
  - Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] **기능 테스트**:
  - 모든 내비게이션 링크 정상 동작
  - 프로젝트 필터 + 검색 정상
  - 데모 링크 (102개) 정상 접근
  - 문의 폼 제출 정상
  - 언어 전환 정상
  - 이메일 복사 기능
- [ ] **SEO 검증**:
  - 모든 페이지 메타 태그 확인
  - sitemap.xml 모든 페이지 포함 확인
  - robots.txt 정상
  - JSON-LD 구조화 데이터 검증 (Google Rich Results Test)
  - OG 이미지 미리보기 (Facebook Sharing Debugger)
- [ ] **콘텐츠 검수**:
  - 오탈자 검수
  - 이미지 깨짐 확인
  - 빈 페이지 없는지 확인
- [ ] **최종 배포**:
  - `main` 브랜치 push → Cloudflare Pages 자동 배포
  - 배포 후 프로덕션 URL에서 전체 확인
  - 기존 데모 URL 호환성 최종 확인
- [ ] **모니터링 설정**:
  - Cloudflare Web Analytics 활성화
  - Google Search Console 등록

### 완료 기준
- Lighthouse 전 항목 90+
- 모든 페이지 에러 없이 렌더링
- 기존 데모 URL 100% 호환
- 프로덕션 배포 완료 및 정상 동작 확인

---

## Phase 간 의존성

```
Phase 1 (셋업) ──→ Phase 2 (레이아웃) ──→ Phase 3 (메인 섹션)
                                              │
                                              ├──→ Phase 4 (프로젝트 컬렉션)──→ Phase 5 (상세)
                                              │
                                              └──→ Phase 6 (후기/블로그/소개)
                                                        │
Phase 7 (SEO/다국어) ←───────────────────────────────────┘
        │
        ├──→ Phase 8 (스크린샷) ← Phase 4 완료 필요
        │
        └──→ Phase 9 (애니메이션) ← Phase 3~6 완료 필요
                    │
                    └──→ Phase 10 (QA + 배포)
```

### 병렬 실행 가능
- Phase 4 + Phase 6 (프로젝트 컬렉션과 블로그/후기는 독립)
- Phase 7 + Phase 8 (SEO와 스크린샷은 독립)
- Phase 8 + Phase 9 (스크린샷과 애니메이션은 독립)
