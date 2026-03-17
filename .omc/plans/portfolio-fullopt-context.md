# ONESTEP 포트폴리오 풀옵션 맥락노트

> 작성일: 2026-03-17
> 프로젝트: portfolio-fullopt
> 용도: 기술 결정, 제약조건, 참고자료 기록

---

## 1. 기술 결정 근거

### Astro를 선택한 이유
- **콘텐츠 중심 사이트에 최적**: 포트폴리오는 정적 콘텐츠가 주력. Astro는 콘텐츠 사이트에 특화.
- **제로 JS 기본**: 빌드 시 HTML/CSS만 출력, 필요한 컴포넌트만 클라이언트 하이드레이션. 102개 프로젝트 데이터를 빌드 타임에 처리하므로 런타임 부담 0.
- **Content Collections**: 102개 프로젝트 데이터를 마크다운/YAML로 관리. 타입 안전성, 빌드 타임 검증. 프로젝트 추가 시 MD 파일 하나만 추가.
- **View Transitions**: Astro 네이티브 View Transitions API로 SPA 같은 페이지 전환. 별도 라우터 불필요.
- **Islands Architecture**: GSAP 애니메이션, 필터, 검색 등 인터랙티브 부분만 선택적 하이드레이션.
- **Cloudflare Pages 완벽 호환**: 정적 빌드 출력, 어댑터 없이 바로 배포.

### Tailwind CSS를 선택한 이유
- **유틸리티 우선**: 현재 index.html의 인라인 스타일이 매우 많음 (`style="background:linear-gradient..."` 패턴 반복). Tailwind로 일관된 유틸리티 클래스 사용.
- **디자인 토큰 통합**: 현재 CSS 변수 (`--bg`, `--primary` 등)를 `tailwind.config.mjs`의 `theme.extend`에 매핑. 일관성 보장.
- **퍼지 빌드**: 사용한 클래스만 빌드에 포함. 최종 CSS 크기 최소화.
- **다크 테마 기본**: `darkMode: 'class'`로 설정하되, 현재 사이트가 다크 온리이므로 기본 상태가 다크.

### GSAP를 선택한 이유
- **현재 사이트의 애니메이션 확장**: 현재 IntersectionObserver + CSS transition 조합 사용 중. GSAP ScrollTrigger로 더 정밀하고 복잡한 스크롤 기반 애니메이션 가능.
- **성능**: requestAnimationFrame 기반, GPU 가속. Canvas 파티클보다 가벼움.
- **생태계**: ScrollTrigger, SplitText, Flip 등 플러그인으로 프리미엄 인터랙션 구현.
- **Astro 호환**: `client:visible` 또는 `client:idle`로 필요할 때만 로드.

### TypeScript
- Content Collections 스키마 타입 안전성
- 컴포넌트 props 타입 검증
- IDE 자동완성

---

## 2. 제약조건

### 배포 환경
- **Cloudflare Pages**: 정적 사이트만 가능 (SSR 필요 시 Cloudflare Workers 어댑터 필요하나 불필요)
- **빌드 제한**: Cloudflare Pages 빌드 메모리 제한 있음. 102개 데모를 public/에 포함하면 빌드 시 복사 시간 증가하나 문제는 아님.
- **파일 크기 제한**: 단일 파일 25MB. 스크린샷 최적화 필수.
- **도메인**: `portfolio-2p4.pages.dev` (현재). 커스텀 도메인 연결 가능.

### 기존 URL 유지
- 현재 `/{project-name}/index.html` 패턴으로 102개 데모 접근 가능
- Astro 전환 후에도 이 URL들이 깨지면 안 됨
- **해결**: 데모 폴더를 `public/` 루트에 그대로 유지하면 Astro가 빌드 시 자동 복사

### 기존 외부 링크
- LIVE 서비스 URL (외부): `drivex-4kh.pages.dev`, Railway 앱, `signtrack.net`
- 위시켓 수주 프로젝트 중 일부는 데모 링크 없음 (`cursor:default` 처리)

### GitHub
- 리포: `wogns5486-design/portfolio`
- `.github/workflows/deploy.yml` 존재 (Cloudflare Pages 배포 자동화)

### 폰트
- 현재: Google Fonts CDN에서 Inter 로딩
- 변경: 셀프호스팅으로 전환 (FOUT 방지, 성능)

---

## 3. 현재 사이트 구조 상세

### HTML 구조 (index.html, 3,577줄)
```
[1-12]     <head> 메타, OG, 폰트
[13-1100]  <style> CSS 전체 (인라인)
[1100-1500] Hero + Stats + Why ONESTEP 섹션
[1500-1620] Tech Stack + Process 섹션
[1620-3395] Projects Grid (102개 카드 하드코딩)
[3395-3410] Footer + CTA
[3411-3577] <script> JS (필터, 스크롤 애니메이션, 카운트업, 패럴랙스)
```

### CSS 변수 (계승 필수)
```css
--bg: #0B1120;
--bg-deep: #070D1A;
--surface: #111827;
--surface-light: #1E293B;
--border: rgba(148,163,184,0.08);
--border-light: rgba(148,163,184,0.12);
--text: #F1F5F9;
--text-sub: #94A3B8;
--text-muted: #64748B;
--primary: #818CF8;
--primary-deep: #6366F1;
--accent: #6366F1;
--live: #34D399;
--live-bg: rgba(52,211,153,0.1);
--live-border: rgba(52,211,153,0.25);
--gold-glow: rgba(245,158,11,0.15);
--gold-border: rgba(245,158,11,0.3);
```

