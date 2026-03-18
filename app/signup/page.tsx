'use client';

import { useState } from 'react';
import { useAuth } from '@/components/Providers';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Briefcase } from 'lucide-react';

export default function SignUpPage() {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password.length < 6) {
      setError('비밀번호는 6자리 이상이어야 합니다.');
      setLoading(false);
      return;
    }

    try {
      await signup(id, email, password);
      // Signup success will trigger onAuthStateChanged, and AppLayout will redirect to /dashboard
      router.push('/dashboard'); // Explicitly push to handle race conditions
    } catch (err: any) {
      if (err.message.includes('already')) {
        setError('이미 사용중인 아이디 또는 이메일입니다.');
      } else {
        setError('회원가입에 실패했습니다. 입력 정보를 확인해주세요.');
      }
      console.error('Signup page error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 lg:p-10">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-sky-500/10 rounded-full border border-sky-400/20 mb-4">
            <Briefcase className="w-8 h-8 text-sky-500" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">관리자 계정 생성</h1>
          <p className="text-slate-500 mt-2">새로운 마스터 계정을 등록하세요.</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label htmlFor="userId" className="text-sm font-semibold text-slate-700">아이디</label>
            <input
              id="userId"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              placeholder="사용할 아이디 입력"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-semibold text-slate-700">이메일</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              placeholder="example@company.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-semibold text-slate-700">비밀번호</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              placeholder="6자리 이상 입력"
            />
          </div>

          {error && <p className="text-red-500 text-sm font-semibold text-center">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400 transition-all duration-300"
            >
              {loading ? '계정 생성 중...' : '계정 생성 및 로그인'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            이미 계정이 있으신가요? {' '}
            <Link href="/login" className="font-bold text-sky-500 hover:text-sky-700">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
