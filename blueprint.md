
# Project Blueprint

## Ⅰ. Application Overview

- **Purpose:** Role-based access control (RBAC)을 갖춘 Next.js 애플리케이션입니다.
- **Features:**
    - 사용자 회원가입 및 로그인
    - Firebase 인증 및 Firestore를 사용한 사용자 역할 관리
    - 역할(master/일반 사용자)에 따른 페이지 접근 제어
- **Tech Stack:**
    - Next.js (App Router)
    - Firebase (Authentication, Firestore, App Hosting)
    - TypeScript
    - Tailwind CSS

## Ⅱ. Design and Style

- **Layout:** 중앙 정렬된 깔끔하고 현대적인 UI
- **Components:**
    - `AppLayout`: 전체 페이지의 기본 레이아웃
    - `Header`: 로고와 사용자 정보 (로그인/로그아웃 버튼) 표시
    - `AuthProvider`: Firebase 인증 상태 관리
    - `RoleBasedGuard`: 역할에 따른 접근 제어
- **Styling:**
    - `globals.css` 및 `tailwind.config.ts`를 사용한 전역 스타일 및 테마
    - 컴포넌트별로 모듈화된 CSS 스타일

## Ⅲ. Current Status (작업 현황)

- **Last Action:** App Hosting 배포 과정에서 반복적인 빌드 실패를 겪고 있습니다. 이전 시도들이 모두 빌드 단계에서 실패함에 따라, 의존성 문제일 가능성에 무게를 두고 있습니다.
- **Goal:** App Hosting 배포를 성공적으로 완료하고, 애플리케이션이 정상적으로 동작하도록 하는 것입니다.

## Ⅳ. Next Steps (다음 진행 계획)

**배포 실패 해결 전략: 의존성 재설치**

1.  **`blueprint.md` 업데이트:** 새로운 해결 전략을 `blueprint.md`에 기록합니다. (완료)
2.  **기존 의존성 삭제:** `node_modules` 폴더와 `package-lock.json` 파일을 삭제하여 기존 의존성을 완전히 제거합니다.
3.  **의존성 재설치:** `npm install` 명령어를 실행하여 모든 의존성을 새로 설치합니다.
4.  **로컬 빌드 테스트:** `npm run build` 명령어를 실행하여 로컬 환경에서 앱이 정상적으로 빌드되는지 확인합니다.
5.  **재배포:** 로컬 빌드가 성공하면, Firebase App Hosting에 다시 배포를 시도합니다.

## Ⅴ. Deployment History (배포 이력)

- **시도 1:** `eslint` 버전 호환성 문제 해결 시도
    - `eslint.config.mjs` 삭제 및 `package.json`의 `devDependencies` 버전 조정
    - 결과: 실패 (앱 빌드 오류)
- **시도 2:** `devDependencies` 충돌 가능성 확인
    - `package.json`에서 `devDependencies` 완전 제거
    - 결과: 실패 (앱 빌드 오류)
- **시도 3:** `firebase.json` 설정 오류 수정
    - `apphosting` 설정을 배열에서 객체로 변경하고, `ignore` 속성 추가
    - 결과: 실패 (앱 빌드 오류)
- **시도 4:** 의존성 완전 재설치
    - `node_modules`, `package-lock.json` 삭제 후 `npm install` 실행
    - 결과: **진행 중**

## Ⅵ. Firebase App Hosting Configuration

- **`firebase.json`:**
```json
{
  "apphosting": {
    "backendId": "ageseafood",
    "source": ".",
    "region": "asia-east1",
    "allow-unauthenticated": true,
    "alwaysDeployFromSource": true,
    "ignore": [
      "firebase.json",
      ".firebase/**",
      ".firebaserc",
      "node_modules",
      ".next/cache"
    ]
  },
  "firestore": {
    "database": "(default)",
    "location": "nam5",
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  }
}
```
