
'use client';

import { FirebaseProvider } from '@/lib/firebase/client-provider';
import { AuthProvider } from '@/components/auth/AuthProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </FirebaseProvider>
  );
}
