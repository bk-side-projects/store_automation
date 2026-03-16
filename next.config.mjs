
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
