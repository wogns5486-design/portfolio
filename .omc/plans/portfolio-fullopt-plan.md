# ONESTEP 포트폴리오 풀옵션 계획서

> 작성일: 2026-03-17
> 프로젝트: portfolio-fullopt
> 목적: 직접 영업용 프리미엄 포트폴리오 사이트 (브랜딩 + 케이스 스터디 + 신뢰 구축)

---

## 1. 현황 분석

### 현재 사이트
- **구조**: 단일 `index.html` (186KB, 3,577줄) + `contact.html` + 101개 데모 폴더
- **배포**: Cloudflare Pages (`portfolio-2p4.pages.dev`)
- **디자인**: 다크 테마 (navy `#0B1120`), Inter 폰트, 인디고 계열 악센트 (`#818CF8` / `#6366F1`)
- **기능**: 카테고리 필터 (전체/LIVE/랜딩/앱SaaS/도구게임/수주), IntersectionObserver 스크롤 애니메이션, 카운트업, 패럴랙스
- **섹션**: Hero > Stats Bar > Why ONESTEP > Tech Stack > Process > Projects Grid > CTA > Footer

### 프로젝트 카테고리 (현재)
| 카테고리 | 수량 | 설명 |
|---------|------|------|
| live | 3 | DriveX, 운전면허(Railway), SignTrack |
| wishket | 11 | 위시켓 수주 프로젝트 (일부 링크 없음) |
| landing | ~20 | 랜딩페이지류 |
| app | ~50 | 앱/SaaS류 |
| tool | ~18 | 도구/게임류 |

### 부족한 점 (풀옵션으로 채울 것)
- 실제 스크린샷 없음 (이모지 + CSS 그라데이션 썸네일)
- 케이스 스터디 / 프로젝트 상세 페이지 없음
- 고객 후기 없음
- 블로그 / 콘텐츠 없음
- 회사 소개 페이지 없음
- 검색 기능 없음
- 다국어 없음 (한국어 단일)
- SEO / OG 이미지 최소 수준
- 단일 HTML이라 유지보수 곤란

---

## 2. 전체 구조 (사이트맵)

```
/                          메인 (Hero + Stats + Why + Tech + Process + Projects Grid + CTA)
/about                     회사 소개 (ONESTEP 스토리, 팀, 비전)
/projects                  프로젝트 전체 목록 (검색 + 필터 + 페이지네이션)
/projects/[slug]           프로젝트 상세 (케이스 스터디)
/blog                      블로그 목록
/blog/[slug]               블로그 글
/testimonials              고객 후기
/contact                   문의 폼
/[lang]/...                다국어 라우팅 (ko 기본, en 추가)
```

### 메인 페이지 섹션 구성 (확장)
1. **Navigation** - 스티키 헤더, 로고, 메뉴, 언어 전환, CTA 버튼
2. **Hero** - 타이틀 + 서브카피 + CTA + 배경 애니메이션 (GSAP)
3. **Stats Bar** - 102+ 프로젝트 / Full 커스텀 / 3 LIVE 서비스 / 위시켓 11건
4. **Featured Projects** - LIVE 서비스 3개 대형 카드 (스크린샷 + 간략 설명)
5. **Why ONESTEP** - 차별점 4가지 (가격, 올인원, 실력, 속도)
6. **Projects Showcase** - 카테고리별 6개씩 미리보기 + "전체 보기" 링크
7. **Tech Stack** - 기술 스택 (아이콘 기반)
8. **Process** - 작업 프로세스 4단계 (타임라인 형식)
9. **Testimonials** - 고객 후기 캐러셀
10. **Blog Preview** - 최근 글 3개
11. **CTA** - 프로젝트 문의하기
12. **Footer** - 네비게이션, 소셜, 저작권

---

## 3. Astro 프로젝트 구조

