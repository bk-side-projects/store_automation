### Firebase App Hosting 배포 가이드

이 문서는 Next.js 애플리케이션을 Firebase App Hosting에 배포하는 과정에서 발생할 수 있는 주요 문제와 해결책을 안내합니다.

### **문제 상황: `auth/invalid-api-key` 빌드 오류**

로컬 환경(`npm run build`)에서는 성공적으로 빌드되지만, Firebase App Hosting을 통해 배포할 때 다음과 같은 `auth/invalid-api-key` 오류가 발생하며 빌드에 실패하는 경우가 있습니다.

```
Error [FirebaseError]: Firebase: Error (auth/invalid-api-key).
```

### **핵심 원인: 환경 변수 누락**

이 문제의 주된 원인은 **Firebase App Hosting의 빌드 서버가 Firebase 관련 환경 변수를 제대로 인식하지 못하기 때문**입니다. 로컬 개발 환경에서는 `.env.local` 파일에 정의된 환경 변수(`NEXT_PUBLIC_FIREBASE_*`)를 사용하여 Firebase 초기화가 정상적으로 이루어지지만, App Hosting의 빌드 환경에서는 이 파일이 존재하지 않아 API 키를 찾지 못하고 인증 오류가 발생하는 것입니다.

App Hosting은 배포 시 `FIREBASE_WEBAPP_CONFIG`라는 환경 변수를 자동으로 주입하지만, Next.js 애플리케이션이 이 변수를 직접 사용하도록 설정되어 있지 않으면 빌드 과정에서 여전히 문제가 발생합니다.

### **해결 방안: `next.config.mjs`를 통한 명시적 환경 변수 설정**

이 문제를 해결하기 위해, 프로젝트 루트에 `next.config.mjs` 파일을 생성하여 App Hosting이 제공하는 `FIREBASE_WEBAPP_CONFIG` 환경 변수를 Next.js 애플리케이션이 사용할 수 있는 형태로 명시적으로 주입해야 합니다.

**1. `next.config.mjs` 파일 생성**

프로젝트의 루트 디렉토리에 다음 내용으로 `next.config.mjs` 파일을 생성하거나, 기존 파일에 아래 내용을 추가합니다.

```javascript
/** @type {import('next').NextConfig} */

// Initialize an empty config object
let firebaseWebAppConfig = {};

// In the App Hosting build environment, the FIREBASE_WEBAPP_CONFIG env var is available.
// We need to parse it and expose it to the client-side Next.js app.
// In the local development environment, we can fall back to the existing NEXT_PUBLIC_ variables.
if (process.env.FIREBASE_WEBAPP_CONFIG) {
  try {
    firebaseWebAppConfig = JSON.parse(process.env.FIREBASE_WEBAPP_CONFIG);
  } catch (e) {
    console.error("Failed to parse FIREBASE_WEBAPP_CONFIG", e);
  }
}

const nextConfig = {
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: firebaseWebAppConfig.apiKey || process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: firebaseWebAppConfig.authDomain || process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: firebaseWebAppConfig.projectId || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: firebaseWebAppConfig.storageBucket || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: firebaseWebAppConfig.messagingSenderId || process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: firebaseWebAppConfig.appId || process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  },
};

export default nextConfig;

```

**2. 코드 설명**

*   이 설정은 먼저 `FIREBASE_WEBAPP_CONFIG` 환경 변수가 존재하는지 확인합니다. (App Hosting 환경)
*   만약 존재한다면, JSON 형식의 이 변수를 파싱하여 `firebaseWebAppConfig` 객체에 저장합니다.
*   `nextConfig.env` 객체를 통해, 애플리케이션에서 사용하는 `NEXT_PUBLIC_FIREBASE_*` 환경 변수들을 설정합니다.
*   이때, `firebaseWebAppConfig` 객체에 값이 있으면 그 값을 사용하고, 없으면(로컬 환경) 기존의 `process.env.NEXT_PUBLIC_*` 값을 사용하도록 하여, 로컬과 배포 환경 모두에서 호환되도록 합니다.

**3. 배포**

`next.config.mjs` 파일을 프로젝트에 추가한 후, 변경 사항을 Git에 커밋하고 `main` 브랜치에 푸시하면 Firebase App Hosting이 자동으로 새로운 빌드를 시작합니다. 이 설정 덕분에 빌드 서버는 Firebase 환경 변수를 올바르게 인식하게 되고, `auth/invalid-api-key` 오류 없이 성공적으로 빌드를 완료할 수 있습니다.

### **향후 배포 시 체크리스트**

1.  **`next.config.mjs` 확인**: 새로운 Next.js 프로젝트를 App Hosting에 배포하기 전, 항상 `next.config.mjs` 파일이 위와 같이 올바르게 설정되어 있는지 확인합니다.
2.  **로컬 빌드**: 배포 전, `npm run build` 명령을 실행하여 로컬에서 빌드가 성공하는지 반드시 확인합니다.
3.  **의존성**: `package.json`에 모든 필수 의존성이 포함되어 있는지 확인합니다.
