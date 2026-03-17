'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '../../hooks/useAuth';
import { Users, Lock, ArrowRight, Briefcase } from 'lucide-react';

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
      // Using mock login from useAuth hook
      await login(userId, password);
      router.push('/'); // Redirect to dashboard
    } catch (err: any) {
      console.error("Login Error:", err);
      setError(err.message || 'Invalid user ID or password.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-pulse animation-delay-4000"></div>

        <div className="w-full max-w-4xl bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden z-10 md:grid md:grid-cols-2">
            {/* Left side - Branding */}
            <div className="p-12 bg-gray-900/40 hidden md:flex flex-col justify-center items-start">
                <div className="flex items-center gap-3 mb-4">
                    <Briefcase className="w-10 h-10 text-blue-400" />
                    <h1 className="text-3xl font-bold tracking-wider">통영아재수산</h1>
                </div>
                <p className="text-lg text-gray-300 mb-2">Warehouse Management System</p>
                <p className="text-gray-400 text-sm">
                    Streamline your inventory, orders, and shipping with our intuitive dashboard.
                </p>
            </div>

            {/* Right side - Login Form */}
            <div className="p-8 md:p-12">
                <div className="mb-8 text-center md:text-left">
                    <h2 className="text-4xl font-extrabold text-white mb-2">Welcome Back</h2>
                    <p className="text-gray-400">Sign in to continue</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            id="userId"
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="User ID"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                    
                    {error && <p className="text-red-400 text-sm text-center font-medium">{error}</p>}
                    
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 shadow-lg shadow-blue-600/20 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <span>Login</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>
                
                <div className="mt-8 text-center">
                    <a href="#" className="text-sm font-medium text-blue-400 hover:underline">
                        Forgot password?
                    </a>
                </div>
            </div>
        </div>
    </div>
  );
}
