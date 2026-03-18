'use client';

import { useState, Fragment, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    Home, 
    Package, 
    Users, 
    Bell, 
    Search, 
    Menu, 
    ChevronDown, 
    LogOut, 
    Briefcase 
} from 'lucide-react';
import { useAuth } from '@/components/Providers';
import { Transition, Menu as HeadlessMenu } from '@headlessui/react';

// --- Navigation Items ---
const navItems = [
  { href: '/dashboard', icon: Home, label: '대시보드' },
  { href: '/products', icon: Package, label: '상품 관리' },
  { href: '/users', icon: Users, label: '고객 관리' },
];

// --- Global Loader Component ---
const GlobalLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-100">
    <div className="text-xl font-semibold text-slate-700">Loading...</div>
  </div>
);

// --- Main App Layout Component ---
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { userProfile, authStatus, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // --- Redirection Logic based on authStatus ---
  useEffect(() => {
    // Don't do anything while auth state is resolving
    if (authStatus === 'loading') return;

    const isAuthPage = pathname === '/login' || pathname === '/signup';

    // If user is not authenticated, and they are on a protected page, redirect to login.
    if (authStatus === 'unauthenticated' && !isAuthPage) {
      router.push('/login');
    }
    
    // If user is authenticated, and they are on an auth page, redirect to dashboard.
    if (authStatus === 'authenticated' && isAuthPage) {
      router.push('/dashboard');
    }
  }, [authStatus, router, pathname]);

  // --- Render Logic ---
  // Always show loader if auth state is still loading.
  if (authStatus === 'loading') {
    return <GlobalLoader />;
  }

  const isAuthPage = pathname === '/login' || pathname === '/signup';

  // If user is authenticated, show the main layout, unless they are on an auth page (redirecting).
  if (authStatus === 'authenticated') {
    if (isAuthPage) {
      // While redirecting from /login to /dashboard, show a loader.
      return <GlobalLoader />;
    } 
    // This is the main view for authenticated users on protected pages.
    return <ProtectedLayout>{children}</ProtectedLayout>;
  }

  // If user is unauthenticated, show the auth page, unless they are on a protected page (redirecting).
  if (authStatus === 'unauthenticated') {
    if (!isAuthPage) {
      // While redirecting from a protected page to /login, show a loader.
      return <GlobalLoader />;
    }
    // This is the main view for unauthenticated users on auth pages.
    return <>{children}</>;
  }

  // Fallback, should ideally not be reached.
  return <GlobalLoader />;
}

// --- Extracted Layout for Authenticated Users ---
const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { userProfile, logout } = useAuth();
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  const Sidebar = () => (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-20 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      <aside className={`bg-slate-800 text-slate-200 w-64 min-h-screen p-4 flex flex-col fixed md:relative z-30 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center gap-3 mb-10 px-3">
            <div className="p-2 bg-sky-500/10 rounded-full border border-sky-400/20">
                <Briefcase className="w-7 h-7 text-sky-400" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wider">통영아재수산</h1>
        </div>
        <nav className="flex-grow">
          <ul>
            {navItems.map((item) => (
              <li key={item.label} className="mb-2">
                <Link href={item.href} legacyBehavior>
                  <a className={`flex items-center p-3 rounded-lg transition-all duration-200 text-lg font-semibold ${pathname.startsWith(item.href) ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'hover:bg-slate-700'}`}>
                    <item.icon size={22} className="mr-4" />
                    <span>{item.label}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto">
          <button onClick={logout} className="w-full flex items-center p-3 rounded-lg transition-colors hover:bg-red-500/80 hover:text-white text-red-400 font-bold text-lg">
            <LogOut size={22} className="mr-4" />
            <span>로그아웃</span>
          </button>
        </div>
      </aside>
    </>
  );

  const Header = () => (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-slate-600">
              <Menu size={24} />
            </button>
            <div className="relative hidden md:block">
              <Search size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="검색..." className="bg-slate-100 rounded-full pl-11 pr-4 py-2.5 w-64 focus:outline-none focus:ring-2 focus:ring-sky-500" />
            </div>
        </div>
        <div className="flex items-center gap-5">
          <button className="text-slate-600 hover:text-slate-800 relative">
            <Bell size={24} />
            <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <HeadlessMenu as="div" className="relative">
            <HeadlessMenu.Button className="flex items-center gap-2 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-slate-300 overflow-hidden">
                </div>
                <div className="hidden sm:flex flex-col items-start">
                    <span className="font-bold text-slate-800 text-sm">{userProfile?.userId || 'Admin'}</span>
                    <span className="text-xs text-slate-500">Administrator</span>
                </div>
                <ChevronDown size={18} className="text-slate-500 hidden sm:block" />
            </HeadlessMenu.Button>
            <Transition as={Fragment}>
              <HeadlessMenu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-slate-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <button className={`${active ? 'bg-sky-500 text-white' : 'text-slate-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                        프로필
                      </button>
                    )}
                  </HeadlessMenu.Item>
                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <button onClick={logout} className={`${active ? 'bg-red-500 text-white' : 'text-red-600'} group flex rounded-md items-center w-full px-2 py-2 text-sm font-semibold`}>
                        로그아웃
                      </button>
                    )}
                  </HeadlessMenu.Item>
                </div>
              </HeadlessMenu.Items>
            </Transition>
          </HeadlessMenu>
        </div>
    </header>
  );

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};