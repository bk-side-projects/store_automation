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
    <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-xl font-bold">
          AgeSeafood WMS
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {user && userProfile ? (
          <>
            <span className="text-secondary mr-4">{`환영합니다, ${userProfile.userId}님`}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-secondary rounded-md hover:bg-opacity-90"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-white bg-secondary rounded-md hover:bg-opacity-90"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
