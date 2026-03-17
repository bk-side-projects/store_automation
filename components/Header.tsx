
'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const { user, userProfile, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // Render nothing on login and signup pages
  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  return (
    <header className="bg-gradient-to-r from-primary to-secondary text-white py-4 px-6 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-xl font-bold">
          AgeSeafood WMS
        </Link>
        {user && (
          <nav className="flex items-center gap-4">
            <Link href="/products" className="hover:underline">Products</Link>
          </nav>
        )}
      </div>
      <div className="flex items-center gap-4">
        {user && userProfile ? (
          <>
            <span className="text-text-dark mr-4">{`환영합니다, ${userProfile.userId}님`}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-md hover:bg-opacity-90"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-md hover:bg-opacity-90"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
