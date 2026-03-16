
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { useFirebase } from '@/lib/firebase/client-provider';
import { usePathname, useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  userData: DocumentData | null;
  permissions: DocumentData | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, userData: null, permissions: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { auth, db } = useFirebase(); // Safely get auth and db from our new provider
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [permissions, setPermissions] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // useEffect ensures this code runs only on the client
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const fetchedUserData = userDoc.data();
          setUserData(fetchedUserData);

          const roleDocRef = doc(db, 'roles', fetchedUserData.role);
          const roleDoc = await getDoc(roleDocRef);
          if (roleDoc.exists()) {
            setPermissions(roleDoc.data().permissions);
          }
        }
        setUser(user);
      } else {
        setUser(null);
        setUserData(null);
        setPermissions(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db]); // Add auth and db to dependency array

  useEffect(() => {
    if (loading) return;

    const publicPaths = ['/login', '/signup'];
    const isPublicPath = publicPaths.includes(pathname);

    if (user && isPublicPath) {
      router.push('/');
      return;
    }

    if (!user && !isPublicPath) {
      router.push('/login');
      return;
    }

    if (user && permissions && !isPublicPath) {
      const allowed = Object.keys(permissions).some(path => pathname.startsWith(path) && permissions[path] !== 'none');
      if (!allowed && pathname !== '/') {
          router.push('/unauthorized');
      }
    }

  }, [user, permissions, loading, pathname, router]);

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

  return <AuthContext.Provider value={{ user, userData, permissions, loading }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
