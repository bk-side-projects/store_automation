import React from 'react';
import "@/styles/globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import AppLayout from "@/components/AppLayout";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "통영아재수산 자동화",
  description: "수산물 유통 관리 시스템 by Gemini",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          <AppLayout>{children}</AppLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