### 디자인 토큰 Tailwind 매핑
```javascript
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#0B1120', deep: '#070D1A' },
        surface: { DEFAULT: '#111827', light: '#1E293B' },
        primary: { DEFAULT: '#818CF8', deep: '#6366F1' },
        live: '#34D399',
        'text-main': '#F1F5F9',
        'text-sub': '#94A3B8',
        'text-muted': '#64748B',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
      },
    },
  },
};
```

### 현재 애니메이션 패턴 (계승 및 확장)
| 패턴 | 현재 구현 | GSAP 확장 |
|------|----------|----------|
| 카드 등장 | IntersectionObserver + CSS opacity/translate | ScrollTrigger + stagger |
| 카운트업 | requestAnimationFrame 커스텀 | gsap.to + 커스텀 onUpdate |
| 호버 | CSS transition (translateY, scale, shadow) | 유지 (CSS가 더 효율적) |
| 패럴랙스 | scroll event + translate3d | ScrollTrigger parallax |
| 필터 | class toggle (hidden/visible) | Flip 플러그인 (레이아웃 애니메이션) |

---

## 4. 프로젝트 카테고리 체계

### 현재 카테고리
| ID | 이름 | 설명 | 개수 |
|----|------|------|------|
| `live` | LIVE | 실제 운영 중인 서비스 | 3 |
| `wishket` | 수주 프로젝트 | 위시켓 플랫폼 수주 | 11 |
| `landing` | 랜딩페이지 | 기업/서비스 랜딩 | ~20 |
| `app` | 앱/SaaS | 웹앱, 대시보드, 플랫폼 | ~50 |
| `tool` | 도구/게임 | 유틸리티, 게임 | ~18 |

### 세분화 제안 (프로젝트 상세에서 활용)
현재 5개 카테고리는 메인 필터로 유지하되, 상세 페이지와 검색에서 사용할 **서브 태그** 추가:

| 서브 태그 | 예시 프로젝트 |
|-----------|-------------|
| E-Commerce | shop-landing, farm-shop, wine-shop, flower-shop |
| Healthcare | clinic, hospital, vet-clinic, pet-care |
| Real Estate | realestate, realestate-app, realestate-landing |
| Education | academy, school-lms, edu-platform |
| Finance | finance-app, crypto-dash, stock-portfolio, calculator |
| Productivity | productivity-app, kanban, todo-pomodoro, notes-app |
| Food & Beverage | food-order, cafe-landing, bakery, recipe |
| Social | social-feed, messenger, ai-chat |
| Booking | booking, hair-salon, yoga, hotel |
| Management | car-manage, logistics, pos-system, attendance |
| Creative | photo-editor, gallery, mindmap, whiteboard |
| Entertainment | typing-game, mbti, tarot, music-player |

### 프로젝트별 기술 태그 (현재 데이터에서 추출)
대부분의 데모가 사용하는 기술: `HTML`, `CSS`, `JavaScript`, `Canvas`
LIVE/위시켓 프로젝트: `React`, `Next.js`, `Node.js`, `MongoDB`, `PostgreSQL` 등

---

## 5. 참고자료

### 디자인 레퍼런스 톤
- 현재 사이트: 다크 SaaS 랜딩 스타일 (Linear, Vercel, Raycast 계열)
- 도트 그리드 배경 + 블러 오브 + 그래디언트 텍스트
- 카드: 미묘한 보더 + 호버 글로우
- 전체적으로 "차분한 고급스러움" (not flashy)

### 벤치마크 사이트
- linear.app — 다크 테마, 부드러운 애니메이션
- vercel.com — 미니멀, 빠른 로드
- raycast.com — 그래디언트 + 글래스모피즘
- stripe.com/customers — 케이스 스터디 구조

### 이메일
- wogns5486@gmail.com (문의용)

### LIVE 서비스 URL
- DriveX: https://drivex-4kh.pages.dev/
- 운전면허 학원: https://web-production-ac42f4.up.railway.app
- SignTrack: https://signtrack.net/

### 위시켓 수주 (데모 있는 것)
- wishket-burumable/index.html
- wishket-lawfirm/index.html
- wishket-oms-erp/index.html
- wishket-coupang/index.html

---

## 6. 리스크 및 주의사항

| 리스크 | 영향 | 대응 |
|--------|------|------|
| 102개 데모 public/ 복사로 빌드 시간 증가 | 빌드 느려짐 | Cloudflare Pages는 정적 파일 복사이므로 수분 내 완료. 허용 범위. |
| 스크린샷 캡처 실패 (일부 데모) | 빈 썸네일 | 실패 시 현재의 이모지+그라데이션 폴백 유지 |
| GSAP 번들 크기 | 성능 저하 | Tree-shaking + 동적 import. ScrollTrigger만 선별 로딩. |
| 다국어 콘텐츠 부족 | 영어 페이지 빈약 | 1차 릴리스는 한국어 전용, 영어는 UI 텍스트만 번역. 콘텐츠는 점진적. |
| Cloudflare Pages `_redirects` 제한 | 리다이렉트 수 초과 | 데모를 public/ 루트에 유지하면 리다이렉트 불필요. |

---

## 7. 의존성 목록 (예상)

### 핵심
```json
{
  "astro": "^5.x",
  "@astrojs/tailwind": "^6.x",
  "tailwindcss": "^4.x",
  "typescript": "^5.x"
}
```

### 애니메이션
```json
{
  "gsap": "^3.12",
  "@gsap/scrolltrigger": "latest"
}
```

### 유틸리티
```json
{
  "@astrojs/sitemap": "latest",
  "astro-seo": "latest",
  "sharp": "latest"
}
```

### 개발 도구
```json
{
  "puppeteer": "^24.x",
  "prettier": "latest",
  "prettier-plugin-astro": "latest",
  "prettier-plugin-tailwindcss": "latest"
}
```