```
portfolio/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   ├── demos/                    # 기존 102개 데모 프로젝트 (그대로 이전)
│   │   ├── academy/
│   │   ├── ai-chat/
│   │   ├── ...
│   │   └── youtube-auto/
│   ├── screenshots/              # 프로젝트 스크린샷 (자동 캡처)
│   │   ├── thumbs/               # 최적화된 썸네일 (400x250)
│   │   └── full/                 # 풀사이즈 (1280x800)
│   ├── og/                       # OG 이미지
│   ├── fonts/                    # Inter 셀프호스팅
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro      # HTML 뼈대 + 메타 + 다크테마
│   │   ├── PageLayout.astro      # Nav + Footer 포함 레이아웃
│   │   └── BlogLayout.astro      # 블로그 전용
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.astro      # 스티키 네비게이션
│   │   │   ├── Footer.astro
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── SectionHeader.astro
│   │   │   ├── SEO.astro         # 메타 태그 + OG + JSON-LD
│   │   │   └── LanguageSwitcher.astro
│   │   ├── home/
│   │   │   ├── Hero.astro
│   │   │   ├── StatsBar.astro
│   │   │   ├── FeaturedProjects.astro
│   │   │   ├── WhyOnestep.astro
│   │   │   ├── ProjectsShowcase.astro
│   │   │   ├── TechStack.astro
│   │   │   ├── Process.astro
│   │   │   ├── Testimonials.astro
│   │   │   ├── BlogPreview.astro
│   │   │   └── CTA.astro
│   │   ├── projects/
│   │   │   ├── ProjectGrid.astro
│   │   │   ├── ProjectCard.astro
│   │   │   ├── ProjectFilter.astro
│   │   │   ├── ProjectSearch.astro
│   │   │   └── CaseStudy.astro
│   │   └── blog/
│   │       ├── BlogCard.astro
│   │       └── BlogList.astro
│   ├── content/
│   │   ├── config.ts             # Content Collections 스키마
│   │   ├── projects/             # 프로젝트 데이터 (YAML/MD)
│   │   │   ├── drivex.md
│   │   │   ├── signtrack.md
│   │   │   ├── ...
│   │   │   └── youtube-auto.md
│   │   ├── blog/                 # 블로그 콘텐츠
│   │   │   └── first-post.md
│   │   └── testimonials/         # 고객 후기
│   │       └── client-1.md
│   ├── pages/
│   │   ├── index.astro           # 메인
│   │   ├── about.astro           # 회사 소개
│   │   ├── contact.astro         # 문의
│   │   ├── projects/
│   │   │   ├── index.astro       # 프로젝트 목록
│   │   │   └── [...slug].astro   # 프로젝트 상세
│   │   ├── blog/
│   │   │   ├── index.astro       # 블로그 목록
│   │   │   └── [...slug].astro   # 블로그 상세
│   │   └── testimonials.astro    # 고객 후기
│   ├── styles/
│   │   ├── global.css            # 기본 리셋 + CSS 변수 (현재 테마 계승)
│   │   └── animations.css        # GSAP 관련 기본 스타일
│   ├── scripts/
│   │   ├── gsap-animations.ts    # GSAP 애니메이션 모듈
│   │   └── project-filter.ts     # 클라이언트 사이드 필터/검색
│   ├── i18n/
│   │   ├── ko.json               # 한국어 (기본)
│   │   └── en.json               # 영어
│   └── utils/
│       ├── projects.ts           # 프로젝트 데이터 헬퍼
│       └── i18n.ts               # 다국어 유틸
├── scripts/
│   └── capture-screenshots.ts    # 스크린샷 자동 캡처 (Puppeteer)
└── .github/
    └── workflows/
        └── deploy.yml            # Cloudflare Pages 배포
```

---

## 4. 기존 데모 마이그레이션 전략

### 원칙: 기존 URL 깨뜨리지 않기

현재 데모들은 `/{project-name}/index.html` 경로로 접근됨.
(예: `portfolio-2p4.pages.dev/dashboard/index.html`)

**전략:**
1. 기존 102개 데모 폴더를 `public/demos/`로 통째로 복사
2. `public/` 루트에 리다이렉트 파일 배치 또는 `_redirects` 활용
3. Cloudflare Pages `_redirects` 파일로 이전 경로 호환:
   ```
   /academy/*    /demos/academy/:splat    301
   /ai-chat/*    /demos/ai-chat/:splat    301
   ...
   ```
