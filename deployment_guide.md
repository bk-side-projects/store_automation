# Deployment Guide

## 1. 개요

이 문서는 Next.js 애플리케이션의 Firebase App Hosting 배포 과정에서 발생하는 문제를 해결하고, 안정적인 배포 환경을 구축하기 위한 가이드입니다. 반복되는 빌드 실패의 원인을 기록하고 해결 과정을 추적하여, 향후 유사한 문제 발생 시 빠르고 효율적으로 대응하는 것을 목표로 합니다.

## 2. 배포 이력 및 문제 분석

### 시도 1: `eslint` 버전 호환성 문제 해결

- **현상:** App Hosting 배포 시 빌드 과정에서 `eslint` 관련 오류 발생
- **조치:**
    1. `eslint.config.mjs` 파일 삭제
    2. `package.json`의 `devDependencies`에서 `eslint` 및 관련 패키지 버전 조정
- **결과:** **실패**. 동일한 빌드 오류가 지속적으로 발생했습니다.
- **분석:** 단순한 `eslint` 버전 충돌이 아닌, 다른 의존성 문제 또는 App Hosting 환경과의 근본적인 비호환성 문제일 가능성이 있습니다.

### 시도 2: `devDependencies` 충돌 가능성 확인

- **현상:** 빌드 실패 문제가 `devDependencies`에 포함된 패키지들의 충돌일 수 있다는 가정하에 진행
- **조치:**
    1. `package.json` 파일에서 `devDependencies` 섹션 전체 제거
- **결과:** **실패**. `devDependencies`를 제거하자, 빌드에 필수적인 다른 패키지(예: `typescript`, `tailwindcss` 등)를 찾지 못해 새로운 빌드 오류가 발생했습니다.
- **분석:** `devDependencies`는 개발 단계뿐만 아니라 Next.js의 프로덕션 빌드 과정에서도 필요한 경우가 많습니다. 특히 `typescript` 컴파일, `tailwindcss` 빌드 등에 필수적인 의존성을 포함하고 있으므로, 무조건 제거하는 것은 올바른 해결책이 아닙니다.

### 시도 3: 서버/클라이언트 환경 변수 설정 오류 (`auth/invalid-api-key`)

- **현상:** `/_not-found` 페이지 사전 렌더링 중 `auth/invalid-api-key` 오류 발생.
- **분석:** 이 오류는 **서버 사이드 렌더링(SSR) 과정에서 클라이언트용 Firebase 설정을 사용하려고 할 때** 발생합니다. 빌드 프로세스는 서버 환경에서 실행되는데, 이때 클라이언트(브라우저)에서만 사용해야 하는 `NEXT_PUBLIC_` 접두사가 붙은 환경 변수를 제대로 불러오지 못해 Firebase 초기화에 실패한 것입니다.
- **조치 1 (잘못된 시도):** `lib/firebase/client-provider.tsx`에서 `JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_WEBAPP_CONFIG!)` 코드를 사용하여 App Hosting이 제공하는 환경 변수를 직접 파싱하려고 시도.
- **결과 1:** **실패**. `SyntaxError: "undefined" is not valid JSON` 오류 발생. App Hosting 빌드 환경은 `FIREBASE_WEBAPP_CONFIG`라는 변수를 제공하지만, Next.js 클라이언트 코드에서 이를 인식하려면 `NEXT_PUBLIC_` 접두사가 필요합니다. 빌드 시점에는 `NEXT_PUBLIC_FIREBASE_WEBAPP_CONFIG` 변수가 존재하지 않으므로 `undefined`가 되어 JSON 파싱 오류로 이어진 것입니다.

## 3. 최종 해결 전략: `next.config.mjs`를 통한 환경 변수 주입

위 모든 실패를 통해 얻은 교훈은 **Firebase App Hosting의 빌드 환경과 Next.js의 환경 변수 처리 방식에 대한 정확한 이해가 필수적**이라는 것입니다.

- **근본 원인:** Firebase App Hosting은 빌드 시 `FIREBASE_WEBAPP_CONFIG` 환경 변수를 제공하지만, Next.js는 보안 정책상 `NEXT_PUBLIC_` 접두사가 없는 환경 변수를 클라이언트 코드에 노출하지 않습니다.

- **최종 해결책:** `next.config.mjs` 파일을 수정하여, 빌드 시점에 App Hosting이 제공하는 `FIREBASE_WEBAPP_CONFIG` 환경 변수의 값을 Next.js가 클라이언트에서 인식할 수 있는 `NEXT_PUBLIC_FIREBASE_WEBAPP_CONFIG` 변수로 복사(주입)해줍니다.

  ```javascript
  // next.config.mjs
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    env: {
      NEXT_PUBLIC_FIREBASE_WEBAPP_CONFIG: process.env.FIREBASE_WEBAPP_CONFIG,
    },
  };
  
  export default nextConfig;
  ```

- **클라이언트 측 코드:** 위 설정이 완료되면, 클라이언트 컴포넌트(`lib/firebase/client-provider.tsx`)에서는 `process.env.NEXT_PUBLIC_FIREBASE_WEBAPP_CONFIG`를 안전하게 사용하여 Firebase를 초기화할 수 있습니다.

  ```typescript
  // lib/firebase/client-provider.tsx
  const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_WEBAPP_CONFIG!);
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  ```

## 4. 향후 배포 시 체크리스트

1.  **환경 변수:** Firebase 관련 클라이언트 측 환경 변수는 반드시 `next.config.mjs`의 `env` 설정을 통해 주입해야 합니다.
2.  **로컬 빌드:** 배포 전, 항상 `npm run build` 명령으로 로컬에서 프로덕션 빌드가 성공하는지 확인합니다.
3.  **의존성 관리:** `package.json`과 `package-lock.json`의 일관성을 유지하고, 불필요한 의존성은 제거합니다.
