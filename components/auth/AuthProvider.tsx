'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { usePathname, useRouter } from 'next/navigation';

// 인증 Context 생성
interface AuthContextType {
  user: User | null;
  loading: boolean;
}
const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

// AuthProvider 컴포넌트
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return; // 로딩 중에는 리디렉션 로직을 실행하지 않음

    const isAuthPage = pathname === '/login';

    if (!user && !isAuthPage) {
      // 로그인하지 않은 사용자가 인증 페이지가 아닌 곳에 있을 때
      router.push('/login');
    } else if (user && isAuthPage) {
      // 로그인한 사용자가 인증 페이지에 있을 때
      router.push('/');
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="flex items-center space-x-2">
           <svg className="animate-spin h-8 w-8 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-xl">인증 정보를 확인 중입니다...</span>
        </div>
      </div>
    );
  }
  
  // 인증 상태가 확인되었고, 리디렉션 로직이 적용된 후 자식 컴포넌트를 렌더링
  // 예를 들어 비로그인 사용자가 보호된 페이지에 접근하려하면 위에서 /login으로 리디렉션되므로, 아래 children은 렌더링되지 않음.
  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

// 인증 상태를 사용하기 위한 커스텀 훅
export const useAuth = () => {
  return useContext(AuthContext);
};