4. 새로운 프로젝트 상세 페이지(`/projects/[slug]`)에서 데모 iframe 또는 외부 링크 제공

**대안 (더 심플):**
- `public/` 루트에 데모 폴더를 그대로 두면 Astro가 자동으로 서빙
- URL 변경 없음, 리다이렉트 불필요
- 단점: public/ 폴더가 거대해지지만, 빌드에 영향 없음 (정적 파일)

> **추천: 대안 채택** - 데모를 `public/` 루트에 그대로 유지. 가장 안전하고 단순.

---

## 5. 디자인 방향

### 기존 계승
- **다크 테마**: navy 배경 (`#0B1120`), 도트 그리드 패턴
- **컬러 팔레트**: 인디고 프라이머리 (`#818CF8` / `#6366F1`), 에메랄드 LIVE (`#34D399`)
- **타이포그래피**: Inter (300~900)
- **카드 스타일**: 둥근 모서리 (16px), 서피스 배경, 호버 효과

### 업그레이드
- **GSAP ScrollTrigger**: 섹션별 등장 애니메이션 (현재 IntersectionObserver를 GSAP으로 교체)
- **마이크로 인터랙션**: 버튼 hover/press, 카드 3D tilt, 커서 트레일
- **Hero 파티클**: Canvas 또는 GSAP으로 부유하는 오브 애니메이션
- **Smooth scroll**: Lenis 또는 Locomotive Scroll
- **실제 스크린샷 썸네일**: 이모지 대신 Puppeteer 캡처 이미지
- **프리미엄 트랜지션**: 페이지 전환 시 View Transitions API (Astro 네이티브 지원)
- **그래디언트 테두리**: 호버 시 카드 테두리에 그래디언트 glow

### 반응형 브레이크포인트
- Desktop: 1280px+
- Tablet: 768px ~ 1279px
- Mobile: ~767px

---

## 6. 프로젝트 데이터 관리 (Content Collections)

### 스키마 정의 (`src/content/config.ts`)
```typescript
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),                    // "DriveX"
    titleKo: z.string(),                  // "드라이브X — 중고차 플랫폼"
    description: z.string(),              // 한줄 설명
    category: z.enum(['live', 'landing', 'app', 'tool', 'wishket']),
    featured: z.boolean().default(false),
    liveUrl: z.string().url().optional(),  // LIVE 서비스 URL
    demoUrl: z.string().optional(),        // 데모 경로 (상대)
    screenshot: z.string().optional(),     // 스크린샷 경로
    techs: z.array(z.string()),           // ["React", "Node.js", "MongoDB"]
    tag: z.string(),                       // "Platform / Automotive"
    order: z.number().default(999),        // 정렬 순서
    // 케이스 스터디 필드
    client: z.string().optional(),         // 클라이언트명
    duration: z.string().optional(),       // "2주"
    challenge: z.string().optional(),      // 과제
    solution: z.string().optional(),       // 해결
    result: z.string().optional(),         // 성과
    screenshots: z.array(z.string()).default([]),  // 추가 스크린샷
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()).default([]),
    ogImage: z.string().optional(),
  }),
});

const testimonials = defineCollection({
  type: 'content',
  schema: z.object({
    client: z.string(),
    company: z.string().optional(),
    project: z.string(),
    rating: z.number().min(1).max(5),
    date: z.date(),
  }),
});

export const collections = { projects, blog, testimonials };
```

