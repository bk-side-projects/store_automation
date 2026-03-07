'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Mail, Key, AlertCircle } from "lucide-react";
import { auth } from "@/lib/firebase/client"; // Firebase 클라이언트 설정 가져오기
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // 로그인 성공 시 메인 페이지로 이동
      router.push("/"); 
    } catch (error) {
      console.error("Login failed:", error);
      let errorMessage = "로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.";
      if (error instanceof FirebaseError) {
          // Firebase 에러 코드에 따른 분기 (선택적)
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            errorMessage = "이메일 또는 비밀번호가 올바르지 않습니다.";
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = "유효하지 않은 이메일 형식입니다.";
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-cyan-400">
            수산물 유통 관리 시스템
          </h1>
          <p className="mt-2 text-gray-400">관리자 계정으로 로그인하세요.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <label
              htmlFor="email"
              className="absolute -top-2 left-2 inline-block bg-gray-800 px-1 text-xs font-medium text-gray-400"
            >
              이메일 주소
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 bg-gray-700 py-3 pl-10 pr-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6 transition"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div className="relative">
             <label
              htmlFor="password"
              className="absolute -top-2 left-2 inline-block bg-gray-800 px-1 text-xs font-medium text-gray-400"
            >
              비밀번호
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 bg-gray-700 py-3 pl-10 pr-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6 transition"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          {error && (
            <div className="flex items-center p-3 text-sm text-red-400 bg-red-900/30 rounded-md border border-red-800">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 transition-transform transform active:scale-95 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  로그인 중...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  로그인
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
