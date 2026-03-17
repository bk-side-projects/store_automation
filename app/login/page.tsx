'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Mail, Lock, LogIn, Briefcase } from 'lucide-react';
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
      await login(userId, password);
      router.push('/'); // Redirect to dashboard on success
    } catch (err: any) {
      setError(err.message || '아이디 또는 비밀번호가 잘못되었습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white flex items-center justify-center font-sans">
      <div className="grid md:grid-cols-2 max-w-6xl w-full mx-4 bg-slate-800 rounded-3xl shadow-2xl shadow-sky-900/50 overflow-hidden">
        
        {/* Left Panel: Branding and Image */}
        <div className="relative hidden md:block">
          <Image
            src="/login-bg.jpg"
            alt="통영의 신선한 수산물이 담긴 어판장"
            layout="fill"
            objectFit="cover"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/20"></div>
          <div className="relative h-full p-10 flex flex-col justify-end">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-sky-500/10 rounded-full border border-sky-400/20">
                    <Briefcase className="w-8 h-8 text-sky-400" />
                </div>
                <h1 className="text-4xl font-bold text-white tracking-wider">통영아재수산</h1>
            </div>
            <p className="text-lg text-slate-300 font-medium leading-relaxed">
              가장 신선한 통영의 맛을 관리하는 곳.
              <br />
              WMS 대시보드에 오신 것을 환영합니다.
            </p>
          </div>
        </div>

        {/* Right Panel: Login Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-10 text-left">
            <h2 className="text-4xl font-extrabold text-white mb-2">관리자 로그인</h2>
            <p className="text-slate-400">대시보드에 접근하려면 로그인하세요.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* User ID Input */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="사용자 아이디"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-slate-700/50 border-2 border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-sky-500/30 focus:border-sky-500 transition-all duration-300 text-white placeholder-slate-400"
              />
            </div>
            
            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-slate-700/50 border-2 border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-sky-500/30 focus:border-sky-500 transition-all duration-300 text-white placeholder-slate-400"
              />
            </div>
            
            {error && <p className="text-red-400 text-sm font-semibold text-center py-2 bg-red-500/10 rounded-lg">{error}</p>}
            
            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-sky-600 text-white py-4 px-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 shadow-lg shadow-sky-600/30 transition-all duration-300 transform hover:-translate-y-1 disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
              {loading ? '로그인 중...' : '로그인'}
              {!loading && <LogIn className="w-6 h-6" />}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <a href="#" className="text-sm font-medium text-sky-400 hover:text-sky-300 hover:underline">
              비밀번호를 잊으셨나요?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
