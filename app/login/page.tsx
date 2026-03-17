
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Mock login for now, replace with actual logic
      await login(userId, password);
      router.push('/'); // Redirect to dashboard on successful login
    } catch (err: any) {
      console.error("Login Error:", err);
      setError(err.message || '아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 m-4">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/globe.svg" // Using globe.svg as a placeholder logo
            alt="통영아재수산 로고"
            width={50}
            height={50}
            className="mb-3"
          />
          <h1 className="text-3xl font-bold text-primary">통영아재수산</h1>
          <p className="text-gray-500 mt-1 text-sm">Warehouse Management System</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="아이디"
              required
              className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/80 focus:bg-white focus:border-primary"
            />
          </div>
          <div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              required
              className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/80 focus:bg-white focus:border-primary"
            />
          </div>
          
          {error && <p className="text-red-500 text-xs text-center pt-1">{error}</p>}
          
          <button 
            type="submit" 
            className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm transition-transform transform hover:scale-102"
          >
            로그인
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <a href="/signup" className="text-sm font-medium text-primary hover:underline">
            계정이 없으신가요? 회원가입
          </a>
        </div>
      </div>
    </div>
  );
}
