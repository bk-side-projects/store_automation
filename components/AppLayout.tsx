'use client';

import React from 'react';
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { useAuth } from "@/components/auth/AuthProvider";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();

  // 로그인 페이지에서는 레이아웃을 숨깁니다.
  if (pathname === '/login') {
    return <>{children}</>;
  }
  
  // 인증 정보가 확인되지 않았다면, 레이아웃을 렌더링하지 않습니다 (AuthProvider가 로딩 화면을 보여줍니다).
  if (!user) {
      return null; 
  }

  return (
    <div className={inter.className}>
      <Header />
      <div style={{ display: 'flex' }}>
        <nav style={{ width: '220px', padding: '20px', borderRight: '1px solid #dee2e6' }}>
          <p>메뉴</p>
          {/* 향후 여기에 내비게이션 메뉴가 들어옵니다. */}
        </nav>
        <main style={{ flex: 1, padding: '20px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
