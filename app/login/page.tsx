'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Mail, Lock, LogIn } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Mock login logic, replace with your actual authentication
      await login(userId, password);
      router.push('/'); // Redirect to dashboard on success
    } catch (err: any) {
      setError(err.message || '아이디 또는 비밀번호가 잘못되었습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <Image
              src="/assets/logo.png"
              alt="통영아재수산 로고"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">통영아재수산 WMS</h1>
          <p className="text-gray-500 mt-2">관리자 대시보드에 오신 것을 환영합니다.</p>
        </div>

        {/* Login Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* User ID Input */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="사용자 아이디"
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
              />
            </div>
            
            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
              />
            </div>

            {error && <p className="text-red-500 text-sm font-semibold text-center py-2 bg-red-100/50 rounded-lg">{error}</p>}
            
            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-bold text-base flex items-center justify-center gap-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? '로그인 중...' : '로그인'}
              {!loading && <LogIn className="w-5 h-5" />}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
              비밀번호를 잊으셨나요?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
