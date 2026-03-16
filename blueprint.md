
# Ⅰ. Project Blueprint: Tongyeong Ajussi Susan (통영아재수산)

---

## Ⅰ. Overview (개요)

이 문서는 "통영아재수산"의 관리자용 웹 애플리케이션 개발을 위한 청사진입니다. AI 개발자는 이 문서를 바탕으로 프로젝트의 요구사항, 디자인, 아키텍처, 그리고 개발 단계를 파악하고 작업을 수행합니다. 이 문서는 프로젝트의 진행 상황에 따라 지속적으로 업데이트됩니다.

- **Project Goal:** "통영아재수산"의 운영 효율성을 높이기 위한 관리자용 대시보드 개발
- **Target Users:** 내부 직원 (사장님, 관리자 등)
- **Core Features:** 재고 관리, 주문 처리, 매출 통계, 사용자 관리 등

## Ⅱ. Design & Features (디자인 및 기능 명세)

### **Style & Design**

- **Color Palette:**
    - **Primary (Navy Blue):** `#003057` (브랜드의 신뢰와 전문성)
    - **Secondary (Soft Gray):** `#7A869A` (차분하고 세련된 느낌)
    - **Background:** `#FFFFFF` (깨끗하고 정돈된 바탕)
- **Logo:** "통영아재수산" 로고를 헤더 및 주요 인증 페이지에 적용하여 브랜드 아이덴티티를 강화합니다.
- **Layout:** 전체적으로 깔끔하고 직관적인 UI를 지향하며, 충분한 여백을 활용하여 사용성을 높입니다. 모바일 반응형 디자인을 적용하여 다양한 디바이스에서 최적의 경험을 제공합니다.

### **Core Features**

- **Authentication (인증):**
    - **Login:** 이메일이 아닌, 관리자가 발급한 고유 **ID**와 비밀번호를 사용하여 로그인합니다.
    - **Session Management:** 사용자가 로그인 상태를 안전하게 유지할 수 있도록 세션을 관리합니다.

## Ⅲ. Next Steps (다음 진행 계획)

**1. Theme Update & Login System Change (테마 적용 및 로그인 시스템 변경)**

- **Task:** 제공된 로고와 색상 가이드를 기반으로 애플리케이션의 전체적인 톤앤매너를 설정하고, 로그인 방식을 이메일에서 ID 체계로 변경합니다.
- **Detailed Plan:**
    1. **Tailwind CSS 설정:** `tailwind.config.ts` 파일에 새로운 브랜드 색상(`primary`, `secondary`)을 추가합니다.
    2. **로고 애셋 추가:** 로고 이미지 파일을 `/public/assets` 디렉토리에 추가하고, 애플리케이션에서 사용할 수 있도록 준비합니다.
    3. **레이아웃 업데이트:** `app/layout.tsx` 파일을 수정하여 전체 페이지에 새로운 배경색과 폰트 색상을 적용하고, 로고가 포함된 공통 헤더 컴포넌트를 추가합니다.
    4. **로그인 UI 변경:** `app/page.tsx` (로그인 페이지)를 수정하여, 입력 필드를 "이메일"에서 "아이디"로 변경하고 새로운 디자인 가이드를 적용합니다.
    5. **인증 로직 수정:**
        - Firestore에 `users` 컬렉션을 생성하여 `userId`와 `email`을 매핑하는 데이터를 저장할 준비를 합니다.
        - `lib/firebase/auth.ts` (또는 관련 인증 훅)의 로그인 함수를 수정합니다. 사용자가 입력한 ID를 기반으로 `users` 컬렉션에서 해당 유저의 이메일을 조회한 후, 조회된 이메일과 비밀번호를 사용하여 Firebase에 로그인을 요청하는 방식으로 변경합니다.

## Ⅳ. Deployment History (배포 이력)

- **시도 1 ~ 3:** `eslint` 버전, `devDependencies`, `firebase.json` 설정 오류 등으로 빌드 실패를 반복함.
- **최종 성공:** `next.config.mjs`에 `env` 설정을 추가하여, App Hosting의 `FIREBASE_WEBAPP_CONFIG` 환경 변수를 클라이언트에서 사용할 수 있도록 `NEXT_PUBLIC_FIREBASE_WEBAPP_CONFIG`로 주입하여 배포에 성공함.
- **교훈:** App Hosting 배포 시, 서버 환경 변수와 클라이언트 환경 변수의 처리 방식을 명확히 이해하고 `next.config.mjs`를 통해 전달해야 함.
