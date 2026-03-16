'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!user) {
    return null; // 리디렉션이 처리될 때까지 아무것도 렌더링하지 않음
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-4">
        대시보드
      </h1>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <p className="text-secondary">
          {`환영합니다, ${user.displayName || user.email}님! 관리자 페이지에 오신 것을 환영합니다.`}
        </p>
        {/* 여기에 다양한 관리자용 컴포넌트와 데이터를 추가할 수 있습니다. */}
      </div>
    </div>
  );
}