### 프로젝트 마크다운 예시
```markdown
---
title: "DriveX"
titleKo: "드라이브X — 중고차 플랫폼"
description: "중고차 검색, 필터, 가격 비교. 실제 운영 중인 LIVE 서비스."
category: "live"
featured: true
liveUrl: "https://drivex-4kh.pages.dev/"
screenshot: "/screenshots/thumbs/drivex.webp"
techs: ["React", "Tailwind", "Cloudflare Pages"]
tag: "Platform / Automotive"
order: 1
duration: "3주"
challenge: "복잡한 필터링과 대량 데이터 처리"
solution: "클라이언트 사이드 가상 스크롤 + 인덱싱"
result: "실서비스 운영 중, 페이지 로드 2초 이내"
screenshots: ["/screenshots/full/drivex-1.webp", "/screenshots/full/drivex-2.webp"]
---

## 프로젝트 개요

DriveX는 중고차 검색 및 비교 플랫폼입니다...

## 주요 기능

- 다중 조건 필터 (브랜드, 연식, 가격대, 주행거리)
- 가격 트렌드 차트
- 차량 비교 기능
...
```

---

## 7. 새로 추가할 페이지/섹션

| 페이지 | 설명 | 우선순위 |
|--------|------|---------|
| `/about` | 회사 소개, 비전, 원스텝의 차별점 심화 | P1 |
| `/projects` | 프로젝트 전체 목록 (검색 + 다중 필터 + 페이지네이션) | P1 |
| `/projects/[slug]` | 케이스 스터디 (문제-해결-성과, 스크린샷 갤러리) | P1 |
| `/contact` | 문의 폼 (Astro 버전, 기존 디자인 계승) | P1 |
| `/blog` | 기술 블로그 / 인사이트 | P2 |
| `/blog/[slug]` | 블로그 글 상세 | P2 |
| `/testimonials` | 고객 후기 전체 | P2 |

### 메인 페이지 신규 섹션
| 섹션 | 설명 |
|------|------|
| Navigation (스티키) | 로고 + 메뉴 + 언어 전환 + CTA |
| Featured Projects | LIVE 3개를 대형 카드로 (현재 grid에 섞여있음) |
| Testimonials 캐러셀 | 고객 후기 3~5개 슬라이드 |
| Blog Preview | 최근 블로그 3개 카드 |

---

## 8. SEO / 성능 전략

### SEO
- 페이지별 메타 태그 + OG 이미지 자동 생성
- JSON-LD 구조화 데이터 (Organization, WebSite, BreadcrumbList)
- sitemap.xml 자동 생성 (Astro 플러그인)
- robots.txt
- Canonical URL 설정

### 성능
- Astro 정적 빌드 (0 JS 기본, 필요한 곳만 클라이언트 하이드레이션)
- 이미지: WebP 변환 + Astro `<Image>` 컴포넌트 (자동 최적화)
- 폰트: Inter 셀프호스팅 + `font-display: swap`
- GSAP: 코드 스플리팅 (메인 번들에서 분리)
- Cloudflare CDN 캐싱

---

## 9. 다국어 전략

### 구조
- 기본 언어: 한국어 (`/`)
- 영어: `/en/`
- Astro의 i18n 라우팅 활용 (`astro.config.mjs`에서 설정)

### 구현
- UI 텍스트: `src/i18n/ko.json`, `src/i18n/en.json`
- 콘텐츠: 프로젝트/블로그는 한국어 우선, 영어는 점진적 추가
- 언어 전환: 헤더에 KO/EN 토글

---

## 10. 실행 Phase 요약

| Phase | 내용 | 예상 규모 |
|-------|------|----------|
| 1 | Astro 셋업 + 기존 데모 public/ 배치 + Cloudflare 배포 확인 | 기반 |
| 2 | BaseLayout + 다크 테마 + Tailwind + 컴포넌트 시스템 | 프레임 |
| 3 | 메인 페이지 섹션 (Hero~CTA) | 핵심 |
| 4 | Content Collections + 프로젝트 목록 + 필터 + 검색 | 핵심 |
| 5 | 프로젝트 상세 (케이스 스터디) | 핵심 |
| 6 | 고객 후기 + 블로그 + 회사 소개 | 부가 |
| 7 | 문의 폼 + SEO + OG + 다국어 기반 | 인프라 |
| 8 | 스크린샷 캡처 + 이미지 최적화 | 비주얼 |
| 9 | GSAP 애니메이션 + 마이크로 인터랙션 | 폴리시 |
| 10 | 최종 QA + 성능 최적화 + 배포 | 마무리 |
